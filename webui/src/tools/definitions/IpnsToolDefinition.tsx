import React, {lazy} from 'react';
import {ITool} from '../../types';

const IpnsTool = lazy(() => import('../ipns/IpnsTool'));
export const IpnsToolDefinition: ITool = {
	url: '/ipns',
	name: 'IPNS',
	tool: <IpnsTool/>,
};
