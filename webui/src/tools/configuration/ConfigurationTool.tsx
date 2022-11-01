import React, {useState} from 'react';
import {useIpfs} from '../../context';
import {useEffectCancel} from '../../hooks/UseEffectCancel';
import {Container, Typography} from '@mui/material';
import type {Config} from 'ipfs-core-types/dist/src/config';

export default function ConfigurationTool() {
	const {ipfs} = useIpfs();
	const [configuration, setConfiguration] = useState<Config>();

	useEffectCancel((signal) => {
		ipfs.config.getAll({signal})
			.then(setConfiguration)
			.catch(console.error);
	}, []);

	return <Container>
		<Typography variant={'h3'}>Configuration</Typography>
		<pre>{JSON.stringify(configuration, null, 2)}</pre>
	</Container>;
}