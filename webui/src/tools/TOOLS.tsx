import React from 'react';
import {ITool} from '../App';
import LanIcon from '@mui/icons-material/Lan';
import {EmbedTool} from './EmbedTool';
import {lazy} from 'react';

const IpnsTool = lazy(() => import('./ipns/IpnsTool'))
export const IpnsToolDefinition: ITool = {
	name: 'IPNS',
	tool: <IpnsTool/>,
};

export const IpfsWebUIDefinition: ITool = {
	name: 'IPFS WebUI',
	tool: EmbedTool.create('https://webui.ipfs.io.ipns.dweb.link'),
};

const ClusterTool = lazy(() => import('./cluster/ClusterTool'));
export const IpfsClusterToolDefinition: ITool = {
	icon: <LanIcon/>,
	name: 'Cluster',
	tool: <ClusterTool/>,
};

export const TOOLS: IToolCategory[] = [
		{name: 'Official', tools: [IpfsWebUIDefinition]},
		{name: 'Tools', tools: [IpnsToolDefinition, IpfsClusterToolDefinition]},
	]
;

export interface IToolCategory {
	name: string,
	tools: ITool[]
}
