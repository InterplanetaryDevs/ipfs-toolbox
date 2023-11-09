import renderer from 'react-test-renderer';
import React from 'react';
import {Dashboard} from 'webui/src/tools/Dashboard';
import {ToolBoxContextProvider} from 'webui/src/context/ToolBoxContext';
import {MemoryRouter} from 'react-router-dom';
import {MemoryConfigurationStore} from 'testing';

describe('Dashboard', () => {
	it('renders', () => {
		const component = renderer.create(<MemoryRouter>
				<ToolBoxContextProvider store={new MemoryConfigurationStore()}>
					<Dashboard/>,
				</ToolBoxContextProvider>
			</MemoryRouter>
		);

		expect(component.toTree()).toMatchSnapshot();
	});
});
