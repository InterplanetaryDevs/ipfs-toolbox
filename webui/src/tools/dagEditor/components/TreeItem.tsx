import React from 'react';
import {TreeItem as MuiTreeItem} from '@mui/x-tree-view';

export const TreeItem = (props: TreeItemProps) => {

	return <MuiTreeItem
		nodeId={props.path}
		label={<span><b>{props.path}</b>: {props.value}</span>}
	>
		{props.children}
	</MuiTreeItem>;
};

export interface TreeItemProps {
	children?: any;
	value: any;
	path: string;
}
