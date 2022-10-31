import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	TextField,
	Typography
} from '@mui/material';
import {useEffect, useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PublishButton} from './PublishButton';
import {Delayed} from '../../components/Delayed';
import {useSnackbar} from 'notistack';

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
				<TextField value={key} onChange={(e) => setKey(e.target.value)} label={'Name'}/>
				<br/>
				<Button onClick={generateKey}>Generate</Button>
			</CardContent>
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
					<PublishButton key={key.name}/>
					<ButtonGroup>
						<Button onClick={() => deleteKey(key.name)}>Delete</Button>
						<Button>Export</Button>
					</ButtonGroup>
				</AccordionDetails>
			</Accordion>))}
	</>);
}
