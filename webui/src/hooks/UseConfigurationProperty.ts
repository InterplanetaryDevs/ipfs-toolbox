import {useEffect, useState} from 'react';
import {IConfigurationProperty} from '../services/configuration';

export function useConfigurationProperty<T>(property: IConfigurationProperty<T>): [T, (newVal: T) => void] {
	const [state, setState] = useState<T>(property.value);

	useEffect(() => {
		const sym = property.subscribe(() => {
			setState(property.value);
		});

		return () => {
			property.unsubscribe(sym);
		};
	}, []);

	return [state, (newVal: T) => {
		property.setValue(newVal);
	}];
}