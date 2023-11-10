import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary, Stack} from '@mui/material';
import React from 'react';
import {ConfigTextField} from '../../components/molecules/ConfigTextField';
import {useConfiguration} from '../../hooks/UseConfiguration';

export function AppTab() {
	const configuration = useConfiguration();

	return <Stack>
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon/>}>Connections</AccordionSummary>
			<AccordionDetails>
				<Stack spacing={2}>
					<ConfigTextField
						label={'IPFS Url'}
						property={configuration.ipfsUrl}
					/>
					<ConfigTextField
						label={'IPFS Cluster Url'}
						property={configuration.ipfsClusterUrl}
					/>
				</Stack>
			</AccordionDetails>
		</Accordion>
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon/>}>Styling</AccordionSummary>
			<AccordionDetails>
				<Stack spacing={2}>
					<ConfigTextField label={'Accent Color'} property={configuration.accentColor}/>
				</Stack>
			</AccordionDetails>
		</Accordion>
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon/>}>Keybinds</AccordionSummary>
			<AccordionDetails>
			</AccordionDetails>
		</Accordion>
	</Stack>;
}