import {Container, Typography} from '@mui/material';
import {Config} from 'ipfs-core-types/dist/src/config';
import React, {useEffect, useState} from 'react';
import {ConnectionChecker} from '../../components/ConnectionChecker';
import {useIpfs} from '../../context/IpfsContext';
import {useEffectCancel} from '../../hooks/UseEffectCancel';

export function IpfsTab() {
	const ipfs = useIpfs();
	const [origConfiguration, setOrigConfiguration] = useState<Config>();
	const [configuration, setConfiguration] = useState<Config>();

	useEffect(() => {
		setConfiguration(origConfiguration);
	}, [origConfiguration]);

	useEffectCancel((signal) => {
		ipfs.node.config.getAll({signal})
			.then(setOrigConfiguration)
			.catch(console.error);
	}, [ipfs.node]);

	return <ConnectionChecker context={ipfs}>
		<Container>
			<Typography variant={'h3'}>IPFS Node Configuration</Typography>
			<pre>{JSON.stringify(configuration, null, 2)}</pre>
		</Container>
	</ConnectionChecker>;
}