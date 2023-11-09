export interface IConfiguration {
	ipfsUrl: string;
	ipfsClusterUrl: string;
}

export interface IConfigurationService extends IConfiguration {
	setIpfsUrl(value: string): void;

	setIpfsClusterUrl(value: string): void;
}
