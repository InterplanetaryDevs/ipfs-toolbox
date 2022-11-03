import React from 'react';
import {EmbedTool} from './EmbedTool';
import {ITool, IToolCategory} from '../types';
import {
	ConfigurationDefinition,
	DashboardDefinition,
	IpfsClusterToolDefinition,
	IpnsToolDefinition,
	PinsToolDefinition
} from './definitions';
import {PeersToolDefinition} from './definitions/PeersToolDefinition';

export const IpfsWebUIDefinition: ITool = {
	name: 'IPFS WebUI',
	tool: EmbedTool.create('https://webui.ipfs.io'),
	image: 'https://raw.githubusercontent.com/ipfs/ipfs-webui/main/docs/screenshots/ipfs-webui-status.png'
};

export const IpfsCidToolDefinition: ITool = {
	name: 'IPFS CID',
	tool: EmbedTool.create('https://cid.ipfs.io'),
};

export const TOOLS: IToolCategory[] = [
	{name: 'Official', tools: [IpfsWebUIDefinition, IpfsCidToolDefinition]},
	{name: 'Tools', tools: [PinsToolDefinition, PeersToolDefinition, IpnsToolDefinition, IpfsClusterToolDefinition]},
];

export const AdditionalTools = [DashboardDefinition, ConfigurationDefinition];

