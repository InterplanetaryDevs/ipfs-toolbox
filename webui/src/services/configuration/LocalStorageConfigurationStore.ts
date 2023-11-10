import {IConfigurationStore} from './IConfigurationStore';

export class LocalStorageConfigurationStore implements IConfigurationStore {
	get(key: string): string | undefined {
		return window.localStorage.getItem(key) ?? undefined;
	}

	set(key: string, value: string): void {
		window.localStorage.setItem(key, value);
	}
}
