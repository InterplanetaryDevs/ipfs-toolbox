import {AppBar as MuiAppBar, IconButton, Stack, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useIpfs} from '../context/IpfsContext';
import {useToolBox} from '../context/ToolBoxContext';
import {ConnectionTextField} from './ConnectionTextField';
import {useIpfsCluster} from '../context/IpfsClusterContext';
import React from 'react';

interface IAppBarProps {
}

export function AppBar(props: IAppBarProps) {
	const {tool, menu, setMenuOpen} = useToolBox();
	const {connected: ipfsConnected, apiUrl, setApiUrl, checking: ipfsChecking} = useIpfs();
	const {
		apiUrl: clusterApiUrl,
		setApiUrl: clusterSetApiUrl,
		connected: clusterConnected,
		checking: clusterChecking
	} = useIpfsCluster();

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
			<Stack spacing={3} direction={'row'}>
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
			</Stack>
		</Toolbar>
	</MuiAppBar>;
}
