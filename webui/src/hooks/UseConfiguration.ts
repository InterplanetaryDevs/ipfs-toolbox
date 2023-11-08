import {useToolBox} from '../context/ToolBoxContext';
import {useEffect, useState} from 'react';

export function useConfiguration() {
	const {configuration} = useToolBox();

	const [ipfsUrl, setIpfsUrl] = useState(configuration.ipfsUrl);
	useEffect(() => {
		configuration.ipfsUrl = ipfsUrl;
	}, [ipfsUrl]);

	const [ipfsClusterUrl, setIpfsClusterUrl] = useState(configuration.ipfsClusterUrl);

	return {
		ipfsUrl,
		setIpfsUrl,
		ipfsClusterUrl,
		setIpfsClusterUrl,
	};
}