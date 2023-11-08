import {Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Stack} from '@mui/material';
import React, {useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import {useEffectCancel} from '../../hooks/UseEffectCancel';
import {PublishButton} from './PublishButton';

export function Publish() {
	const [keys, setKeys] = useState<{ name: string, id: string }[]>([]);
	const [key, setKey] = useState<string>('self');
	const {node} = useIpfs();

	const reload = (signal: AbortSignal) => {
		node.key.list({signal})
			.then(setKeys)
			.catch(console.error);
	};

	useEffectCancel(reload, []);

	return <Card>
		<CardHeader title={'Publish'}/>
		<CardContent>
			<Stack spacing={2}>
				<FormControl fullWidth>
					<InputLabel id="key-select">Key</InputLabel>
					<Select
						labelId="key-select"
						value={key}
						onChange={(e) => setKey(e.target.value)}
					>
						{keys.map(k => (<MenuItem value={k.name} key={k.name}>{k.name} : {k.id}</MenuItem>))}
					</Select>
				</FormControl>
				<PublishButton key={key}/>
			</Stack>
		</CardContent>
	</Card>;
}
