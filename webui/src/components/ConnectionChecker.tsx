import {Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from '@mui/material';
import React, {PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import {INodeContext} from '../context/INodeContext';
import {Centered} from './Centered';
import ReplayIcon from '@mui/icons-material/Replay';

type ConnectionCheckerProps = PropsWithChildren<{
	context: INodeContext<any>
	notConnectedMessage?: ReactElement
}>

export function ConnectionChecker({context, notConnectedMessage, children}: ConnectionCheckerProps) {
	if (!context.connected) {
		return notConnectedMessage ?? <Centered>
        <Card sx={{width: '50%'}}>
            <CardHeader title={'Connection Failed!'}/>
            <CardContent>
							{context.notConnectedMessage ?? <Alert severity="error">Failed to connect!</Alert>}
            </CardContent>
            <CardActions>
								{context.checking && <Alert severity={'warning'}>Retrying...</Alert>}
                <Box sx={{flexGrow: 1}}/>
                <Button startIcon={<ReplayIcon/>}>Retry</Button>
            </CardActions>
        </Card>
    </Centered>;
	}

	return <div>{children}</div>;
}
