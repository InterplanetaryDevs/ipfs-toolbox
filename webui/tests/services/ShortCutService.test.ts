import { IKeyBind } from 'src/services/ShortcutService/IKeyBind';
import { IShortCut } from 'src/services/ShortcutService/IShortCut';
import { ShortcutService } from 'src/services/ShortcutService/ShortcutService';
import { describe, it, expect } from 'vitest';

const shortcuts: Omit<IShortCut, 'action'>[] = [{
	name: 'Test',
	keyBind: {
		key: 'h',
		ctrl: true,
	},
}, {
	name: 'Cool Test',
	description: 'Some description text',
	hidden: true,
	keyBind: {
		key: 'h',
		shift: true,
		ctrl: true,
	},
}];

function createTestShortCut(action: () => void, index = 0, overrides: { keyBind?: IKeyBind, shortCut?: Partial<Omit<IShortCut, 'keyBind'>>; } = {}): IShortCut {
	let shortcut = shortcuts[Math.min(Math.min(index, 0), shortcuts.length - 1)];

	return {
		...shortcut,
		action,
		...(overrides.keyBind ?? {}),
		...(overrides.shortCut ?? {}),
	};
}

describe('Registration', () => {
	it('can register & remove item', () => {
		let called = 0;
		const service = new ShortcutService();
		const shortcut = createTestShortCut(() => {
			called++;
		});

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
		const shortcut = createTestShortCut(() => {
			called++;
		});

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

	it('doesnt show hidden shortcuts', () => {
		let called1 = 0;
		let called2 = 0;
		const service = new ShortcutService();
		const shortcut1 = createTestShortCut(() => {
			called1++;
		});
		const shortcut2 = createTestShortCut(() => {
			called2++;
		}, 1, { shortCut: { hidden: true } });
		service.registerShortCut(shortcut1);
		service.registerShortCut(shortcut2);

		const shortcuts = service.getShortCuts();

		expect(shortcuts.length).toBe(1);
		expect(shortcuts).toContain(shortcut1);
	});
});
