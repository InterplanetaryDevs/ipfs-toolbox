import {CircularProgress} from '@mui/material';
import {Component, useCallback, useState} from 'react';

type LoadWrapperProps = {
	content: (load: (action: Promise<any>) => void) => Component
}

export const LoadWrapper = (props: LoadWrapperProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const load = useCallback(() => {

	}, []);

	return isLoading ? <CircularProgress/> : props.content(load);
};
