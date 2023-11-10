export interface IConfigurationProperty<T> {
	get value(): T;

	get defaultValue();

	setValue(value: T);

	validate(value: T): boolean;

	subscribe(handler: () => void): symbol;

	unsubscribe(sym: symbol): void;
}