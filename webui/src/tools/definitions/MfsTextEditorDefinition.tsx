import React, { lazy } from 'react';
import EditDocumentIcon from '@mui/icons-material/Edit';
import { ITool } from '../../types';

const MfsTextEditorTool = lazy(() => import('../mfseditor/MfsTextEditorTool'));
export const MfsTextEditorDefinition: ITool = {
	url: '/mfs-te',
	name: 'MFS Text-editor',
	tool: <MfsTextEditorTool />,
	icon: <EditDocumentIcon />,
};
