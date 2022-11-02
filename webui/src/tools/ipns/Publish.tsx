import React, {useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import {Card, CardContent, CardHeader, Grid, MenuItem, Select} from '@mui/material';
import {PublishButton} from './PublishButton';
import {useEffectCancel} from '../../hooks/UseEffectCancel';

export function Publish() {
	const [keys, setKeys] = useState<{ name: string, id: string }[]>([]);
	const [key, setKey] = useState<string>('self');
	const {ipfs} = useIpfs();

	const reload = (signal: AbortSignal) => {
		ipfs.key.list({signal})
			.then(setKeys)
			.catch(console.error);
	};

	useEffectCancel(reload, []);

	return <Card>
		<CardHeader title={'Publish'}/>
		<CardContent>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Select label={'key'} value={key} onChange={(e) => setKey(e.target.value)}>
						{keys.map(k => (<MenuItem value={k.name} key={k.name}>{k.name} : {k.id}</MenuItem>))}
					</Select>
				</Grid>
				<Grid item xs={12}><PublishButton keyName={key}/></Grid>
			</Grid>
		</CardContent>
	</Card>;
}