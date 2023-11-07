import {useCallback, useEffect, useRef, useState} from 'react';

export function useConnectionChecker(check: () => Promise<boolean>, interval = 15000) {
	const [connected, setConnected] = useState(false);
	const [checking, setChecking] = useState(false);
	const checkingRef = useRef(false);

	const checker = useCallback(() => {
		if (checkingRef.current) {
			return Promise.resolve(false);
		}
		checkingRef.current = true;
		setChecking(true);
		return check().then(() => true).finally(() => {
			checkingRef.current = false;
			setChecking(false);
		});
	}, [check]);

	useEffect(() => {
		checker().then(setConnected).catch(() => setConnected(false));
		const timer = setInterval(() => {
			checker().then(setConnected).catch(() => setConnected(false));
		}, interval);

		return () => {
			clearInterval(timer);
		};
	}, [checker]);

	return {connected, checking};
}
