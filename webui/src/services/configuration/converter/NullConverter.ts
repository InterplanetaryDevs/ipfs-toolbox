import {IValueConverter} from './IValueConverter';

export class NullConverter implements IValueConverter<string> {
	public from(value?: string): string | undefined {
		return value;
	}

	public to(value?: string): string | undefined {
		return value;
	}

	public canHandle(typeName: string): boolean {
		return typeName == 'string';
	}
}