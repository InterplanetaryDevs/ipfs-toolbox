import React, {useState} from 'react';
import {Container, Tab, Tabs} from '@mui/material';
import {useMenu} from '../../hooks/UseMenu';
import {IpfsConfiguration} from './IpfsConfiguration';
import {AppConfiguration} from './AppConfiguration';

export default function ConfigurationTool() {
	const [tab, setTab] = useState(0);

	useMenu(<Tabs value={tab} onChange={(e, v) => setTab(v)}>
		<Tab label={'App'}/>
		<Tab label={'IPFS'}/>
	</Tabs>);

	return (<>
		<Container>
			{tab == 0 ? <AppConfiguration/> : <IpfsConfiguration/>}
		</Container>
	</>);
}