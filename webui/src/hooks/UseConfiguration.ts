import {useEffect, useState} from 'react';
import {useToolBox} from '../context/ToolBoxContext';
import {DefaultConfiguration} from '../services/DefaultConfiguration';

function useConfigValue(name: string, def?: string) {
	const {config} = useToolBox();
	const [state, setState] = useState(config.get(name) ?? def);

	useEffect(() => {
		if (state) {
			config.set(name, state);
		}
	}, [state]);

	return [state, setState];
}

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
