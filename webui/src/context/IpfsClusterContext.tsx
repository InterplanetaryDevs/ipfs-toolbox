import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {IpfsClusterApi} from 'ipfs-cluster-api';
import {INodeContext} from './INodeContext';
import {useConnectionChecker} from '../hooks/UseConnectionChecker';


const IpfsClusterContext = createContext({} as IIpfsClusterContext);

export interface IIpfsClusterContext extends INodeContext<IpfsClusterApi> {
}

export const IpfsClusterContextProvider = (props: any) => {
	const [url, setUrl] = useState('http://localhost:9094');

	const api = useMemo(() => new IpfsClusterApi(url), [url]);
	const check = useCallback(() => api.id().then(() => true), [api]);
	const {connected, checking} = useConnectionChecker(check);

	return <IpfsClusterContext.Provider
		value={{
			setApiUrl: setUrl,
			apiUrl: url,
			url,
			node: api,
			connected,
			checking
		}}
	>
		{props.children}
	</IpfsClusterContext.Provider>;
};

export const useIpfsCluster = () => useContext(IpfsClusterContext);
