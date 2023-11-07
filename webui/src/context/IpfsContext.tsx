import React, {
	createContext, MutableRefObject,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import {create, IPFSHTTPClient} from 'kubo-rpc-client';
import {INodeContext} from './INodeContext';
import {useConnectionChecker} from '../hooks/UseConnectionChecker';

export interface IIpfsContext extends INodeContext<IPFSHTTPClient> {
}

const IpfsContext = createContext<IIpfsContext>({} as IIpfsContext);

export function IpfsContextProvider(props: PropsWithChildren) {
	const [apiUrl, setApiUrl] = useState<string>('/ip4/127.0.0.1/tcp/5001');

	const ipfs = useMemo(() => create({url: apiUrl}), [apiUrl]);
	const check = useCallback(() => ipfs.id().then(() => true), [ipfs]);
	const {connected, checking} = useConnectionChecker(check);

	return <IpfsContext.Provider value={{
		apiUrl,
		setApiUrl,
		node: ipfs,
		connected,
		checking
	}}>
		{props.children}
	</IpfsContext.Provider>;
}

export function useIpfs() {
	return useContext(IpfsContext);
}
