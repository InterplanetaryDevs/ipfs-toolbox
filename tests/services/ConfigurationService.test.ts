import {MemoryConfigurationStore} from 'testing';
import {ConfigurationService} from 'webui/src/services/configuration/ConfigurationService';
import {DefaultConfiguration} from 'webui/src/services/configuration/DefaultConfiguration';

describe('Configuration', () => {
	it('calls listeners', () => {
		const service = new ConfigurationService(new MemoryConfigurationStore(), DefaultConfiguration);
		let called = 0;

		service.darkMode.subscribe(() => {
			called++;
		});

		expect(called).toBe(0);

		service.darkMode.setValue(false);

		expect(called).toBe(1);
	});

	it('updates the value', () => {
		const memoryConfigurationStore = new MemoryConfigurationStore();
		const service = new ConfigurationService(memoryConfigurationStore, DefaultConfiguration);

		expect(service.ipfsUrl.value).toBe(DefaultConfiguration.ipfsUrl);
		expect(memoryConfigurationStore.get('ipfsUrl')).toBe(undefined);

		service.ipfsUrl.setValue('test');

		expect(service.ipfsUrl.value).toBe('test');
		expect(memoryConfigurationStore.get('ipfsUrl')).toBe('test');
	});
});