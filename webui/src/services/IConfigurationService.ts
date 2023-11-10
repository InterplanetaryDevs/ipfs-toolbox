export interface IConfiguration {
	ipfsUrl: string;
	ipfsClusterUrl: string;
	darkMode: boolean;
}

export interface IConfigurationService extends IConfiguration {
	setIpfsUrl(value: string): void;

	setIpfsClusterUrl(value: string): void;

	setDarkMode(value: boolean): void;
}
