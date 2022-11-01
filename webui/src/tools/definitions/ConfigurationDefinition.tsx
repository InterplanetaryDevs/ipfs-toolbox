import {ITool} from '../../types';
import React, {lazy} from 'react';

const Configuration = lazy(() => import('../Configuration'));
export const ConfigurationDefinition: ITool = {
	tool: <Configuration/>,
	name: 'Configuration'
};