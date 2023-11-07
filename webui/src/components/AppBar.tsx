import {AppBar as MuiAppBar, Chip, IconButton, Popover, Stack, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useIpfs} from '../context/IpfsContext';
import {useToolBox} from '../context/ToolBoxContext';
import {ConnectionTextField} from './ConnectionTextField';
import {useIpfsCluster} from '../context/IpfsClusterContext';
import React, {PropsWithoutRef} from 'react';
import InfoIcon from '@mui/icons-material/Info';
import {IKeyBind} from '../services/ShortcutService';

interface IAppBarProps {
}


function ShortcutDisplay({keyBind}: PropsWithoutRef<{ keyBind: IKeyBind }>) {
	return <div>
		{keyBind.ctrl && <><Chip label={'CTRL'}/> + </>}
		{keyBind.alt && <><Chip label={'ALT'}/> + </>}
		{keyBind.shift && <><Chip label={'SHIFT'}/> + </>}
		<Chip label={keyBind.key.replace(' ', 'space').toUpperCase()}/>
	</div>;
}

export function AppBar(props: IAppBarProps) {
	const {tool, menu, setMenuOpen, shortcutService} = useToolBox();
	const {connected: ipfsConnected, apiUrl, setApiUrl, checking: ipfsChecking} = useIpfs();
	const {
		apiUrl: clusterApiUrl,
		setApiUrl: clusterSetApiUrl,
		connected: clusterConnected,
		checking: clusterChecking
	} = useIpfsCluster();

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};


	return <MuiAppBar position="fixed">
		<Toolbar>
			<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={() => setMenuOpen(true)}
				edge="start"
			>
				<MenuIcon/>
			</IconButton>
			<Typography variant="h6" noWrap component="div">
				{tool.name}
			</Typography>
			{menu}
			<div style={{flexGrow: 1}}/>
			<Stack spacing={2} direction={'row'}>
				<ConnectionTextField
					value={apiUrl}
					onChange={setApiUrl}
					label={'IPFS Url'}
					placeholder={'/ip4/127.0.0.1/tcp/5001'}
					connected={ipfsConnected}
					checking={ipfsChecking}
				/>
				<ConnectionTextField
					value={clusterApiUrl}
					onChange={clusterSetApiUrl}
					label={'IPFS Cluster Url'}
					placeholder={'http://localhost:9094'}
					connected={clusterConnected}
					checking={clusterChecking}
				/>
				<IconButton onClick={handleClick}>
					<InfoIcon/>
				</IconButton>
				<Popover
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
				>
					<Stack>
						{shortcutService.getShortcuts().map((v, i) => <div style={{display: 'flex'}}>
							<div style={{flexGrow: 1}}>{v.name}</div>
							<ShortcutDisplay keyBind={v.keyBind}/></div>)}
					</Stack>
				</Popover>
			</Stack>
		</Toolbar>
	</MuiAppBar>;
}
