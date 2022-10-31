<<<<<<< HEAD
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
=======
import React, {lazy} from 'react';
import {ITool} from '../App';
import FolderIcon from '@mui/icons-material/Folder';
import {EmbedTool} from './EmbedTool';
import LanIcon from '@mui/icons-material/Lan';
import DashboardIcon from '@mui/icons-material/Dashboard';

const IpnsTool = lazy(() => import('./ipns/IpnsTool'));
export const IpnsToolDefinition: ITool = {
	name: 'IPNS',
	tool: <IpnsTool/>,
};
>>>>>>> ad67671 (Add tool search)

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
<<<<<<< HEAD
export const AdditionalTools = [DashboardDefinition, ConfigurationDefinition];
=======

export const DefaultToolIcon = <DashboardIcon/>;
export const DefaultToolImage = '/assets/missing.jpg';
>>>>>>> ad67671 (Add tool search)

