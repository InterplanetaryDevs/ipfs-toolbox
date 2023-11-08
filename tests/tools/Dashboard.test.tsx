import renderer from 'react-test-renderer';
import React from 'react';
import {Dashboard} from 'webui/src/tools/Dashboard';
import {MockApp} from 'testing/context/MockApp';

describe('Dashboard', () => {
	it('renders', () => {
		const component = renderer.create(<MockApp>
				<Dashboard/>
			</MockApp>
		);

		expect(component.toTree()).toMatchSnapshot();
	});
});
