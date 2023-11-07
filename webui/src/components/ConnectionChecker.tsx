import {Alert, Stack} from '@mui/material';
import React, {PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import {INodeContext} from '../context/INodeContext';

type ConnectionCheckerProps = PropsWithChildren<{
	context: INodeContext<any>
	notConnectedMessage?: ReactElement
}>

export function ConnectionChecker({context, notConnectedMessage, children}: ConnectionCheckerProps) {
	if (!context.connected) {
		return notConnectedMessage ?? <Stack spacing={1}>
        <Alert severity="error">Failed to connect!</Alert>
			{context.checking && <Alert severity={'warning'}>Retrying...</Alert>}
    </Stack>;
	}

	return <div>{children}</div>;
}
