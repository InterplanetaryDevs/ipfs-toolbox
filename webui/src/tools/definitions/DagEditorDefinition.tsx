import React, {lazy} from 'react';
import {ITool} from '../../types';

const DagEditorTool = lazy(() => import('../dagEditor/DagEditorTool'));
export const DagEditorDefinition: ITool = {
	url: '/dag-editor',
	tool: <DagEditorTool/>,
	name: 'Dag Editor',
};
