import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import {Box, IconButton, Popover, Stack, Toolbar, Typography} from '@mui/material';
import React, {useRef} from 'react';
import {useIpfsCluster} from '../context/IpfsClusterContext';
import {useIpfs} from '../context/IpfsContext';
import {useToolBox} from '../context/ToolBoxContext';
import {useShortCut} from '../hooks/UseShortCut';
import {ConnectionStatusButton} from './ConnectionStatusButton';
import {ShortcutButton} from './ShortcutButton';
import {ShortCutList} from './ShortCutList';

export function AppBar() {
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
		},
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
			{shortcutService.getShortCut(Symbol.for('Dashboard')) && <ShortcutButton iconOnly={true} shortcut={shortcutService.getShortCut(Symbol.for('Dashboard'))!}/>}
			{tool.icon}
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
					<Box sx={{width: 300, padding: 2}}>
						<ShortCutList/>
					</Box>
				</Popover>
				{shortcutService.getShortCut(Symbol.for('Configuration')) && <ShortcutButton iconOnly={true} shortcut={shortcutService.getShortCut(Symbol.for('Configuration'))!}/>}
			</Stack>
		</Toolbar>
	</Box>;
}
