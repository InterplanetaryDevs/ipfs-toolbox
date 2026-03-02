import { CircularProgress } from '@mui/material';
import { CID } from 'kubo-rpc-client';
import { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useIpfs } from '../../context/IpfsContext';
import { CommonActions } from './CommonActions';
import { ICommonActions } from './ICommonActions';
import { PropertyRenderer } from './PropertyRenderer';
import { TreeItem } from './TreeItem';

//bafyreibamgme2wosxivrn76rxuhhmqkin2qgoofdzzghydjlxhapyeuwfa
export const DagNodeRenderer = (props: DagNodeRendererProps) => {
	const { node, onChange, onRename, onDelete, name } = props;
	const ipfs = useIpfs();
	const [value, setValue] = useState<any>();

	useEffect(() => {
		ipfs.node.dag.get(node)
			.then(r => {
				setValue(r.value);
			});
	}, [node]);

	const content = useMemo(() => value ? Object.keys(value).map((k) => {
		return <PropertyRenderer
			key={k}
			name={k}
			parentName={node.toString()}
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
	}) : <CircularProgress />, [value]);

	const update = (val: any) => {
		ipfs.node.dag.put(val)
			.then(r => {
				onChange && onChange(r);
			});
	};

	return <TreeItem name={name} path={node.toString()} value={node.toString()}>
		<CommonActions
			name={name}
			value={value}
			onRename={onRename}
			onDelete={onDelete}
			onAdd={(inputName, inputValue) => {
				let val = value;
				if (inputValue.startsWith('Qm') || inputValue.startsWith('bafy') || inputValue.startsWith('bafk')) {
					const cid = CID.parse(inputValue);
					if (cid) {
						val[inputName] = cid;
					} else {
						alert('fuck'); //TODO: properly log error
					}
				} else {
					val[inputName] = inputValue;
				}

				update(val);
			}}
		/>
		<ErrorBoundary>
			{content}
		</ErrorBoundary>
	</TreeItem>;
};

export interface DagNodeRendererProps extends ICommonActions {
	name: string;
	node: CID;
}
