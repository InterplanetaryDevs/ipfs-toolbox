import React, {
	createContext, MutableRefObject,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {create, IPFSHTTPClient} from 'kubo-rpc-client';
import {INodeContext} from './INodeContext';
import {useConnectionChecker} from '../hooks/UseConnectionChecker';
import {Alert, Stack} from '@mui/material';
import {useConfiguration} from '../hooks/UseConfiguration';

export interface IIpfsContext extends INodeContext<IPFSHTTPClient> {
}

const IpfsContext = createContext<IIpfsContext>({} as IIpfsContext);

export function IpfsContextProvider(props: PropsWithChildren) {
	const {ipfsUrl} = useConfiguration();

	const ipfs = useMemo(() => create({url: ipfsUrl}), [ipfsUrl]);
	const check = useCallback(() => ipfs.id().then(() => true), [ipfs]);
	const {connected, checking, runCheck} = useConnectionChecker(check);

	useEffect(() => {
		runCheck();
	}, [check]);

	return <IpfsContext.Provider value={{
		runCheck,
		node: ipfs,
		connected,
		checking,
		notConnectedMessage: <Stack spacing={2}>
			<Alert severity={'error'}>Could not connect to IPFS node!</Alert>
			<Alert severity={'info'}>
				<p>Try running the code below to update the IPFS API headers.</p>
				<code>ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["https://ipfs-toolbox.on.fleek.co",
					"http://ipfs-toolbox.on.fleek.co.localhost:8080", "http://localhost:3000", "http://127.0.0.1:5001",
					"https://webui.ipfs.io"]'
					ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'</code>
			</Alert>
		</Stack>,
	}}>
		{props.children}
	</IpfsContext.Provider>;
}

export function useIpfs() {
	return useContext(IpfsContext);
}
