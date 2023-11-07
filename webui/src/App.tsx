import {Box, CircularProgress, CssBaseline} from '@mui/material';
import React, {Suspense} from 'react';
import {AppBar} from './components/AppBar';
import {ErrorBoundary} from './components/ErrorBoundary';
import {Menu} from './components/Menu';
import {useToolBox} from './context/ToolBoxContext';
import {Footer} from './components/Footer';

export function App() {
	const toolBox = useToolBox();

	return <>
		<CssBaseline/>
		<ErrorBoundary>
			<AppBar/>
		</ErrorBoundary>
		<ErrorBoundary>
			<Menu/>
		</ErrorBoundary>
		<Box className={'tool-root'}>
			<Suspense fallback={<CircularProgress/>}>
				<ErrorBoundary>
					{toolBox.tool.tool}
				</ErrorBoundary>
			</Suspense>
		</Box>
		<Footer/>
	</>;
}
