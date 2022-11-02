import React, {lazy} from 'react';
import {ITool} from '../../types';

const IpnsTool = lazy(() => import('../ipns/IpnsTool'));
export const IpnsToolDefinition: ITool = {
	name: 'IPNS',
	tool: <IpnsTool/>,
	image: 'https://raw.githubusercontent.com/InterplanetaryDevs/ipfs-toolbox/master/docs/img/ipfs-ipns.png'
};
