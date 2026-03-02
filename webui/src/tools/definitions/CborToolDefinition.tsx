import SettingsIcon from '@mui/icons-material/Settings';
import React, { lazy } from 'react';
import { ITool } from '../../types';

const Configuration = lazy(() => import('../CborTool'));
export const CborToolDefinition: ITool = {
	url: '/cbor',
	icon: <SettingsIcon />,
	tool: <Configuration />,
	name: 'Cbor Editor',
};
