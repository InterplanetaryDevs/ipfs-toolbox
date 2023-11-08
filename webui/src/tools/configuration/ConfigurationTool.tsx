import React, {useEffect, useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import {useEffectCancel} from '../../hooks/UseEffectCancel';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	ButtonGroup,
	Container,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography
} from '@mui/material';
import type {Config} from 'ipfs-core-types/dist/src/config';
import {ConnectionChecker} from '../../components/ConnectionChecker';
import {useMenu} from '../../hooks/UseMenu';
import {useIpfsCluster} from '../../context/IpfsClusterContext';
import {ToolContainer} from '../../components/ToolContainer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useConfiguration} from '../../hooks/UseConfiguration';
import RefreshIcon from '@mui/icons-material/Refresh';
import {DefaultConfiguration} from '../../services/DefaultConfiguration';

export default function ConfigurationTool() {
	const [tab, setTab] = useState(0);

	useMenu(<Tabs value={tab} onChange={(e, v) => setTab(v)}>
		<Tab label={'App'}/>
		<Tab label={'IPFS Node'}/>
		<Tab label={'IPFS Cluster Node'}/>
	</Tabs>);

	const tabs = [
		<AppTab/>,
		<IpfsTab/>,
		<IpfsClusterTab/>,
	];


	return tabs[tab];

}

function ConfigInput(props: {
	label: string,
	value: string,
	defaultValue?: string,
	onChange: (newValue: string) => void
}) {
	const [text, setText] = useState(props.value);

	return <div>
		<TextField
			label={props.label}
			value={text}
			onChange={(e) => setText(e.target.value)}
			placeholder={props.defaultValue}
			InputProps={{
				endAdornment: (<ButtonGroup>
					{props.defaultValue && props.defaultValue != props.value && <IconButton
              onClick={() => {
								props.onChange(props.defaultValue!);
								setText(props.defaultValue!);
							}}
          ><RefreshIcon/></IconButton>}
					{props.value !== text && <>
              <IconButton
                  onClick={() => setText(props.value)}
              ><CloseIcon/></IconButton>
              <IconButton
                  onClick={() => {
										props.onChange(text);
									}}
              ><CheckIcon/></IconButton>
          </>}
				</ButtonGroup>)
			}}/>
	</div>;
}

function AppTab() {
	const configuration = useConfiguration();

	return <ToolContainer>
		<Stack>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon/>}>Connections</AccordionSummary>
				<AccordionDetails>
					<Stack spacing={2}>
						<ConfigInput
							label={'IPFS Url'}
							defaultValue={DefaultConfiguration.ipfsUrl}
							value={configuration.ipfsUrl}
							onChange={configuration.setIpfsUrl}/>
						<ConfigInput
							label={'IPFS Cluster Url'}
							defaultValue={DefaultConfiguration.ipfsClusterUrl}
							value={configuration.ipfsClusterUrl}
							onChange={configuration.setIpfsClusterUrl}/>
					</Stack>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon/>}>Keybinds</AccordionSummary>
				<AccordionDetails>
				</AccordionDetails>
			</Accordion>
		</Stack>
	</ToolContainer>;
}

function IpfsTab() {
	const ipfs = useIpfs();
	const [origConfiguration, setOrigConfiguration] = useState<Config>();
	const [configuration, setConfiguration] = useState<Config>();

	useEffect(() => {
		setConfiguration(origConfiguration);
	}, [origConfiguration]);

	useEffectCancel((signal) => {
		ipfs.node.config.getAll({signal})
			.then(setOrigConfiguration)
			.catch(console.error);
	}, [ipfs.node]);

	return <ConnectionChecker context={ipfs}>
		<Container>
			<Typography variant={'h3'}>IPFS Node Configuration</Typography>
			<pre>{JSON.stringify(configuration, null, 2)}</pre>
		</Container>
	</ConnectionChecker>;
}

function IpfsClusterTab() {
	const cluster = useIpfsCluster();

	return <ConnectionChecker context={cluster}>
		<Container>

		</Container>
	</ConnectionChecker>;
}
