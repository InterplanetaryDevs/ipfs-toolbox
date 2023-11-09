import React from 'react';
import {MemoryConfigurationStore} from 'testing';
import {useConfigValue} from 'webui/src/hooks/UseConfiguration';

describe('Configuration', () => {
	it.skip('can be changed', () => {
		const config = new MemoryConfigurationStore();
		// const useStateSpy = jest.spyOn(React, 'useState');
		// useStateSpy.mockImplementation((initialState: (() => string) | string) => {
		// 	let state = typeof initialState === 'string' ? initialState : initialState();
		//
		// 	return [initialState, (newState: string) => {
		// 		state = newState;
		// 	}];
		// });
		const [state, setState] = useConfigValue(config, 'test', 'default');

		expect(state).toBe('default');
		setState('test');
		expect(state).toBe('test');
		expect(state).toBe(config.get('test'));
	});
});
