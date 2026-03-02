import { AppBar, Button, TextField, Toolbar } from '@mui/material';
import { CID } from 'kubo-rpc-client';
import { useState } from 'react';
import { ConnectionChecker } from '../../components/ConnectionChecker';
import { ToolContainer } from '../../components/ToolContainer';
import { useIpfs } from '../../context/IpfsContext';
import { SimpleTreeView } from '@mui/x-tree-view';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { DagNodeRenderer } from './DagNodeRenderer';

export function CborTool() {
	const ipfs = useIpfs();
	const [root, setRoot] = useState<CID | undefined>();
	const [value, setValue] = useState('');

	const loadCid = () => {
		const cid = CID.parse(value);
		if (cid)
			setRoot(cid);
		else
			alert('invalid cid');
	};

	const newCid = () => {
		ipfs.node.dag.put({}).then(r => {
			setRoot(r);
		});
	};

	return (
		<ConnectionChecker context={ipfs}>
			<ToolContainer>
				<AppBar position="static">
					<Toolbar>
						<TextField
							value={value}
							label={'cid'}
							onChange={e => setValue(e.target.value)}
						/>
						<Button onClick={loadCid}>Load</Button>
						<Button onClick={newCid}>New</Button>
					</Toolbar>
				</AppBar>
				<main>
					{root && <SimpleTreeView>
						<DagNodeRenderer
							name={'root'}
							node={root}
							onChange={(cid) => setRoot(cid)}
						/>
					</SimpleTreeView>}
				</main>
			</ToolContainer>
		</ConnectionChecker>
	);
}
