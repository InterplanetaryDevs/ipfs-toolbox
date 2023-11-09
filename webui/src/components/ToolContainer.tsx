import React, {PropsWithChildren} from 'react';
import {Container} from '@mui/material';

export function ToolContainer(props: PropsWithChildren<{}>) {
	return <Container sx={{paddingTop: 5, paddingBottom: 5}}>
		{props.children}
	</Container>;
}
