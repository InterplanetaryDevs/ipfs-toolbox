import {
	Badge,
	Box,
	Button,
	Chip,
	CircularProgress,
	IconButton,
	Popover,
	Stack,
	Toolbar,
	Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useIpfs} from '../context/IpfsContext';
import {useToolBox} from '../context/ToolBoxContext';
import {useIpfsCluster} from '../context/IpfsClusterContext';
import React, {PropsWithoutRef, useRef} from 'react';
import InfoIcon from '@mui/icons-material/Info';
import {IKeyBind, IShortCut} from '../services/ShortcutService';
import {INodeContext} from '../context/INodeContext';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {useShortCut} from '../hooks/UseShortCut';

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

function ConnectionStatusButton({context, label}: { label: string, context: INodeContext<any> }) {
	return <Badge badgeContent={(context.connected ? <CheckIcon color={'success'}/> : (context.checking ?
		<CircularProgress color={'warning'} size={25}/> : <CloseIcon color={'error'}/>))}>
		<Button onClick={() => context.runCheck()}>{label}</Button>
	</Badge>;
}

export function AppBar(props: IAppBarProps) {
	const {tool, menu, setMenuOpen, shortcutService} = useToolBox();
	const ipfs = useIpfs();
	const ipfsCluster = useIpfsCluster();

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);
	const anchorRef = useRef<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useShortCut({
		name: 'Help',
		category: 'Global',
		keyBind: {
			key: 'h',
			ctrl: true,
		},
		action: () => {
			setAnchorEl(anchorRef.current);
		}
	});


	return <Box sx={{
		bgcolor: 'primary.light',
	}}>
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
				<ConnectionStatusButton label={'IPFS'} context={ipfs}/>
				<ConnectionStatusButton label={'IPFS Cluster'} context={ipfsCluster}/>
				<IconButton onClick={handleClick} ref={el => anchorRef.current = el}>
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
					<Stack spacing={1} sx={{width: 300, padding: 2}}>
						{Object.entries(shortcutService.getShortcuts()
							.reduce((group, product) => {
								const category = product.category ?? 'unknown';
								group[category] = group[category] ?? [];
								group[category].push(product);
								return group;
							}, {} as { [key: string]: IShortCut[] }))
							.map(([category, shortcuts]) => <Stack>
								<Typography variant={'caption'}>{category}</Typography>
								{shortcuts.map((v, i) => (<Box
									sx={{display: 'flex', borderBottomWidth: 1, borderBottomColor: 'primary.dark'}}>
									<div style={{flexGrow: 1}}>{v.name}</div>
									<ShortcutDisplay keyBind={v.keyBind}/>
								</Box>))}
							</Stack>)}
					</Stack>
				</Popover>
			</Stack>
		</Toolbar>
	</Box>;
};
