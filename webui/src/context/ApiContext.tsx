import React, {createContext, useContext, useMemo, useState} from 'react';
import {IpfsClusterApi} from 'ipfs-cluster-api';


const IpfsClusterContext = createContext({} as IIpfsClusterContext);

export interface IIpfsClusterContext {
	setUrl(url: string): void;

	url: string;
	ipfsCluster: IpfsClusterApi;
}

export const IpfsClusterContextProvider = (props: any) => {
	const [url, setUrl] = useState('http://localhost:9094');
	const api = useMemo(() => new IpfsClusterApi(url), [url]);

	return <IpfsClusterContext.Provider
		value={{
			setUrl,
			url,
			ipfsCluster: api,
		}}
	>
		{props.children}
	</IpfsClusterContext.Provider>;
};

export const useIpfsCluster = () => useContext(IpfsClusterContext);
