import SettingsIcon from '@mui/icons-material/Settings';
import React, {lazy} from 'react';
import {ITool} from '../../types';

const Configuration = lazy(() => import('../configuration/ConfigurationTool'));
export const ConfigurationDefinition: ITool = {
	url: '/config',
	icon: <SettingsIcon/>,
	tool: <Configuration/>,
	name: 'Configuration',
};
