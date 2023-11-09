import {useState} from 'react';
import {useToolBox} from '../context/ToolBoxContext';
import {DefaultConfiguration} from '../services/DefaultConfiguration';
import {IConfigurationService} from '../services/IConfigurationService';
import {IConfigurationStore} from '../services/IConfigurationStore';
import {LocalStorageConfigurationStore} from '../services/LocalStorageConfigurationStore';

export function useConfiguration(): IConfigurationService {
	return useToolBox().config;
}

export function useConfigurationSetup(): IConfigurationService {
	const store = new LocalStorageConfigurationStore();
	const [ipfsUrl, setIpfsUrl] = useConfigValue(store, 'ipfsUrl', DefaultConfiguration.ipfsUrl);
	const [ipfsClusterUrl, setIpfsClusterUrl] = useConfigValue(store, 'ipfsClusterUrl', DefaultConfiguration.ipfsClusterUrl);

	return ({
		ipfsUrl,
		setIpfsUrl,
		ipfsClusterUrl,
		setIpfsClusterUrl,
	} as IConfigurationService);
}

function useConfigValue(config: IConfigurationStore, name: string, def?: string) {
	const [state, setStateOrig] = useState(config.get(name) ?? def);

	function setState(newState: string): void {
		console.debug('config value', name, 'changed from', state, 'to', newState);
		config.set(name, newState);
		setStateOrig(newState);
	}

	return [state, setState];
}
