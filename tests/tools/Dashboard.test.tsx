import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {MemoryConfigurationStore} from 'testing';
import {ToolBoxContextProvider} from 'webui/src/context/ToolBoxContext';
import {Dashboard} from 'webui/src/tools/Dashboard';
import {TOOLS} from 'webui/src/tools/TOOLS';

describe('Dashboard', () => {
	it('renders', () => {
		const component = renderer.create(<MemoryRouter>
				<ToolBoxContextProvider store={new MemoryConfigurationStore()} tools={[TOOLS[0]]}>
					<Dashboard/>,
				</ToolBoxContextProvider>
			</MemoryRouter>,
		);

		expect(component.toTree()).toMatchSnapshot();
	});
});
