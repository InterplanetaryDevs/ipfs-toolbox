import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Card, CardActions,
	CardContent,
	CardHeader, FormGroup,
	Grid,
	TextField,
	Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PublishButton} from './PublishButton';
import {Delayed} from '../../components/Delayed';
import {useSnackbar} from 'notistack';
import {ExportButton} from './ExportButton';

export function KeyList() {
	const [keys, setKeys] = useState<{ name: string, id: string }[]>([]);
	const [key, setKey] = useState('');
	const [expanded, setExpanded] = useState<string | false>(false);
	const {ipfs} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const reload = () => {
		ipfs.key.list()
			.then(setKeys)
			.catch(console.error);
	};

	useEffect(reload, []);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	const generateKey = () => {
		ipfs.key.gen(key)
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
		ipfs.key.rm(name)
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
				<FormGroup row>
					<TextField value={key} onChange={(e) => setKey(e.target.value)} label={'Name'}/>
					<Button onClick={generateKey}>Generate</Button>
				</FormGroup>
			</CardContent>
			<CardActions>
				{/* TODO: reload button */}
			</CardActions>
		</Card>
		{keys.map(key => (
			<Accordion key={key.id} expanded={expanded === key.id} onChange={handleChange(key.id)}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon/>}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>{key.name}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						{key.id}: <Delayed promise={(async () => {
						let res = '';
						for await (const name of ipfs.name.resolve(key.id)) {
							res = name;
						}

						return <>{res}</>;
					})()}/>
					</Typography>
					<Grid container>
						<Grid item xs={12} md={6}>
							<PublishButton keyName={key.name}/>
						</Grid>
						<Grid item xs={12} md={6}>
							<ExportButton keyName={key.name}/>
						</Grid>
					</Grid>
					<Button onClick={() => deleteKey(key.name)}>Delete</Button>
				</AccordionDetails>
			</Accordion>))}
	</>);
}
