import { CommonActions } from './CommonActions';
import { DagNodeRenderer } from './DagNodeRenderer';
import { ICommonActions } from './ICommonActions';
import { TreeItem } from './TreeItem';
import { ErrorBoundary } from 'src/components/ErrorBoundary';
import { CID } from 'multiformats';

export const PropertyRenderer = (props: PropertyRendererProps) => {
	const { name, parentName, onChange, onDelete, onRename, value } = props;

	const cidVal = CID.asCID(value);

	return cidVal && cidVal.code === 113 ? (// is dag-cbor cid
		<ErrorBoundary>
			<DagNodeRenderer
				name={name}
				node={value}
				onChange={(cid) => onChange && onChange(cid)}
				onRename={onRename}
				onDelete={onDelete}
			/>
		</ErrorBoundary>
	) : (
		<TreeItem
			path={`${parentName}-${name}`}
			name={name}
			value={cidVal ? (
				<a href={`https://ipfs.io/ipfs/${cidVal.toString()}`}>{cidVal.toString()}</a>
			) : value instanceof Object ? (
				JSON.stringify(value)
			) : value.toString()}
		>
			<CommonActions
				name={name}
				value={value}
				onChange={onChange}
				onRename={onRename}
				onDelete={onDelete}
			/>
		</TreeItem>
	);
};

export interface PropertyRendererProps extends ICommonActions {
	name: string;
	parentName: string;
	value: any;
}
