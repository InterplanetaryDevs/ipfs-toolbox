import {BooleanConverter, IValueConverter, NullConverter} from './converter';
import {IConfigurationProperty} from './IConfigurationProperty';
import {IConfiguration, IConfigurationService} from './IConfigurationService';
import {IConfigurationStore} from './IConfigurationStore';

export class ConfigurationService implements IConfigurationService {
	constructor(private store: IConfigurationStore, private base: IConfiguration) {
		this.ipfsClusterUrl = new ConfigurationProperty(store, 'ipfsClusterUrl', this.base.ipfsClusterUrl, new NullConverter());
		this.ipfsUrl = new ConfigurationProperty(store, 'ipfsUrl', this.base.ipfsUrl, new NullConverter());
		this.darkMode = new ConfigurationProperty(store, 'darkMode', this.base.darkMode, new BooleanConverter());
		this.accentColor = new ConfigurationProperty(store, 'accentColor', this.base.accentColor, new NullConverter());
	}

	public ipfsClusterUrl;
	public ipfsUrl;
	public darkMode;
	public accentColor;
}

export class ConfigurationProperty<T> implements IConfigurationProperty<T> {
	private readonly validator: (value: T) => boolean;
	private listeners = new Map<symbol, () => void>;

	public constructor(private store: IConfigurationStore, private name: string, public defaultValue: T, private converter: IValueConverter<T>, validator?: (value: T) => boolean) {
		this.validator = validator ?? (() => true);
	}

	public setValue(value: T) {
		const finalValue = this.converter.to(value);
		if (finalValue) {
			this.store.set(this.name, finalValue);
		}

		for (const listener of this.listeners.values()) {
			listener();
		}
	}

	public validate(value: T): boolean {
		return this.validator(value);
	}

	public get value(): T {
		return this.converter.from(this.store.get(this.name)) ?? this.defaultValue;
	}

	public subscribe(handler: () => void): symbol {
		const sym = Symbol();
		this.listeners.set(sym, handler);
		return sym;
	}

	public unsubscribe(sym: symbol) {
		this.listeners.has(sym) && this.listeners.delete(sym);
	}
}