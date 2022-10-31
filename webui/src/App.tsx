import {Box, CircularProgress, CssBaseline} from '@mui/material';
import React, {Suspense} from 'react';
import {AppBar} from './components/AppBar';
import {ErrorBoundary} from './components/ErrorBoundary';
import {Menu} from './components/Menu';
import {useToolBox} from './context/ToolBoxContext';

export interface ITool {
	icon?: JSX.Element;
	name: string;
	tool: JSX.Element;
	image?: string;
}

export function App() {
	const toolBox = useToolBox();

	return <>
		<CssBaseline/>
		<AppBar/>
		<Menu/>
		<Box className={'tool-root'}>
			<ErrorBoundary>
				<Suspense fallback={<CircularProgress/>}>
					{toolBox.tool.tool}
				</Suspense>
			</ErrorBoundary>
		</Box>
	</>;
}
