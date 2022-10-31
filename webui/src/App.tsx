import {Box, CircularProgress, CssBaseline} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import React, {Suspense} from 'react';
import {AppBar} from './components/AppBar';
import {ErrorBoundary} from './components/ErrorBoundary';
import {Menu} from './components/Menu';
import {useToolBox} from './context/ToolBoxContext';

export interface ITool {
  icon?: JSX.Element;
  name: string;
  tool: JSX.Element;
}

export function App() {
  const toolBox = useToolBox();

  return <>
    <CssBaseline/>
    <AppBar/>
    <Menu/>
    <Toolbar/>
    <Box sx={{width: '100%', height: '100%', flexGrow: 3}}>
      <ErrorBoundary>
        <Suspense fallback={<CircularProgress/>}>
          {toolBox.tool.tool}
        </Suspense>
      </ErrorBoundary>
    </Box>
  </>;
}
