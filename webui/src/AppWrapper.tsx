import {IpfsClusterApi} from 'ipfs-cluster-api';
import {create} from 'kubo-rpc-client';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import {HashRouter} from 'react-router-dom';
import {App} from './App';
import {IpfsClusterContextProvider} from './context/IpfsClusterContext';
import {IpfsContextProvider} from './context/IpfsContext';
import {ToolBoxContextProvider} from './context/ToolBoxContext';
import {LocalStorageConfigurationStore} from './services/configuration';
import {TOOLS} from './tools/TOOLS';

export const AppWrapper = () => {
	return <HashRouter>
		<ToolBoxContextProvider store={new LocalStorageConfigurationStore()} tools={TOOLS}>
			<SnackbarProvider>
				<IpfsContextProvider create={(url) => create({url})}>
					<IpfsClusterContextProvider create={(url) => new IpfsClusterApi(url)}>
						<App/>
					</IpfsClusterContextProvider>
				</IpfsContextProvider>
			</SnackbarProvider>
		</ToolBoxContextProvider>
	</HashRouter>;
};
