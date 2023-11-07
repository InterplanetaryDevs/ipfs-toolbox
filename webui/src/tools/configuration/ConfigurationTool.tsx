import React, {useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import {useEffectCancel} from '../../hooks/UseEffectCancel';
import {Container, Typography} from '@mui/material';
import type {Config} from 'ipfs-core-types/dist/src/config';
import {ConnectionChecker} from '../../components/ConnectionChecker';

export default function ConfigurationTool() {
	const {ipfs, checker} = useIpfs();
	const [configuration, setConfiguration] = useState<Config>();

	useEffectCancel((signal) => {
		ipfs.config.getAll({signal})
			.then(setConfiguration)
			.catch(console.error);
	}, []);

	return <ConnectionChecker check={checker}>
		<Container>
			<Typography variant={'h3'}>Configuration</Typography>
			<pre>{JSON.stringify(configuration, null, 2)}</pre>
		</Container>
	</ConnectionChecker>;
}