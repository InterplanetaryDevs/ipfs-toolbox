import {IKeyBind} from './IKeyBind';

export interface IAppConfiguration {
	keyBinds: {
		Home: IKeyBind,
		Configuration: IKeyBind,
		Menu: IKeyBind,
		ToolSearch: IKeyBind,
	};
}

export const DefaultAppConfiguration: IAppConfiguration = {
	keyBinds: {
		Home: {
			key: 'h',
			metaKey: false,
			shiftKey: false,
			altKey: false,
			ctrlKey: true
		},
		Configuration: {
			key: ',',
			metaKey: false,
			shiftKey: false,
			altKey: false,
			ctrlKey: true
		},
		Menu: {
			key: 'm',
			metaKey: false,
			shiftKey: false,
			altKey: false,
			ctrlKey: true
		},
		ToolSearch: {
			key: ' ',
			metaKey: false,
			shiftKey: false,
			altKey: false,
			ctrlKey: true
		},
	}
};