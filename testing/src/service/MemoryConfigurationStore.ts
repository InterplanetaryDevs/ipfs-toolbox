import {IConfigurationStore} from 'webui/src/services/configuration/IConfigurationStore';

export class MemoryConfigurationStore implements IConfigurationStore {
	public data = new Map<string, any>();

	get<T>(key: string): T | undefined {
		return this.data.get(key);
	}

	set<T>(key: string, value: T): void {
		this.data.set(key, value);
	}
}