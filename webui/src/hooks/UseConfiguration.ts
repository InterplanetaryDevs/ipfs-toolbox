import {useState} from 'react';
import {useToolBox} from '../context/ToolBoxContext';
import {DefaultConfiguration} from '../services/DefaultConfiguration';
import {IConfigurationService} from '../services/IConfigurationService';
import {IConfigurationStore} from '../services/IConfigurationStore';

export function useConfiguration(): IConfigurationService {
	return useToolBox().config;
}

export function useConfigurationSetup(store: IConfigurationStore): IConfigurationService {
	const [ipfsUrl, setIpfsUrl] = useConfigValue(store, 'ipfsUrl', DefaultConfiguration.ipfsUrl);
	const [ipfsClusterUrl, setIpfsClusterUrl] = useConfigValue(store, 'ipfsClusterUrl', DefaultConfiguration.ipfsClusterUrl);
	const [darkMode, setDarkMode] = useConfigValue(store, 'darkMode', DefaultConfiguration.darkMode);

	return ({
		ipfsUrl,
		setIpfsUrl,
		ipfsClusterUrl,
		setIpfsClusterUrl,
		darkMode,
		setDarkMode,
	} as IConfigurationService);
}

export function useConfigValue<T>(config: IConfigurationStore, name: string, def?: T) {
	const [state, setStateOrig] = useState<T>(config.get(name) ?? def);

	function setState(newState: T): void {
		console.debug('config value', name, 'changed from', state, 'to', newState);
		config.set(name, newState);
		setStateOrig(newState);
	}

	return [state, setState];
}
