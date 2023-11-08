import {IShortCut} from '../services/ShortcutService';
import {useToolBox} from '../context/ToolBoxContext';
import {useEffect} from 'react';

export function useShortCut(shortcut: IShortCut) {
	const {shortcutService} = useToolBox();

	useEffect(() => {
		const sym = shortcutService.registerShortcut(shortcut);
		return () => {
			shortcutService.removeShortcut(sym);
		};
	}, []);
}