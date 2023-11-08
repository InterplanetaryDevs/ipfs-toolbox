import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {Badge, Button, CircularProgress} from '@mui/material';
import React from 'react';
import {INodeContext} from '../context/INodeContext';

export function ConnectionStatusButton({context, label}: { label: string, context: INodeContext<any> }) {
	return <Badge badgeContent={(context.connected ? <CheckIcon color={'success'}/> : (context.checking ?
		<CircularProgress color={'warning'} size={25}/> : <CloseIcon color={'error'}/>))}>
		<Button onClick={() => context.runCheck()}>{label}</Button>
	</Badge>;
}
