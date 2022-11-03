import {Container, Tab, Tabs,} from '@mui/material';
import React, {useState} from 'react';
import {useMenu} from '../../hooks/UseMenu';
import {KeyList} from './KeyList';
import {Publish} from './Publish';
import {IpfsNodeOnline} from '../../components/IpfsNodeOnline';

export default function IpnsTool() {
	const [tab, setTab] = useState(0);

	useMenu(<Tabs value={tab} onChange={(e, v) => setTab(v)}>
		<Tab label={'Publish'}/>
		<Tab label={'Keys'}/>
	</Tabs>);

	return (<>
		<Container>
			<IpfsNodeOnline>
			{tab == 0 ? <Publish/> : <KeyList/>}
			</IpfsNodeOnline>
		</Container>
	</>);
}
