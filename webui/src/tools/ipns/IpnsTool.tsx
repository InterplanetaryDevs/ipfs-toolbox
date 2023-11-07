import {Tab, Tabs,} from '@mui/material';
import React, {useState} from 'react';
import {useMenu} from '../../hooks/UseMenu';
import {KeyList} from './KeyList';
import {Publish} from './Publish';
import {ConnectionChecker} from '../../components/ConnectionChecker';
import {useIpfs} from '../../context/IpfsContext';
import {ToolContainer} from '../../components/ToolContainer';

export default function IpnsTool() {
	const [tab, setTab] = useState(0);
	const ipfs = useIpfs();

	useMenu(<Tabs value={tab} onChange={(e, v) => setTab(v)}>
		<Tab label={'Publish'}/>
		<Tab label={'Keys'}/>
	</Tabs>);

	return (<ConnectionChecker context={ipfs}>
		<ToolContainer>
			{tab == 0 ? <Publish/> : <KeyList/>}
		</ToolContainer>
	</ConnectionChecker>);
}
