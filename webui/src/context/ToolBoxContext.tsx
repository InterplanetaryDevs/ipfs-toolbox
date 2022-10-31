import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {ITool} from '../App';
import {DashboardDefinition} from '../components/Dashboard';

export interface IToolBoxContext {
	tool: ITool,
	setTool: (value: (((prevState: ITool) => ITool) | ITool)) => void,
	isMenuOpen: boolean,
	setMenuOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void,
	menu: JSX.Element,
	setMenu: (value: (((prevState: (JSX.Element | undefined)) => (JSX.Element | undefined)) | JSX.Element | undefined)) => void,
}

const ToolBoxContext = createContext<IToolBoxContext>({} as IToolBoxContext);

export function ToolBoxContextProvider(props: PropsWithChildren) {
	const [tool, setTool] = useState(DashboardDefinition);
	const [menu, setMenu] = useState<JSX.Element>();
	const [isMenuOpen, setMenuOpen] = useState(false);

	return <ToolBoxContext.Provider value={{
		tool,
		setTool,
		isMenuOpen,
		setMenuOpen,
		menu,
		setMenu,
	}}>
		{props.children}
	</ToolBoxContext.Provider>;
}

export function useToolBox(): IToolBoxContext {
	return useContext<IToolBoxContext>(ToolBoxContext);
}
