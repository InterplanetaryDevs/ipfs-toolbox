/**
 * Converts values between `string` and `T`
 */
export interface IValueConverter<T> {
	/**
	 * Convert from string to T
	 * @param {string} value value to convert
	 * @returns {T | undefined} the converted value
	 */
	from(value?: string): T | undefined;

	/**
	 * Convert from T to string
	 * @param {T} value value to convert
	 * @returns {string | undefined} the converted value
	 */
	to(value?: T): string | undefined;

	canHandle(typeName: string): boolean;
}