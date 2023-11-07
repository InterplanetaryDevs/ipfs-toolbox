export interface IKeyBind {
	key: string;
	ctrl: boolean;
	alt: boolean;
	shift: boolean;
}

export interface IShortCut {
	name: string;
	keyBind: IKeyBind;
	action: () => void;
	description?: string;
	hidden?: boolean;
}

export class ShortcutService {
	private shortcuts = new Map<symbol, IShortCut>();

	public handleKeyPress(event: KeyboardEvent) {
		const active = this.getAllShortcuts().find(s => s.keyBind.key.toLowerCase() == event.key.toUpperCase()
			&& s.keyBind.ctrl == event.ctrlKey
			&& s.keyBind.shift == event.shiftKey
			&& s.keyBind.alt == event.altKey
		);

		if (active) {
			event.preventDefault();
			active.action?.();
		}
	}

	public getShortcuts() {
		return this.getAllShortcuts().filter(s => s.hidden != true);
	}

	registerShortcut(item: IShortCut) {
		const sym = Symbol();
		this.shortcuts.set(sym, item);
		return sym;
	}

	removeShortcut(sym: symbol) {
		if (this.shortcuts.has(sym)) this.shortcuts.delete(sym);
	}

	private getAllShortcuts() {
		return Array.from(this.shortcuts.values());
	}
}
