import React, {useState} from 'react';
import {Box, Button, CircularProgress, IconButton} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import {useEffectCancel} from './UseEffectCancel';

export function useReloadButton(reload: (signal: AbortSignal) => Promise<any>, deps: any[] = []) {
	const [isLoading, setIsLoading] = useState(false);

	const load = () => {
		setIsLoading(true);
		const controller = new AbortController();
		reload(controller.signal)
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffectCancel((signal) => {
		setIsLoading(true);
		reload(signal)
			.finally(() => {
				setIsLoading(false);
			});
	}, deps);

	return {
		isLoading,
		reloadButton: <Box sx={{position: 'relative', display: 'inline-block'}}>
			<Button
				onClick={load}
				disabled={isLoading}
				startIcon={<ReplayIcon/>}
			>Reload</Button>
			{isLoading && (
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
		</Box>,
	};
}
