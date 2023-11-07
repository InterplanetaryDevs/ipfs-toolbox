import {Box, CircularProgress, CssBaseline} from '@mui/material';
import React, {Suspense} from 'react';
import {AppBar} from './components/AppBar';
import {ErrorBoundary} from './components/ErrorBoundary';
import {Menu} from './components/Menu';
import {Footer} from './components/Footer';
import {ALL_TOOLS} from './tools/TOOLS';
import {Route, Routes} from 'react-router-dom';
import {Centered} from './components/Centered';

export function App() {
	const routes = ALL_TOOLS.map(t => <Route path={t.url} element={t.tool}/>);

	return <>
		<CssBaseline/>
		<ErrorBoundary>
			<AppBar/>
		</ErrorBoundary>
		<ErrorBoundary>
			<Menu/>
		</ErrorBoundary>
		<Box id={'tool'}>
			<Suspense fallback={<Centered><CircularProgress size={45}/></Centered>}>
				<ErrorBoundary>
					<Routes>
						{routes}
					</Routes>
				</ErrorBoundary>
			</Suspense>
		</Box>
		<Footer/>
	</>;
}
