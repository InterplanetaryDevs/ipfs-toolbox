import React, {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from 'react';
import {ITool} from '../types';
import {ConfigurationDefinition, DashboardDefinition} from '../tools/definitions';

export interface IToolBoxContext {
	tool: ITool,
	setTool: (value: (((prevState: ITool) => ITool) | ITool)) => void,
	isMenuOpen: boolean,
	setMenuOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void,
	isSearchOpen: boolean,
	setSearchOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void,
	menu: JSX.Element | undefined,
	setMenu: (value: (((prevState: (JSX.Element | undefined)) => (JSX.Element | undefined)) | JSX.Element | undefined)) => void,
}

const ToolBoxContext = createContext<IToolBoxContext>({} as IToolBoxContext);

export function ToolBoxContextProvider(props: PropsWithChildren) {
	const [tool, setTool] = useState(DashboardDefinition);
	const [menu, setMenu] = useState<JSX.Element>();
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);

	const handleKeyPress = useCallback((event: KeyboardEvent) => {
		if (event.key == 'h' && event.ctrlKey) {
			event.preventDefault();
			setTool(DashboardDefinition);
		} else if (event.key == ',' && event.ctrlKey) {
			event.preventDefault();
			setTool(ConfigurationDefinition);
		} else if (event.key == 'm' && event.ctrlKey) {
			event.preventDefault();
			setMenuOpen(v => !v);
		} else if (event.key == ' ' && event.ctrlKey) {
			event.preventDefault();
			setSearchOpen(v => !v);
		} else if (event.key == 'Escape') {
			event.preventDefault();
			setSearchOpen(false);
			setMenuOpen(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	return <ToolBoxContext.Provider value={{
		tool,
		setTool,
		isMenuOpen,
		setMenuOpen,
		menu,
		setMenu,
		isSearchOpen,
		setSearchOpen,
	}}>
		{props.children}
	</ToolBoxContext.Provider>;
}

export function useToolBox(): IToolBoxContext {
	return useContext<IToolBoxContext>(ToolBoxContext);
}
