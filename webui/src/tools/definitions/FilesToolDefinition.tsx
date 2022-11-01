import {ITool} from '../../types';
import FolderIcon from '@mui/icons-material/Folder';
import React, {lazy} from 'react';

const FilesTool = lazy(() => import('./files/FilesTool'));
export const FilesToolDefinition: ITool = {
	name: 'Files',
	tool: <FilesTool/>,
	icon: <FolderIcon/>,
};