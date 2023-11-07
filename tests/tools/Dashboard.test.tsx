import renderer from 'react-test-renderer';
import React from 'react';
import {Dashboard} from 'webui/src/tools/Dashboard';
import {ToolBoxContextProvider} from 'webui/src/context/ToolBoxContext';
import {MemoryRouter} from 'react-router-dom'

describe('Dashboard', () => {
	it('renders', () => {
		const component = renderer.create(<MemoryRouter>
				<ToolBoxContextProvider>
					<Dashboard/>,
				</ToolBoxContextProvider>
			</MemoryRouter>
		);

		expect(component.toTree()).toMatchSnapshot();
	});
});
