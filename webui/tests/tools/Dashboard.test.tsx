import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { MemoryConfigurationStore } from 'testing';
import { ToolBoxContextProvider } from 'src/context/ToolBoxContext';
import { Dashboard } from 'src/tools/Dashboard';
import { TOOLS } from 'src/tools/TOOLS';
import { describe, it, expect } from 'vitest';

describe('Dashboard', () => {
	it('renders', () => {
		const component = renderer.create(<MemoryRouter>
			<ToolBoxContextProvider store={new MemoryConfigurationStore()} tools={[TOOLS[0]]}>
				<Dashboard />,
			</ToolBoxContextProvider>
		</MemoryRouter>,
		);

		expect(component.toTree()).toMatchSnapshot();
	});
});
