import React, {useEffect, useState} from 'react';

export function useIsUp(check: () => Promise<any>, timeout = 10000) {
	const [isUp, setIsUp] = useState(false);

	const runCheck = () => {
		return check()
			.then(() => setIsUp(true))
			.catch(() => setIsUp(false));
	};

	useEffect(() => {
		runCheck()
		const interval = setInterval(runCheck, timeout)
		return () => {
			clearInterval(interval)
		}
	}, [])

	return {isUp, runCheck};
}