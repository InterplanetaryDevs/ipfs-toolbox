import {Alert, Stack} from '@mui/material';
import {IPFSHTTPClient} from 'kubo-rpc-client';
import React, {createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo} from 'react';
import {useConfiguration} from '../hooks/UseConfiguration';
import {useConfigurationProperty} from '../hooks/UseConfigurationProperty';
import {useConnectionChecker} from '../hooks/UseConnectionChecker';
import {INodeContext} from './INodeContext';

export interface IIpfsContext extends INodeContext<IPFSHTTPClient> {
}

const IpfsContext = createContext<IIpfsContext>({} as IIpfsContext);

export function IpfsContextProvider(props: PropsWithChildren<{ create: (url: string) => IPFSHTTPClient }>) {
	const config = useConfiguration();
	const [ipfsUrl] = useConfigurationProperty<string>(config.ipfsUrl);

	const ipfs = useMemo(() => props.create(ipfsUrl), [ipfsUrl]);
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
