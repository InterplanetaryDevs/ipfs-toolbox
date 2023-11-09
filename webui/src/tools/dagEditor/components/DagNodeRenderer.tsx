import {CID} from 'kubo-rpc-client';
import React, {useEffect, useMemo, useState} from 'react';
import {useIpfs} from '../../../context/IpfsContext';
import {ICommonActions} from '../struct/ICommonActions';
import {CommonActions} from './CommonActions';
import {PropertyRenderer} from './PropertyRenderer';
import {TreeItem} from './TreeItem';

export const DagNodeRenderer = (props: DagNodeRendererProps) => {
	const {node, onChange, onRename, onDelete, name} = props;
	const [value, setValue] = useState<any>();
	const [inputValue, setInputValue] = useState('');
	const [inputName, setInputName] = useState('');
	const ipfs = useIpfs();

	useEffect(() => {
		ipfs.node.dag.get(node)
			.then(r => {
				setValue(r.value);
			});
	}, [node]);

	const content = useMemo(() => value && Object.keys(value).map((k) => {
		return <PropertyRenderer
			key={k}
			name={k}
			value={value[k]}
			onChange={(value1) => {
				value[k] = value1;
				update(value);
			}}
			onDelete={() => {
				delete value[k];
				update(value);
			}}
			onRename={(name) => {
				value[name] = value[k];
				delete value[k];
				update(value);
			}}
		/>;
	}), [value]);

	const update = (val: any) => {
		ipfs.node.dag.put(val)
			.then(r => {
				onChange && onChange(r);
			});
	};

	return <TreeItem path={name} value={node.toString()}>
		<CommonActions
			name={name}
			value={value}
			onRename={onRename}
			onDelete={onDelete}
			onAdd={(inputName, inputValue) => {
				console.error('onAdd')
				let val = value;
				if (inputValue.startsWith('Qm') || inputValue.startsWith('bafy')) {
					const cid = CID.parse(inputValue);
					if (cid) {
						val[inputName] = cid;
					} else {
						console.error('Failed to parse CID', inputValue)
						val[inputName] = inputValue;
					}
				} else {
					val[inputName] = inputValue;
				}

				update(val);
			}}
		/>
		{content}
	</TreeItem>;
};

export interface DagNodeRendererProps extends ICommonActions {
	name: string;
	node: CID;
}
