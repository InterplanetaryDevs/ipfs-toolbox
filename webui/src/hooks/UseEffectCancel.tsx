import {useEffect} from 'react';

export function useEffectCancel(effect: (token: AbortSignal) => void | (() => void), dependencies: any[]) {
	useEffect(() => {
		const controller = new AbortController();
		const callback = effect(controller.signal);

		return () => {
			controller.abort();
			callback && callback();
		};
	}, dependencies);
}