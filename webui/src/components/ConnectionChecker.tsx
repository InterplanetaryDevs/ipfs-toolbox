import { Alert } from '@mui/material';
import React, {PropsWithChildren, ReactElement, useEffect, useState} from 'react';

type ConnectionCheckerProps = PropsWithChildren<{
	check: () => Promise<boolean>
	checkInterval?: number
	notConnectedMessage?: ReactElement
}>

export function ConnectionChecker(props: ConnectionCheckerProps) {
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		props.check().then(setConnected).catch(() => setConnected(false));
		const timer = setInterval(() => {
			props.check().then(setConnected).catch(() => setConnected(false));
		}, props.checkInterval ?? 5000);

		return () => clearInterval(timer);
	}, []);

	if (!connected) {
		return props.notConnectedMessage ?? <Alert severity="error">Failed to connect! Retrying...</Alert>;
	}

	return <div>{props.children}</div>;
}