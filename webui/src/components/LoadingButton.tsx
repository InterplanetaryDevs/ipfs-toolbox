import {Box, Button, CircularProgress} from '@mui/material';
import React, {PropsWithChildren} from 'react';

export interface ILoadingButtonProps extends PropsWithChildren {
	onClick: () => void;
	loading: boolean;
}

export function LoadingButton({loading, onClick, children}: ILoadingButtonProps) {
	return <Box
		sx={{display: 'inline-block', position: 'relative'}}
	>
		<Button
			variant="contained"
			disabled={loading}
			onClick={onClick}
			sx={{width: '100%', height: '100%'}}
		>
			{children}
		</Button>
		{loading && (
			<CircularProgress
				size={24}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					marginTop: '-12px',
					marginLeft: '-12px',
				}}
			/>
		)}
	</Box>;
}