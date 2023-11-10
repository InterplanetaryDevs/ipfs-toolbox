import {IConfigurationProperty} from '../IConfigurationProperty';

export interface IConfiguration {
	ipfsUrl: string;
	ipfsClusterUrl: string;
	darkMode: boolean;
	accentColor: string;
}

export interface IConfigurationService {
	ipfsUrl: IConfigurationProperty<string>;
	ipfsClusterUrl: IConfigurationProperty<string>;
	darkMode: IConfigurationProperty<boolean>;
	accentColor: IConfigurationProperty<string>;
}
