import React, {useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import {useEffectCancel} from '../../hooks/UseEffectCancel';
import {Container, Tab, Tabs, Typography} from '@mui/material';
import type {Config} from 'ipfs-core-types/dist/src/config';
import {ConnectionChecker} from '../../components/ConnectionChecker';
import {useMenu} from '../../hooks/UseMenu';
import {useIpfsCluster} from '../../context/IpfsClusterContext';

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

function AppTab() {
	return <Container>

	</Container>;
}

function IpfsTab() {
	const ipfs = useIpfs();
	const [origConfiguration, setOrigConfiguration] = useState<Config>();
	const [configuration, setConfiguration] = useState<Config>();

	useEffectCancel((signal) => {
		ipfs.node.config.getAll({signal})
			.then(setOrigConfiguration)
			.catch(console.error);
	}, [ipfs.node]);

	return <ConnectionChecker context={ipfs}>
		<Container>
			<Typography variant={'h3'}>Configuration</Typography>
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
