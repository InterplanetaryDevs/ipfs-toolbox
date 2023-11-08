import React, {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from 'react';
import {ITool, IToolCategory} from '../types';
import {ConfigurationDefinition, DashboardDefinition} from '../tools/definitions';
import {ALL_TOOLS, TOOLS} from '../tools/TOOLS';
import {ShortcutService} from '../services/ShortcutService';
import {useLocation, useNavigate} from 'react-router-dom';
import {ConfigurationService, IConfigurationService} from '../services/ConfigurationService';
import {LocalStorageConfigurationStore} from '../services/LocalStorageConfigurationStore';

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
	configuration: IConfigurationService
}

const ToolBoxContext = createContext<IToolBoxContext>({} as IToolBoxContext);

export function ToolBoxContextProvider(props: PropsWithChildren) {
	const [menu, setMenu] = useState<JSX.Element>();
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const shortcutService = useMemo(() => new ShortcutService(), []);
	const configurationService = useMemo(() => new ConfigurationService(new LocalStorageConfigurationStore()), []);
	const n = useNavigate();
	const location = useLocation();

	function setTool(tool: ITool) {
		n(tool.url);
	}

	const tool = ALL_TOOLS.find(t => t.url.startsWith(location.pathname))!;

	useEffect(() => {
		const symbols = [
			shortcutService.registerShortcut(
				{
					category: 'Global',
					name: 'Search',
					keyBind: {key: ' ', ctrl: true},
					action: () => setSearchOpen(true)
				}),
			shortcutService.registerShortcut(
				{
					category: 'Global',
					hidden: true,
					name: '',
					keyBind: {key: 'Escape'},
					action: () => {
						setSearchOpen(false);
						setMenuOpen(false);
					}
				}),
			shortcutService.registerShortcut(
				{
					category: 'Global',
					name: 'Dashboard',
					description: 'Go to Dashboard',
					keyBind: {key: 'd', ctrl: true},
					action: () => setTool(DashboardDefinition)
				}),
			shortcutService.registerShortcut(
				{
					category: 'Global',
					name: 'Configuration',
					description: 'Go to Configuration',
					keyBind: {key: ',', ctrl: true},
					action: () => setTool(ConfigurationDefinition)
				}),
			shortcutService.registerShortcut(
				{
					category: 'Global',
					name: 'Menu',
					keyBind: {key: 'm', ctrl: true},
					action: () => setMenuOpen(v => !v)
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
		shortcutService,
		configuration: configurationService
	}}>
		{props.children}
	</ToolBoxContext.Provider>;
}

export function useToolBox(): IToolBoxContext {
	return useContext<IToolBoxContext>(ToolBoxContext);
}
