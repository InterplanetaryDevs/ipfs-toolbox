import CodeMirror from 'codemirror';
import {useEffect, useRef, useState} from 'react';
import {ITextEditorProps} from './TextEditor';

function TextEditorContent(props: ITextEditorProps) {
	const textArea = useRef<HTMLTextAreaElement>(null);
	const [editor, setEditor] = useState<any>();

	useEffect(() => {
		const editor = CodeMirror.fromTextArea(textArea.current!, {
			mode: props.mode ?? 'text',
			theme: 'default',
			lineNumbers: true,
			autoCloseTags: true,
			smartIndent: true,
			matchTags: {bothTags: true},
		});
		setEditor(editor);
	}, []);

	return <textarea ref={textArea}></textarea>;
}

export default TextEditorContent;