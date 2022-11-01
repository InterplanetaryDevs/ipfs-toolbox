import renderer from 'react-test-renderer';
import React from 'react';
import {Dashboard} from 'webui/src/tools/Dashboard';

describe('Dashboard', () => {
	it('renders', () => {
		const component = renderer.create(
			<Dashboard/>,
		);

		expect(component.toTree()).toMatchSnapshot();
	})
})