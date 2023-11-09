import {SnackbarProvider} from 'notistack';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {MemoryConfigurationStore, MockIpfsClient, MockIpfsClusterApi} from 'testing';
import {App} from 'webui/src/App';
import {IpfsClusterContextProvider} from 'webui/src/context/IpfsClusterContext';
import {IpfsContextProvider} from 'webui/src/context/IpfsContext';
import {ToolBoxContextProvider} from 'webui/src/context/ToolBoxContext';
import {TOOLS} from 'webui/src/tools/TOOLS';

describe('App', () => {
	it('renders', async () => {
		const component = renderer.create(<MemoryRouter>
				<SnackbarProvider>
					<ToolBoxContextProvider store={new MemoryConfigurationStore()} tools={TOOLS}>
						<IpfsContextProvider create={() => new MockIpfsClient()}>
							<IpfsClusterContextProvider create={() => new MockIpfsClusterApi()}>
								<App/>
							</IpfsClusterContextProvider>
						</IpfsContextProvider>
					</ToolBoxContextProvider>
				</SnackbarProvider>
			</MemoryRouter>,
		);
	});
});
