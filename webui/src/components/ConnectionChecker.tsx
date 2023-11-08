import {Alert, Box, Button, Card, CardActions, CardContent, CardHeader} from '@mui/material';
import React, {PropsWithChildren} from 'react';
import {Centered} from './Centered';
import ReplayIcon from '@mui/icons-material/Replay';
import {IConnectionCheckAble} from '../services/IConnectionCheckAble';

type ConnectionCheckerProps = PropsWithChildren<{
	context: IConnectionCheckAble
}>

export function ConnectionChecker({context, children}: ConnectionCheckerProps) {
	if (!context.connected) {
		return <Centered>
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
