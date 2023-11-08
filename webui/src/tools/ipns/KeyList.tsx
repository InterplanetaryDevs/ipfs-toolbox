import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader, Stack,
	TextField,
	Typography,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PublishButton} from './PublishButton';
import {Delayed} from '../../components/Delayed';
import {useSnackbar} from 'notistack';
import React from 'react';
import {ExportButton} from './ExportButton';

export function KeyList() {
	const [keys, setKeys] = useState<{ name: string, id: string }[]>([]);
	const [key, setKey] = useState('');
	const [expanded, setExpanded] = useState<string | false>(false);
	const {node} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const reload = () => {
		node.key.list()
			.then(setKeys)
			.catch(console.error);
	};

	useEffect(reload, []);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	const generateKey = () => {
		node.key.gen(key)
			.then(() => {
				enqueueSnackbar(`Key ${key} generated`, {variant: 'success'});
				setKey('');
			})
			.catch(e => {
				enqueueSnackbar(`Failed to generate key ${key}`, {variant: 'error'});
			})
			.finally(() => {
				reload();
			});
	};

	const deleteKey = (name: string) => {
		node.key.rm(name)
			.then(() => {
				enqueueSnackbar(`Key ${name} deleted`, {variant: 'success'});
			})
			.catch(e => {
				enqueueSnackbar(`Failed to delete key ${name}`, {variant: 'error'});
			})
			.finally(() => {
				reload();
			});
	};

	return (<>
		<Card>
			<CardHeader title={'Generate new key'}/>
			<CardContent>
				<TextField
					sx={{width: '100%'}}
					value={key}
					label={'Name'}
					onChange={(e) => setKey(e.target.value)}
					InputProps={{endAdornment: (<Button onClick={generateKey}>Generate</Button>)}}/>
			</CardContent>
		</Card>
		{keys.map(key => (
			<Accordion key={key.id} expanded={expanded === key.id} onChange={handleChange(key.id)}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon/>}
				>
					<Typography>{key.name}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack spacing={1}>
						<Typography>
							{key.id}: <Delayed promise={(async () => {
							let res = '';
							for await (const name of node.name.resolve(key.id)) {
								res = name;
							}

							return <>{res}</>;
						})()}/>
						</Typography>
						<PublishButton key={key.name}/>
						<ExportButton key={key.name}/>
						<ButtonGroup>
							<Button onClick={() => deleteKey(key.name)} color={'error'}>Delete</Button>
						</ButtonGroup>
					</Stack>
				</AccordionDetails>
			</Accordion>))}
	</>);
}
