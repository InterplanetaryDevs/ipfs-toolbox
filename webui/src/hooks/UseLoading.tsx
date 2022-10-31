import {useCallback, useState} from 'react';

export function useLoading(): [boolean, (promise: Promise<any>) => Promise<any>] {
	const [isLoading, setIsLoading] = useState(false);
	const load = useCallback((promise: Promise<any>): Promise<any> => {
		if (isLoading) return Promise.reject('Already loading');
		setIsLoading(true);

		return promise.finally(() => {
			setIsLoading(false);
		});
	}, [isLoading]);

	return [isLoading, load];
}
