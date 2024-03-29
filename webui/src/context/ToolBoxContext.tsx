import React, {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from 'react';
import {useConfigurationSetup} from '../hooks/UseConfiguration';
import {IConfigurationService} from '../services/IConfigurationService';
import {IShortCut} from '../services/ShortcutService/IShortCut';
import {ITool, IToolCategory} from '../types';
import {ConfigurationDefinition, DashboardDefinition} from '../tools/definitions';
import {ALL_TOOLS, TOOLS} from '../tools/TOOLS';
import {ShortcutService} from '../services/ShortcutService/ShortcutService';
import {useLocation, useNavigate} from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {IConfigurationStore} from '../services/IConfigurationStore';

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
	config: IConfigurationService
}

const ToolBoxContext = createContext<IToolBoxContext>({} as IToolBoxContext);

function useToolShortCut(tool: ITool): Omit<IShortCut, 'keyBind'> {
	const n = useNavigate();

	return {
		name: tool.name,
		icon: tool.icon,
		description: 'Go to Dashboard',
		action: () => n(tool.url),
		id: Symbol.for(tool.name),
	};
}

export function ToolBoxContextProvider(props: PropsWithChildren<{ store: IConfigurationStore }>) {
	const [menu, setMenu] = useState<JSX.Element>();
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const shortcutService = useMemo(() => new ShortcutService(), []);
	const n = useNavigate();
	const location = useLocation();
	const dashboardShortCut = useToolShortCut(DashboardDefinition);
	const configurationShort = useToolShortCut(ConfigurationDefinition);
	const config = useConfigurationSetup(props.store);

	function setTool(tool: ITool) {
		n(tool.url);
	}

	const tool = location.pathname == '/' ? DashboardDefinition : ALL_TOOLS.find(t => t.url.startsWith(location.pathname))!;

	useEffect(() => {
		const symbols = [
			shortcutService.registerShortCut(
				{
					category: 'Global',
					name: 'Search',
					keyBind: {key: ' ', ctrl: true},
					action: () => setSearchOpen(true),
				}),
			shortcutService.registerShortCut(
				{
					category: 'Global',
					hidden: true,
					name: '',
					keyBind: {key: 'Escape'},
					action: () => {
						setSearchOpen(false);
						setMenuOpen(false);
					},
				}),
			shortcutService.registerShortCut(
				{
					...dashboardShortCut,
					icon: <DashboardIcon/>,
					category: 'Global',
					description: 'Go to Dashboard',
					keyBind: {key: 'd', ctrl: true},
				}),
			shortcutService.registerShortCut(
				{
					...configurationShort,
					category: 'Global',
					description: 'Go to Configuration',
					keyBind: {key: ',', ctrl: true},
				}),
			shortcutService.registerShortCut(
				{
					category: 'Global',
					name: 'Menu',
					keyBind: {key: 'm', ctrl: true},
					action: () => setMenuOpen(v => !v),
				}),
		];

		return () => {
			symbols.forEach(s => shortcutService.removeShortCut(s));
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
		config,
	}}>
		{props.children}
	</ToolBoxContext.Provider>;
}

export function useToolBox(): IToolBoxContext {
	return useContext<IToolBoxContext>(ToolBoxContext);
}
