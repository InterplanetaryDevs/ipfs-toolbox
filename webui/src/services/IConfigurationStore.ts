/**
 * Configuration storage service
 */
export interface IConfigurationStore {
	/**
	 * Get an item from the store
	 * @param key of the item to retrieve
	 */
	get(key: string): string | undefined;

	/**
	 * Set the value for an item in the store
	 * @param key of the item to set
	 * @param value of the item to set
	 */
	set(key: string, value: string): void;
}
