import {IShortCut} from './IShortCut';

export class ShortcutService {
	private shortcuts = new Map<symbol, IShortCut>();

	public handleKeyPress(event: KeyboardEvent) {
		const active = this.getAllShortcuts().find(s => s.keyBind.key.toLowerCase() == event.key.toLowerCase()
			&& Boolean(s.keyBind.ctrl) == event.ctrlKey
			&& Boolean(s.keyBind.shift) == event.shiftKey
			&& Boolean(s.keyBind.alt) == event.altKey,
		);

		if (active) {
			event.preventDefault();
			active.action?.();
		}
	}

	public getShortCuts() {
		return this.getAllShortcuts().filter(s => s.hidden != true);
	}

	registerShortCut(item: IShortCut) {
		const sym = item.id ?? Symbol();
		this.shortcuts.set(sym, item);
		return sym;
	}

	removeShortCut(sym: symbol) {
		if (this.shortcuts.has(sym)) {
			this.shortcuts.delete(sym);
		}
	}

	getShortCut(sym: symbol): IShortCut | undefined {
		return this.shortcuts.has(sym) ? this.shortcuts.get(sym) : undefined;
	}

	private getAllShortcuts() {
		return Array.from(this.shortcuts.values());
	}
}
