import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Button, ButtonGroup, Card, CardContent, CardHeader, TextField, Toolbar} from '@mui/material';
import {TreeView} from '@mui/x-tree-view';
import {CID} from 'kubo-rpc-client';
import React, {useState} from 'react';
import {ConnectionChecker} from '../../components/ConnectionChecker';
import {ToolContainer} from '../../components/ToolContainer';
import {useIpfs} from '../../context/IpfsContext';
import {DagNodeRenderer} from './components/DagNodeRenderer';

export default function DagEditorTool() {
	const ipfs = useIpfs();

	const [root, setRoot] = useState<CID | undefined>();
	const [value, setValue] = useState('');

	const loadCid = () => {
		const cid = CID.parse(value);
		if (cid) {
			setRoot(cid);
		} else {
			alert('invalid cid');
		}
	};

	const newCid = () => {
		ipfs.node.dag.put({}).then(r => {
			setRoot(r);
		});
	};
	return (<ConnectionChecker context={ipfs}>
		<ToolContainer>
			<Card>
				<CardHeader title={<Toolbar>
					<ButtonGroup sx={{width: '100%'}}>
						<TextField
							sx={{flexGrow: 1}}
							value={value}
							label={'CID'}
							onChange={e => setValue(e.target.value)}
							InputProps={{
								endAdornment: <Button onClick={loadCid}>Load</Button>,
								sx: {
									borderTopRightRadius: 0,
									borderBottomRightRadius: 0,
								},
							}}
						/>
						<Button onClick={newCid} sx={{
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
						}}>New</Button>
					</ButtonGroup>
				</Toolbar>}/>
				<CardContent>
					{root && <TreeView
              defaultCollapseIcon={<ArrowDropDownIcon/>}
              defaultExpandIcon={<ArrowRightIcon/>}
              defaultEndIcon={<div style={{width: 24}}/>}
              defaultExpanded={['root']}
          >
              <DagNodeRenderer
                  name={'root'}
                  node={root}
                  onChange={(cid) => setRoot(cid)}
              />
          </TreeView>}
				</CardContent>
			</Card>
		</ToolContainer>
	</ConnectionChecker>);
}
