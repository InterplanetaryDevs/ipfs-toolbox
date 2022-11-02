import React, {lazy} from 'react';
import {ITool} from '../../types';

const IpnsTool = lazy(() => import('../ipns/IpnsTool'));
export const IpnsToolDefinition: ITool = {
	name: 'IPNS',
	tool: <IpnsTool/>,
};