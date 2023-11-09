import {useToolBox} from '../context/ToolBoxContext';
import {useEffect} from 'react';
import {IShortCut} from '../services/ShortcutService/IShortCut';

export function useShortCut(shortcut: IShortCut) {
	const {shortcutService} = useToolBox();

	useEffect(() => {
		const sym = shortcutService.registerShortCut(shortcut);
		return () => {
			shortcutService.removeShortCut(sym);
		};
	}, []);
}
