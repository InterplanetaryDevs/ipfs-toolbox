import React, {lazy} from 'react';
import {ITool} from '../App';
import {EmbedTool} from './EmbedTool';
import LanIcon from '@mui/icons-material/Lan';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Dashboard} from '../components/Dashboard';

const IpnsTool = lazy(() => import('./ipns/IpnsTool'));
export const IpnsToolDefinition: ITool = {
	name: 'IPNS',
	tool: <IpnsTool/>,
};

export const IpfsWebUIDefinition: ITool = {
	name: 'IPFS WebUI',
	tool: EmbedTool.create('https://webui.ipfs.io'),
	image: 'https://raw.githubusercontent.com/ipfs/ipfs-webui/main/docs/screenshots/ipfs-webui-status.png'
};

export const IpfsCidToolDefinition: ITool = {
	name: 'IPFS CID',
	tool: EmbedTool.create('https://cid.ipfs.io'),
};

const ClusterTool = lazy(() => import('./cluster/ClusterTool'));
export const IpfsClusterToolDefinition: ITool = {
	icon: <LanIcon/>,
	name: 'Cluster',
	tool: <ClusterTool/>,
	image: 'https://raw.githubusercontent.com/InterplanetaryDevs/ipfs-toolbox/master/docs/img/ipfs-cluster-webui.png'
};

export const DashboardDefinition: ITool = {
	name: 'Dashboard',
	tool: <Dashboard/>,
};

const Configuration = lazy(() => import('../components/Configuration'))
export const ConfigurationDefinition: ITool = {
	tool: <Configuration/>,
	name: 'Configuration'
};

export const TOOLS: IToolCategory[] = [
	{name: 'Official', tools: [IpfsWebUIDefinition, IpfsCidToolDefinition]},
	{name: 'Tools', tools: [IpnsToolDefinition, IpfsClusterToolDefinition]},
];
export const AdditionalTools = [DashboardDefinition, ConfigurationDefinition];
export const DefaultToolIcon = <DashboardIcon/>;
export const DefaultToolImage = '/assets/missing.jpg';

export interface IToolCategory {
	name: string,
	tools: ITool[]
}
