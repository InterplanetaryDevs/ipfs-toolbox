import {Container} from '@mui/material';
import React from 'react';
import {ConnectionChecker} from '../../components/ConnectionChecker';
import {useIpfsCluster} from '../../context/IpfsClusterContext';

export function IpfsClusterTab() {
	const cluster = useIpfsCluster();

	return <ConnectionChecker context={cluster}>
		<Container>

		</Container>
	</ConnectionChecker>;
}