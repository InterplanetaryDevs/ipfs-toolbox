import {IConfigurationStore} from './IConfigurationStore';
import {DefaultConfiguration} from './DefaultConfiguration';

export interface IConfiguration {
	get ipfsUrl(): string;

	get ipfsClusterUrl(): string;
}

export interface IConfigurationService extends IConfiguration {
	set ipfsUrl(value: string);

	set ipfsClusterUrl(value: string);
}

export class ConfigurationService implements IConfigurationService {
	constructor(private store: IConfigurationStore) {
	}

	get ipfsUrl() {
		return this.store.get('ipfs-url') ?? DefaultConfiguration.ipfsUrl;
	}

	set ipfsUrl(value: string) {
		this.store.set('ipfs-url', value);
	}

	get ipfsClusterUrl() {
		return this.store.get('ipfs-cluster-url') ?? DefaultConfiguration.ipfsClusterUrl;
	}

	set ipfsClusterUrl(value: string) {
		this.store.set('ipfs-cluster-url', value);
	}
}
