import React, {createContext, PropsWithChildren, useContext, useMemo, useState} from 'react';
import {create} from 'ipfs-http-client';
import type {IPFS} from 'ipfs-core-types';

export interface IIpfsContext {
	apiUrl: string;

	setApiUrl(value: string): void;

	ipfs: IPFS;
}

const IpfsContext = createContext<IIpfsContext>({} as IIpfsContext);

export function IpfsContextProvider(props: PropsWithChildren) {
	const [apiUrl, setApiUrl] = useState<string>('/ip4/127.0.0.1/tcp/5001');

	const ipfs = useMemo(() => create({url: apiUrl}), [apiUrl]);

	return <IpfsContext.Provider value={{
		apiUrl,
		setApiUrl,
		ipfs,
	}}>
		{props.children}
	</IpfsContext.Provider>;
}

export function useIpfs() {
	return useContext(IpfsContext);
}
