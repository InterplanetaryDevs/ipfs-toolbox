import {IKeyBind} from '../types';
import React, {useEffect} from 'react';

export function useKeyBind(keyBind: IKeyBind, action: (ev: KeyboardEvent) => void) {
	const listener = (event: KeyboardEvent) => {
		if (
			event.key.toLowerCase() === keyBind.key.toLowerCase() &&
			event.ctrlKey === keyBind.ctrlKey &&
			event.altKey === keyBind.altKey &&
			event.shiftKey === keyBind.shiftKey &&
			event.metaKey === keyBind.metaKey
		) {
			event.preventDefault();
			action(event);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', listener);
		return () => document.removeEventListener('keydown', listener);
	}, [keyBind]);
}