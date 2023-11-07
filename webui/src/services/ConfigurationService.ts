import {IConfigurationStore} from './IConfigurationStore';

export interface IConfigurationService {
	ipfsUrl: string;
}

export class ConfigurationService implements IConfigurationService {
	constructor(private store: IConfigurationStore) {
	}

	get ipfsUrl() {
		return this.store.get('ipfs-url') ?? '/ip4/127.0.0.1/tcp/5001';
	}

	set ipfsUrl(value) {
		this.store.set('ipfs-url', value);
	}
}
