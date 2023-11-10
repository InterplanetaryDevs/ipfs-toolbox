import {useState} from 'react';
import {useToolBox} from '../context/ToolBoxContext';
import {DefaultConfiguration} from '../services/DefaultConfiguration';
import {IConfigurationService} from '../services/IConfigurationService';
import {IConfigurationStore} from '../services/IConfigurationStore';

export function useConfiguration(): IConfigurationService {
	return useToolBox().config;
}

interface IValueConverter<T> {
	from(value?: string): T | undefined;

	to(value?: T): string | undefined;
}

class BooleanConverter implements IValueConverter<boolean> {
	public from(value?: string): boolean | undefined {
		return value == 'true' ? true : value == 'false' ? false : undefined;
	}

	public to(value?: boolean): string | undefined {
		return value?.toString();
	}
}

class NullConverter implements IValueConverter<string> {
	public from(value?: string): string | undefined {
		return value;
	}

	public to(value?: string): string | undefined {
		return value;
	}
}

export function useConfigurationSetup(store: IConfigurationStore): IConfigurationService {
	const [ipfsUrl, setIpfsUrl] = useStringConfigValue(store, 'ipfsUrl', DefaultConfiguration.ipfsUrl);
	const [ipfsClusterUrl, setIpfsClusterUrl] = useStringConfigValue(store, 'ipfsClusterUrl', DefaultConfiguration.ipfsClusterUrl);
	const [darkMode, setDarkMode] = useConfigValue(store, 'darkMode', new BooleanConverter(), DefaultConfiguration.darkMode);

	return ({
		ipfsUrl,
		setIpfsUrl,
		ipfsClusterUrl,
		setIpfsClusterUrl,
		darkMode,
		setDarkMode,
	} as IConfigurationService);
}

export function useStringConfigValue(config: IConfigurationStore, name: string, def: string) {
	return useConfigValue<string>(config, name, new NullConverter(), def)
}
export function useConfigValue<T>(config: IConfigurationStore, name: string, converter: IValueConverter<T>, def: T) {
	const [state, setStateOrig] = useState<T>(converter.from(config.get(name)) ?? def);

	function setState(newState: T): void {
		console.debug('config value', name, 'changed from', state, 'to', newState);
		config.set(name, converter.to(newState)!);
		setStateOrig(newState);
	}

	return [state, setState];
}
