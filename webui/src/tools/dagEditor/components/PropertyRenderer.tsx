import React from 'react';
import {CID} from 'kubo-rpc-client';
import {CommonActions} from './CommonActions';
import {TreeItem} from './TreeItem';
import {DagNodeRenderer} from './DagNodeRenderer';
import {ICommonActions} from '../struct/ICommonActions';

export const PropertyRenderer = (props: PropertyRendererProps) => {
	const {name, onChange, onDelete, onRename, value} = props;

	return value instanceof CID && value.code === 113 ? // is dag-cbor cid
		<DagNodeRenderer
			name={name}
			node={value}
			onChange={(cid) => onChange && onChange(cid)}
			onRename={onRename}
			onDelete={onDelete}
		/> : <TreeItem
			path={name}
			value={value instanceof CID ?
				<a href={`https://ipfs.io/ipfs/${value.toString()}`}>{value.toString()}</a>
				: value}>
			<CommonActions
				name={name}
				value={value}
				onChange={onChange}
				onRename={onRename}
				onDelete={onDelete}
			/>
		</TreeItem>;
};

export interface PropertyRendererProps extends ICommonActions {
	name: string;
	value: any;
}
