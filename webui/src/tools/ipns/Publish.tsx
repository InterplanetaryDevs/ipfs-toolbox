import React, {useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import {Card, CardContent, CardHeader, MenuItem, Select} from '@mui/material';
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
			<Select label={'key'} value={key} onChange={(e) => setKey(e.target.value)}>
				{keys.map(k => (<MenuItem value={k.name} key={k.name}>{k.name} : {k.id}</MenuItem>))}
			</Select>
			<br/>
			<PublishButton key={key}/>
		</CardContent>
	</Card>;
}