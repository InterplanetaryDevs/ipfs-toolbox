import { TreeItem as MuiTreeItem } from '@mui/x-tree-view/TreeItem';

export const TreeItem = (props: TreeItemProps) => {

	return <MuiTreeItem
		itemId={props.path}
		label={<span><b>{props.name}</b>: {props.value}</span>}
	>
		{props.children}
	</MuiTreeItem>;
};

export interface TreeItemProps {
	children?: any;
	value: any;
	path: string;
	name: string;
}
