import {IShortCut} from 'webui/src/services/ShortcutService/IShortCut';
import {ShortcutService} from 'webui/src/services/ShortcutService/ShortcutService';

describe('Registration', () => {
	it('can register & remove item', () => {
		let called = 0;
		const service = new ShortcutService();
		const shortcut: IShortCut = {
			name: 'Test',
			keyBind: {
				key: 'h',
				ctrl: true,
			},
			action: () => {
				called++;
			},
		};

		const sym = service.registerShortCut(shortcut);

		expect(sym).not.toBe(null);
		expect(sym).not.toBe(undefined);
		expect(service.getShortCut(sym)).toBe(shortcut);

		service.removeShortCut(sym);

		expect(service.getShortCut(sym)).toBe(undefined);
		expect(called).toBe(0);
	});

	it('triggers the correct shortcut', () => {
		let called = 0;
		const service = new ShortcutService();
		const shortcut: IShortCut = {
			name: 'Test',
			keyBind: {
				key: 'h',
				ctrl: true,
			},
			action: () => {
				called++;
			},
		};

		service.registerShortCut(shortcut);

		service.handleKeyPress(new KeyboardEvent('keyDown', {
			key: 'h',
			ctrlKey: true,
		}));

		expect(called).toBe(1);

		service.handleKeyPress(new KeyboardEvent('keyDown', {
			key: 'h',
			ctrlKey: false,
		}));
		service.handleKeyPress(new KeyboardEvent('keyDown', {
			key: 'x',
			ctrlKey: true,
		}));

		expect(called).toBe(1);

		service.handleKeyPress(new KeyboardEvent('keyDown', {
			key: 'h',
			ctrlKey: true,
		}));

		expect(called).toBe(2);
	});
});
