import {SnackbarProvider} from 'notistack';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {MemoryConfigurationStore} from 'testing';
import {ShortcutButton} from 'webui/src/components/ShortcutButton';
import {ShortCutDisplay} from 'webui/src/components/ShortCutDisplay';
import {ShortCutList} from 'webui/src/components/ShortCutList';
import {ToolBoxContextProvider} from 'webui/src/context/ToolBoxContext';

describe('ShortCuts', () => {
	it('Renders List', async () => {
		const component = renderer.create(<MemoryRouter>
			<SnackbarProvider>
				<ToolBoxContextProvider store={new MemoryConfigurationStore()}>
					<ShortCutList/>
				</ToolBoxContextProvider>
			</SnackbarProvider>
		</MemoryRouter>);

		expect(component).toMatchSnapshot();
	});

	it('Renders Display', async () => {
		const component = renderer.create(<ShortCutDisplay keyBind={{
			key: 'h',
			ctrl: true,
			alt: true,
		}}/>);

		expect(component).toMatchSnapshot();
	});

	it('Shortcutbutton works', async () => {
		let called = 0;
		const component = renderer.create(<ShortcutButton shortcut={{
			action: () => {
				called++;
			},
			name: 'Test shortcut',
			keyBind: {
				key: 'h',
				ctrl: true,
				alt: true,
			},
		}}/>);

		expect(called).toBe(0);

		component.root.findByType('button').props.onClick();

		expect(called).toBe(1);

		expect(component).toMatchSnapshot();
	});

	it('Shortcutbutton iconOnly works', async () => {
		let called = 0;
		const component = renderer.create(<ShortcutButton iconOnly={true} shortcut={{
			action: () => {
				called++;
			},
			name: 'Test shortcut',
			keyBind: {
				key: 'h',
				ctrl: true,
				alt: true,
			},
		}}/>);

		expect(called).toBe(0);

		component.root.findByType('button').props.onClick();

		expect(called).toBe(1);

		expect(component).toMatchSnapshot();
	});
});