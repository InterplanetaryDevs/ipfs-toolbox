import {CircularProgress} from '@mui/material';
import React, {lazy, Suspense} from 'react';
import {Centered} from './Centered';
import {ErrorBoundary} from './ErrorBoundary';

const TextEditorContent = lazy(() => import('./TextEditorContent'));

export interface ITextEditorProps {
	mode?: 'text' | 'json' | 'xml' | 'javascript';
}

export function TextEditor(props: ITextEditorProps) {
	return <Suspense fallback={<Centered>Loading Editor...<CircularProgress size={45}/></Centered>}>
		<ErrorBoundary>
			<TextEditorContent {...props}/>
		</ErrorBoundary>
	</Suspense>;
}