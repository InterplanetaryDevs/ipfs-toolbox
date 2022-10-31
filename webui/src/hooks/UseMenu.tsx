import {useEffect} from 'react';
import {useToolBox} from '../context/ToolBoxContext';

export function useMenu(menu: JSX.Element): void {
	const toolBox = useToolBox();
	useEffect(() => {
		toolBox.setMenu(menu);
		return () => {
			toolBox.setMenu(undefined);
		};
	}, [menu]);
}
