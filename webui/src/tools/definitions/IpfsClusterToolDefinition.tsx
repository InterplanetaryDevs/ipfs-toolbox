import React, {lazy} from 'react';
import {ITool} from '../../types';
import LanIcon from '@mui/icons-material/Lan';

const ClusterTool = lazy(() => import('../cluster/ClusterTool'));
export const IpfsClusterToolDefinition: ITool = {
	url: '/cluster',
	icon: <LanIcon/>,
	name: 'Cluster',
	tool: <ClusterTool/>,
	image: 'https://raw.githubusercontent.com/InterplanetaryDevs/ipfs-toolbox/master/docs/img/ipfs-cluster-webui.png'
};
