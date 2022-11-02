import {ITool} from '../../types';
import React, {lazy} from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';

const PinsTool = lazy(() => import('../pins/PinsTool'));
export const PinsToolDefinition: ITool = {
	tool: <PinsTool/>,
	name: 'Pins',
	icon: <PushPinIcon/>
};