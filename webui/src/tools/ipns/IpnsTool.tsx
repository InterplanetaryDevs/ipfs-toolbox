import {Container, Tab, Tabs,} from '@mui/material';
import React, {useState} from 'react';
import {useMenu} from '../../hooks/UseMenu';
import {KeyList} from './KeyList';
import {Publish} from './Publish';

export default function IpnsTool() {
	const [tab, setTab] = useState(0);

	useMenu(<Tabs value={tab} onChange={(e, v) => setTab(v)}>
		<Tab label={'Publish'}/>
		<Tab label={'Keys'}/>
	</Tabs>);

	return (<>
		<Container>
			{tab == 0 ? <Publish/> : <KeyList/>}
		</Container>
	</>);
}
