import React, {createContext, PropsWithChildren, useCallback, useContext, useMemo} from 'react';
import {IIpfsClusterApi} from 'ipfs-cluster-api';
import {useConfigurationProperty} from '../hooks/UseConfigurationProperty';
import {INodeContext} from './INodeContext';
import {useConnectionChecker} from '../hooks/UseConnectionChecker';
import {useConfiguration} from '../hooks/UseConfiguration';


const IpfsClusterContext = createContext({} as IIpfsClusterContext);

export interface IIpfsClusterContext extends INodeContext<IIpfsClusterApi> {
}

export const IpfsClusterContextProvider = (props: PropsWithChildren<{ create: (url: string) => IIpfsClusterApi }>) => {
	const config = useConfiguration();
	const [ipfsClusterUrl] = useConfigurationProperty<string>(config.ipfsClusterUrl);

	const api = useMemo(() => props.create(ipfsClusterUrl), [ipfsClusterUrl]);
	const check = useCallback(() => api.id().then(() => true), [api]);
	const {runCheck, connected, checking} = useConnectionChecker(check, 25000);

	return <IpfsClusterContext.Provider
		value={{
			runCheck,
			node: api,
			connected,
			checking,
		}}
	>
		{props.children}
	</IpfsClusterContext.Provider>;
};

export const useIpfsCluster = () => useContext(IpfsClusterContext);
