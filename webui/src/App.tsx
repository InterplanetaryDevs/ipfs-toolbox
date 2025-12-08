import { Box, CircularProgress, CssBaseline } from '@mui/material';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppBar } from './components/AppBar';
import { Centered } from './components/Centered';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { ALL_TOOLS } from './tools/TOOLS';

export function App() {
	const routes = ALL_TOOLS.map(t => <Route path={t.url} element={<ErrorBoundary>{t.tool}</ErrorBoundary>} />);

	return <>
		<CssBaseline />
		<ErrorBoundary>
			<AppBar />
		</ErrorBoundary>
		<ErrorBoundary>
			<Menu />
		</ErrorBoundary>
		<Box id={'tool'}>
			<Suspense fallback={<Centered><CircularProgress size={45} /></Centered>}>
				<Routes>
					{routes}
				</Routes>
			</Suspense>
		</Box>
		<Footer />
	</>;
}
