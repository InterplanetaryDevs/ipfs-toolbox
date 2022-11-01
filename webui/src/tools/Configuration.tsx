import React, {useState} from 'react';
import {useIpfs} from '../context';
import {useEffectCancel} from '../hooks/UseEffectCancel';
import {Container, Typography} from '@mui/material';

export default function Configuration() {
	const {ipfs} = useIpfs();
	const [configuration, setConfiguration] = useState<any>();

	useEffectCancel((signal) => {
		ipfs.config.getAll({signal})
			.then(setConfiguration)
			.catch(console.error);
	}, []);

	return <Container>
		<Typography variant={'h3'}></Typography>
		<pre>{JSON.stringify(configuration, null, 2)}</pre>
	</Container>;
}