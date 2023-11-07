import React from 'react';
import {EmbedTool} from './EmbedTool';
import {ITool, IToolCategory} from '../types';
import {
	ConfigurationDefinition,
	DashboardDefinition,
	IpfsClusterToolDefinition,
	IpnsToolDefinition
} from './definitions';

export const IpfsWebUIDefinition: ITool = {
	url: '/webui',
	name: 'IPFS WebUI',
	tool: EmbedTool.create('https://webui.ipfs.io'),
	image: 'https://raw.githubusercontent.com/ipfs/ipfs-webui/main/docs/screenshots/ipfs-webui-status.png'
};

export const IpfsCidToolDefinition: ITool = {
	url: '/cid',
	name: 'IPFS CID',
	tool: EmbedTool.create('https://cid.ipfs.io'),
};

export const TOOLS: IToolCategory[] = [
	{name: 'Official', tools: [IpfsWebUIDefinition, IpfsCidToolDefinition]},
	{name: 'Tools', tools: [IpnsToolDefinition, IpfsClusterToolDefinition]},
];

export const AdditionalTools = [DashboardDefinition, ConfigurationDefinition];

export const ALL_TOOLS: ITool[] = [...TOOLS.map(c => c.tools).flat(), ...AdditionalTools]
