import React, {PropsWithChildren} from 'react';
import {useIsUp} from '../hooks/UseIsUp';
import {Paper, Typography} from '@mui/material';
import {AsyncActionButton} from './AsyncActionButton';
import {useIpfsCluster} from '../context/IpfsClusterContext';

export function IpfsClusterNodeOnline({children}: PropsWithChildren) {
	const {ipfsCluster, url} = useIpfsCluster();
	const {isUp, runCheck} = useIsUp(() => ipfsCluster.id());

	return !isUp ? <Paper>
		<Typography>IPFS Cluster Node is not reachable on '{url}'. Is the url correct? Is the daemon running?</Typography>
		<AsyncActionButton action={runCheck}>Retry</AsyncActionButton>
	</Paper> : <>  {children}</>;
}