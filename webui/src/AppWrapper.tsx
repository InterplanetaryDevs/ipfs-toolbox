import {createTheme, ThemeProvider} from '@mui/material/styles';
import {SnackbarProvider} from 'notistack';
import {HashRouter} from 'react-router-dom';
import {App} from './App';
import {IpfsClusterContextProvider} from './context/IpfsClusterContext';
import {IpfsContextProvider} from './context/IpfsContext';
import {ToolBoxContextProvider} from './context/ToolBoxContext';
import React from 'react';
import {Theme} from './Theme';
import {IpfsClusterApi} from 'ipfs-cluster-api';
import {create} from 'kubo-rpc-client';
import {LocalStorageConfigurationStore} from './services/LocalStorageConfigurationStore';
import {TOOLS} from './tools/TOOLS';

const theme = createTheme(Theme);

export const AppWrapper = () => {
	return <ThemeProvider theme={theme}>
		<HashRouter>
			<SnackbarProvider>
				<ToolBoxContextProvider store={new LocalStorageConfigurationStore()} tools={TOOLS}>
					<IpfsContextProvider create={(url) => create({url})}>
						<IpfsClusterContextProvider create={(url) => new IpfsClusterApi(url)}>
							<App/>
						</IpfsClusterContextProvider>
					</IpfsContextProvider>
				</ToolBoxContextProvider>
			</SnackbarProvider>
		</HashRouter>
	</ThemeProvider>;
};
