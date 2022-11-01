import {createTheme, ThemeProvider} from '@mui/material/styles';
import {SnackbarProvider} from 'notistack';
import {HashRouter} from 'react-router-dom';
import {App} from './App';
import {IpfsClusterContextProvider} from './context/IpfsClusterContext';
import {IpfsContextProvider} from './context/IpfsContext';
import {ToolBoxContextProvider} from './context/ToolBoxContext';
import React from 'react';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export const AppWrapper = () => {
	return <ThemeProvider theme={theme}>
		<HashRouter>
			<SnackbarProvider>
				<ToolBoxContextProvider>
					<IpfsContextProvider>
						<IpfsClusterContextProvider>
							<App/>
						</IpfsClusterContextProvider>
					</IpfsContextProvider>
				</ToolBoxContextProvider>
			</SnackbarProvider>
		</HashRouter>
	</ThemeProvider>;
};
