import React, {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from 'react';
import {ITool, IToolCategory} from '../types';
import {ConfigurationDefinition, DashboardDefinition} from '../tools/definitions';
import {ALL_TOOLS, TOOLS} from '../tools/TOOLS';
import {ShortcutService} from '../services/ShortcutService';
import {useLocation, useNavigate} from 'react-router-dom';

export interface IToolBoxContext {
	tools: IToolCategory[]
	tool: ITool
	setTool: (value: ITool) => void,
	isMenuOpen: boolean,
	setMenuOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void,
	isSearchOpen: boolean,
	setSearchOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void,
	menu: JSX.Element | undefined,
	setMenu: (value: (((prevState: (JSX.Element | undefined)) => (JSX.Element | undefined)) | JSX.Element | undefined)) => void,
	shortcutService: ShortcutService
}

const ToolBoxContext = createContext<IToolBoxContext>({} as IToolBoxContext);

export function ToolBoxContextProvider(props: PropsWithChildren) {
	const [menu, setMenu] = useState<JSX.Element>();
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const shortcutService = useMemo(() => new ShortcutService(), []);
	const n = useNavigate();
	const location = useLocation();

	function setTool(tool: ITool) {
		n(tool.url);
	}

	const tool = ALL_TOOLS.find(t => t.url.startsWith(location.pathname));

	useEffect(() => {
		const symbols = [
			shortcutService.registerShortcut(
				{
					name: 'Search',
					keyBind: {
						key: ' ', ctrl: true, shift: false, alt: false
					},
					action: () => {
						setSearchOpen(true);
					}
				}),
			shortcutService.registerShortcut(
				{
					hidden: true,
					name: '',
					keyBind: {
						key: 'Escape', ctrl: false, shift: false, alt: false
					},
					action: () => {
						setSearchOpen(false);
						setMenuOpen(false);
					}
				}),
			shortcutService.registerShortcut(
				{
					name: 'Dashboard',
					description: 'Go to Dashboard',
					keyBind: {
						key: 'd', ctrl: true, shift: false, alt: false
					},
					action: () => {
						setTool(DashboardDefinition);
					}
				}),
			shortcutService.registerShortcut(
				{
					name: 'Configuration',
					description: 'Go to Configuration',
					keyBind: {
						key: ',', ctrl: true, shift: false, alt: false
					},
					action: () => {
						setTool(ConfigurationDefinition);
					}
				}),
			shortcutService.registerShortcut(
				{
					name: 'Menu',
					keyBind: {
						key: 'm', ctrl: true, shift: false, alt: false
					},
					action: () => {
						setMenuOpen(v => !v);
					}
				}),
		];

		return () => {
			symbols.forEach(s => shortcutService.removeShortcut(s));
		};
	}, []);

	useEffect(() => {
		const handleKeyPress = (ev: KeyboardEvent) => shortcutService.handleKeyPress(ev);
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	return <ToolBoxContext.Provider value={{
		tools: TOOLS,
		tool,
		setTool,
		isMenuOpen,
		setMenuOpen,
		menu,
		setMenu,
		isSearchOpen,
		setSearchOpen,
		shortcutService
	}}>
		{props.children}
	</ToolBoxContext.Provider>;
}

export function useToolBox(): IToolBoxContext {
	return useContext<IToolBoxContext>(ToolBoxContext);
}
