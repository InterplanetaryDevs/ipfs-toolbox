import {Tab, Tabs} from '@mui/material';
import React, {useState} from 'react';
import {useMenu} from '../../hooks/UseMenu';
import {AddPinDialog} from './AddPinDialog';
import {IdentityDisplay} from './IdentityDisplay';
import {PeerList} from './PeerList';
import {PinList} from './PinList';
import {useIpfsCluster} from '../../context/IpfsClusterContext';
import {ConnectionChecker} from '../../components/ConnectionChecker';
import {ToolContainer} from '../../components/ToolContainer';
import {useShortCut} from '../../hooks/UseShortCut';

export default function ClusterTool() {
	const [tab, setTab] = useState(0);


	const context = useIpfsCluster();

	useShortCut({
		category: 'Cluster',
		name: 'Pins',
		keyBind: {
			key: '1',
			alt: true,
			ctrl: false,
			shift: false,
		},
		action: () => {
			setTab(0);
		}
	});

	useShortCut({
		category: 'Cluster',
		name: 'Peers',
		keyBind: {
			key: '2',
			alt: true,
			ctrl: false,
			shift: false,
		},
		action: () => {
			setTab(1);
		}
	});

	useShortCut({
		category: 'Cluster',
		name: 'Identity',
		keyBind: {
			key: '3',
			alt: true,
			ctrl: false,
			shift: false,
		},
		action: () => {
			setTab(2);
		}
	});

	useMenu(<Tabs value={tab} onChange={(e, v) => setTab(v)}>
		<Tab label={'Pins'}/>
		<Tab label={'Peers'}/>
		<Tab label={'Identity'}/>
	</Tabs>);

	return (<ConnectionChecker context={context}>
		<ToolContainer>
			<TabPanel index={0} value={tab}>
				<AddPinDialog/>
				<div style={{height: 15}}/>
				<PinList/>
			</TabPanel>
			<TabPanel index={1} value={tab}>
				<PeerList/>
			</TabPanel>
			<TabPanel index={2} value={tab}>
				<IdentityDisplay/>
			</TabPanel>
		</ToolContainer>
	</ConnectionChecker>);
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			{...other}
		>
			{value === index && children}
		</div>
	);
}
