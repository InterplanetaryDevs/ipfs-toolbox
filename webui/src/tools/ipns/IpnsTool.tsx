import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	FormControl,
	MenuItem,
	Select,
	Tab,
	Tabs,
	TextField,
} from '@mui/material';
import {useSnackbar} from 'notistack';
import React, {useEffect, useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import {useMenu} from '../../hooks/UseMenu';
import {KeyList} from './KeyList';

function Publish() {
	const [keys, setKeys] = useState<{ name: string, id: string }[]>([]);
	const [key, setKey] = useState<string>('self');
	const [value, setValue] = useState<string>('');
	const {enqueueSnackbar} = useSnackbar();
	const {ipfs} = useIpfs();

	const reload = () => {
		ipfs.key.list()
			.then(setKeys)
			.catch(console.error);
	};

	const publish = () => {
		ipfs.name.publish(value, {key: key})
			.then(r => {
				enqueueSnackbar(`Published ${value} to ${key}`, {variant: 'success'});
			}).catch(e => {
			enqueueSnackbar(`Failed to publish ${value} to ${key}`, {variant: 'error'});
		});
	};

	useEffect(reload, []);

	return <Card>
		<CardHeader title={'Publish'}/>
		<CardContent>
			<TextField label={'cid'} value={value} onChange={(e) => setValue(e.target.value)}/>
			<br/>
			<Select label={'key'} value={key} onChange={(e) => setKey(e.target.value)}>
				{keys.map(k => (<MenuItem value={k.name}>{k.name} : {k.id}</MenuItem>))}
			</Select>
			<br/>
			<Button onClick={publish}>Publish</Button>
		</CardContent>
	</Card>;
}

export default function IpnsTool() {
	const [tab, setTab] = useState(0);

	useMenu(<Tabs value={tab} onChange={(e, v) => setTab(v)}>
		<Tab label={'Publish'}/>
		<Tab label={'Keys'}/>
	</Tabs>);

	return (<>
		<Container>
			{tab == 0 ? <Publish/> : <KeyList/>}
		</Container>
	</>);
}
