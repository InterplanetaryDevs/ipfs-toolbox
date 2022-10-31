export function mapOptions(options?: object): string {
	if (options == undefined) return '';

	const parts: string[] = [];
	for (const key of Object.keys(options)) {
		parts.push(mapOptionName(key) + '=' + (options as any)[key].toString());
	}
	return parts.join('&');
}

function mapOptionName(name: string): string {
	return name.replace(/(A-Z)/, '-$1').toLowerCase();
}
