import React, {useState} from 'react';
import {FolderView} from './FolderView';
import {ConnectionTextField} from '../../components/ConnectionTextField';

export default function FilesTool() {
	const [path, setPath] = useState('/');

	return <div>
		<ConnectionTextField label={'path'} value={path} placeholder={'/'} onChange={setPath}/>
		<FolderView path={path} onClick={f => {
			if (f.type == 'directory') {
				setPath(p => f.name == '..' ? p.substring(0, p.substring(0, p.length - 2).lastIndexOf('/')) + '/' : p + f.name + '/');
			}
		}}/>
	</div>;
}