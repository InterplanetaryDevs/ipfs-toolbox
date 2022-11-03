import React, {PropsWithChildren} from 'react';
import {useIsUp} from '../hooks/UseIsUp';
import {useIpfs} from '../context/IpfsContext';
import {Paper, Typography} from '@mui/material';
import {AsyncActionButton} from './AsyncActionButton';

export function IpfsNodeOnline({children}: PropsWithChildren) {
	const {ipfs, apiUrl} = useIpfs();
	const {isUp, runCheck} = useIsUp(() => ipfs.id());

	return !isUp ? <Paper>
		<Typography>IPFS Node is not reachable on '{apiUrl}'. Is the url correct? Is the daemon running?</Typography>
		<AsyncActionButton action={runCheck}>Retry</AsyncActionButton>
	</Paper> : <>  {children}</>;
}