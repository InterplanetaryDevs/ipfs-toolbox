import React from 'react';
import {EmbedTool} from './EmbedTool';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {ITool, IToolCategory} from '../types';
import {
	ConfigurationDefinition,
	DashboardDefinition,
	IpfsClusterToolDefinition,
	IpnsToolDefinition
} from './definitions';
import {FilesToolDefinition} from './definitions/FilesToolDefinition';

export const IpfsWebUIDefinition: ITool = {
	name: 'IPFS WebUI',
	tool: EmbedTool.create('https://webui.ipfs.io'),
	image: 'https://raw.githubusercontent.com/ipfs/ipfs-webui/main/docs/screenshots/ipfs-webui-status.png'
};

export const IpfsCidToolDefinition: ITool = {
	name: 'IPFS CID',
	tool: EmbedTool.create('https://cid.ipfs.io'),
};

export const DefaultToolIcon = <DashboardIcon/>;
export const DefaultToolImage = '/missing.jpg';

export const TOOLS: IToolCategory[] = [
	{name: 'Official', tools: [IpfsWebUIDefinition, IpfsCidToolDefinition]},
	{name: 'Tools', tools: [FilesToolDefinition, IpnsToolDefinition, IpfsClusterToolDefinition]},
];

export const AdditionalTools = [DashboardDefinition, ConfigurationDefinition];
