import {ITool} from '../../types';
import React, {lazy} from 'react';
import SpeedIcon from '@mui/icons-material/Speed';

const StatusTool = lazy(() => import('../StatusTool'));
export const StatusToolDefinition: ITool = {
	url: '/status',
	name: 'Status',
	tool: <StatusTool/>,
	icon: <SpeedIcon/>
};