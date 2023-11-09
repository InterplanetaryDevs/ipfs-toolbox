import React, {PropsWithChildren} from 'react';
import {Box} from '@mui/material';

export function Centered(props: PropsWithChildren<{}>) {
	return <Box sx={{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		height: '100%',
	}}>
		{props.children}
	</Box>;
}
