import {Container, Tab, Tabs} from '@mui/material';
import React, {useState} from 'react';
import {useMenu} from '../../hooks/UseMenu';
import {AddPinDialog} from './AddPinDialog';
import {IdentityDisplay} from './IdentityDisplay';
import {PeerList} from './PeerList';
import {PinList} from './PinList';

export default function ClusterTool() {
	const [tab, setTab] = useState(0);

	useMenu(<Tabs value={tab} onChange={(e, v) => setTab(v)}>
		<Tab label={'Pins'}/>
		<Tab label={'Peers'}/>
		<Tab label={'Identity'}/>
	</Tabs>);

	return (<Container>
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
	</Container>);
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
