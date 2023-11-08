import React from 'react';
import {Box} from '@mui/material';

export class EmbedTool {
	public static create(url: string): JSX.Element {
		return (<Box className={'embed'}>
			<iframe src={url}/>
		</Box>);
	}
}
