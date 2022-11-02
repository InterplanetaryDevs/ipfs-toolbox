import {createContext, PropsWithChildren} from 'react';
import {IIpfsContext} from 'webui/src/context/IpfsContext';

const MockIpfsContext = createContext({} as IIpfsContext);

export function MockIpfsContextProvider({children}: PropsWithChildren) {
	return <MockIpfsContext.Provider value={}>
		{children}
	</MockIpfsContext.Provider>;
}
