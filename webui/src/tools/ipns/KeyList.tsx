import {Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Card, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function KeyList() {
	const [keys, setKeys] = useState<{ name: string, id: string }[]>([]);
	const [expanded, setExpanded] = useState<string | false>(false);
	const {ipfs} = useIpfs();

	const reload = () => {
		ipfs.key.list()
			.then(setKeys)
			.catch(console.error);
	};

	useEffect(reload, []);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (<>
		<Card>
			-
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
						{key.id}
					</Typography>
					<ButtonGroup/>
				</AccordionDetails>
			</Accordion>))}
	</>);
}
