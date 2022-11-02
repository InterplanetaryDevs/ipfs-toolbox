import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {ITool, IToolCategory} from '../types';
import {ConfigurationDefinition, DashboardDefinition} from '../tools/definitions';
import {TOOLS} from '../tools/TOOLS';
import {useKeyBind} from '../hooks/UseKeyBind';
import {DefaultAppConfiguration, IAppConfiguration} from '../types/IAppConfiguration';

export interface IToolBoxContext {
	tools: IToolCategory[];
	tool: ITool;
	setTool: (value: (((prevState: ITool) => ITool) | ITool)) => void;
	isMenuOpen: boolean;
	setMenuOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void;
	isSearchOpen: boolean;
	setSearchOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void;
	menu: JSX.Element | undefined;
	setMenu: (value: (((prevState: (JSX.Element | undefined)) => (JSX.Element | undefined)) | JSX.Element | undefined)) => void;
	setConfiguration: (config: IAppConfiguration) => void;
	configuration: IAppConfiguration;
}

const ToolboxConfigurationKey = 'IpfsToolBoxConfiguration';

const ToolBoxContext = createContext<IToolBoxContext>({} as IToolBoxContext);

export function ToolBoxContextProvider(props: PropsWithChildren) {
	const [configuration, setConfigurationInternal] = useState<IAppConfiguration>(DefaultAppConfiguration);
	const [tool, setTool] = useState(DashboardDefinition);
	const [menu, setMenu] = useState<JSX.Element>();
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		let item = localStorage.getItem(ToolboxConfigurationKey);
		if (item) {
			setConfigurationInternal(JSON.parse(item));
		}
	}, []);

	const setConfiguration = (config: IAppConfiguration) => {
		localStorage.setItem(ToolboxConfigurationKey, JSON.stringify(config));
		setConfigurationInternal(config);
	};

	useKeyBind(configuration.keyBinds.Home, () => setTool(DashboardDefinition));
	useKeyBind(configuration.keyBinds.Configuration, () => setTool(ConfigurationDefinition));
	useKeyBind(configuration.keyBinds.Menu, () => setMenuOpen(v => !v));
	useKeyBind(configuration.keyBinds.ToolSearch, () => setSearchOpen(v => !v));

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
		setConfiguration,
		configuration,
	}}>
		{props.children}
	</ToolBoxContext.Provider>;
}

export function useToolBox(): IToolBoxContext {
	return useContext<IToolBoxContext>(ToolBoxContext);
}
