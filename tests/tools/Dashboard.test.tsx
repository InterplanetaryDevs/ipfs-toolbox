import renderer from 'react-test-renderer';
import React from 'react';
import {Dashboard} from 'webui/src/tools/Dashboard';
import {ToolBoxContextProvider} from 'webui/src/context/ToolBoxContext';

describe('Dashboard', () => {
	it('renders', () => {
		const component = renderer.create(<ToolBoxContextProvider>
				<Dashboard/>,
			</ToolBoxContextProvider>
		);

		expect(component.toTree()).toMatchSnapshot();
	});
});
