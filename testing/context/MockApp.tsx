import React, {PropsWithChildren} from 'react';
import {ToolBoxContextProvider} from 'webui/src/context/ToolBoxContext';
import {MemoryRouter} from 'react-router-dom';

export function MockApp(props: PropsWithChildren<{}>) {
	return <MemoryRouter>
		<ToolBoxContextProvider>
			{props.children}
		</ToolBoxContextProvider>
	</MemoryRouter>
}