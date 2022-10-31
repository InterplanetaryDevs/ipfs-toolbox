import {ButtonGroup, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import {useSnackbar} from 'notistack';
import {MFSEntry} from 'ipfs-core-types/dist/src/files';
import {CID} from 'ipfs-http-client';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IFolderViewProps {
	path: string;

	onClick(entry: MFSEntry): void;
}

export function FolderView(props: IFolderViewProps) {
	const {ipfs} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const [files, setFiles] = useState<MFSEntry[]>([]);

	useEffect(() => {
		async function loadFiles() {
			let files = [];
			for await (const file of ipfs.files.ls(props.path)) {
				files.push(file);
			}

			return files;
		}

		loadFiles()
			.then(setFiles)
			.catch(() => {
				enqueueSnackbar('Failed to load files', {variant: 'error'});
			});
	}, [props.path]);

	return <List>
		{props.path !== '/' && (<ListItem>
			<ListItemButton onClick={() => props.onClick({
				size: 0,
				name: '..',
				type: 'directory',
				cid: undefined as unknown as CID,
			})}>
				<ListItemIcon><FolderIcon/></ListItemIcon>
				<ListItemText primary={'..'}/>
			</ListItemButton>
		</ListItem>)}
		{files.map(f => (<ListItem
			key={f.cid.toString()}
			secondaryAction={<ButtonGroup>
				<IconButton><DeleteIcon/></IconButton>
				<IconButton><EditIcon/></IconButton>
			</ButtonGroup>}
		>
			<ListItemButton onClick={() => props.onClick(f)}>
				<ListItemIcon>{f.type === 'directory' ? <FolderIcon/> : <DescriptionIcon/>}</ListItemIcon>
				<ListItemText primary={f.name} secondary={`CID: ${f.cid.toString()}, Size: ${f.size}`}/>
			</ListItemButton>
		</ListItem>))}
	</List>;
}