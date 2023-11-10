import {Tab} from '@mui/material';
import React from 'react';
import {ToolContainer} from '../../components/ToolContainer';
import {useTabs} from '../../hooks/UseTabs';
import {AppTab} from './AppTab';
import {IpfsClusterTab} from './IpfsClusterTab';
import {IpfsTab} from './IpfsTab';

export default function ConfigurationTool() {
	const {content} = useTabs([
		[<Tab label={'App'}/>, <AppTab/>],
		[<Tab label={'IPFS Node'}/>, <IpfsTab/>],
		[<Tab label={'IPFS Cluster Node'}/>, <IpfsClusterTab/>],
	]);

	return <ToolContainer>{content}</ToolContainer>;
}

