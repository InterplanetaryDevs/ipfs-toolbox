import { EditorState } from '@codemirror/state';
import { codeFolding, foldGutter } from '@codemirror/language';
import { xml } from '@codemirror/lang-xml';
import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import { basicSetup, EditorView } from "codemirror";
import React, { useEffect, useState } from 'react';
import { concat as uint8ArrayConcat } from 'uint8arrays';
import { ConnectionChecker } from '../../components/ConnectionChecker';
import { ToolContainer } from '../../components/ToolContainer';
import { useIpfs } from '../../context/IpfsContext';
import { useSnackbar } from 'notistack';

const extensions = [basicSetup, codeFolding(), foldGutter(), xml()];

export default function MfsTextEditorTool() {
	const [currentPath, setCurrentPath] = useState('');
	const [path, setPath] = useState('/');
	const [originalText, setOriginalText] = useState('');
	const [isWorking, setIsWorking] = useState(false);
	const [editor, setEditor] = useState<EditorView | undefined>();
	const ipfs = useIpfs();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const editor = new EditorView({
			doc: '',
			parent: document.getElementById('text-editor')!,
			extensions,
		});
		setEditor(editor);

		return () => {
			editor.destroy();
		};
	}, []);

	const loadFile = () => {
		setIsWorking(true);

		(async (path: string) => {
			const chunks = [];
			for await (const chunk of ipfs.node.files.read(path)) {
				chunks.push(chunk);
			}

			return new TextDecoder().decode(uint8ArrayConcat(chunks));
		})(path).then(text => {
			editor?.setState(EditorState.create({ doc: text, extensions }));
			setOriginalText(text);
			setCurrentPath(path);
		}).catch(e => {
			console.error(e);
			alert(e);
		}).finally(() => {
			setIsWorking(false);
		});
	};

	const writeFile = (saveAs = false) => {
		const text = editor?.state.doc.toString() ?? '';
		setIsWorking(true);
		ipfs.node.files.write(saveAs ? path : currentPath, new TextEncoder().encode(text), {
			create: true, //TODO: make configurable
			parents: true,
			truncate: true,
		}).then(() => {
			setOriginalText(text);
			if (saveAs) {
				setCurrentPath(path);
			}
			enqueueSnackbar('File saved!', { variant: 'success' });
		}).catch(e => {
			console.error(e);
			enqueueSnackbar('Failed to save!', { variant: 'error' });
		}).finally(() => {
			setIsWorking(false);
		});
	};

	return (
		<ConnectionChecker context={ipfs}>
			<ToolContainer>
				<Box sx={{ display: 'flex', gap: 5 }}>
					<TextField onChange={(e: any) => setPath(e.target.value)} value={path} disabled={isWorking} fullWidth />
					<ButtonGroup>
						<Button onClick={loadFile} disabled={isWorking}>Open</Button>
						<Button onClick={() => writeFile()} disabled={isWorking || !currentPath} color='primary'>
							Save
						</Button>
						<Button onClick={() => writeFile(true)} disabled={isWorking || currentPath === path}>
							Save as
						</Button>
					</ButtonGroup>
				</Box>
				<div>
					{currentPath}{originalText !== editor?.state.doc.toString() && '*'}
				</div>
				<div id='text-editor' style={{ overflow: 'auto' }} />
			</ToolContainer>
		</ConnectionChecker>
	);
}
