import {Tab} from '@mui/material';
import React from 'react';
import {ConnectionChecker} from '../../components/ConnectionChecker';
import {ToolContainer} from '../../components/ToolContainer';
import {useIpfs} from '../../context/IpfsContext';
import {useTabs} from '../../hooks/UseTabs';
import {KeyList} from './KeyList';
import {Publish} from './Publish';

export default function IpnsTool() {
	const ipfs = useIpfs();

	const {content} = useTabs([
		[<Tab label={'Publish'}/>, <Publish/>],
		[<Tab label={'Keys'}/>, <KeyList/>],
	]);

	return (<ConnectionChecker context={ipfs}>
		<ToolContainer>
			{content}
		</ToolContainer>
	</ConnectionChecker>);
}
