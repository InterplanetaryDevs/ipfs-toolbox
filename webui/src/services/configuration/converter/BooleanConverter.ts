import {IValueConverter} from './IValueConverter';

export class BooleanConverter implements IValueConverter<boolean> {
	public from(value?: string): boolean | undefined {
		return value == 'true' ? true : value == 'false' ? false : undefined;
	}

	public to(value?: boolean): string | undefined {
		return value?.toString();
	}

	public canHandle(typeName: string): boolean {
		return typeName == 'boolean';
	}
}