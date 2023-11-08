import {useEffect, useState} from 'react';
import {useToolBox} from '../context/ToolBoxContext';
import {DefaultConfiguration} from '../services/DefaultConfiguration';

export function useConfiguration() {
	const [ipfsUrl, setIpfsUrl] = useConfigValue('ipfsUrl', DefaultConfiguration.ipfsUrl);
	const [ipfsClusterUrl, setIpfsClusterUrl] = useConfigValue('ipfsClusterUrl', DefaultConfiguration.ipfsClusterUrl);

	return {
		ipfsUrl,
		setIpfsUrl,
		ipfsClusterUrl,
		setIpfsClusterUrl,
	};
}

function useConfigValue(name: string, def?: string) {
	const {config} = useToolBox();
	const [state, setState] = useState(config.get(name) ?? def);

	useEffect(() => {
		if (state != config.get(name)) {
			console.debug('config value', name, 'changed from', config.get(name), 'to', state);
		}
		if (state) {
			config.set(name, state);
		}
	}, [state]);

	return [state, setState];
}
