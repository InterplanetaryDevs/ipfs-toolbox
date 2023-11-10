import {useToolBox} from '../context/ToolBoxContext';
import {IConfigurationService} from '../services/configuration';

export function useConfiguration(): IConfigurationService {
	return useToolBox().config;
}
