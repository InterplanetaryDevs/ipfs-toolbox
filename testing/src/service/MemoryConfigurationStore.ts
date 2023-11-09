import {IConfigurationStore} from 'webui/src/services/IConfigurationStore';

export class MemoryConfigurationStore implements IConfigurationStore {
	public data = new Map<string, string>();

	get(key: string): string | undefined {
		return this.data.get(key);
	}

	set(key: string, value: string): void {
		this.data.set(key, value);
	}
}