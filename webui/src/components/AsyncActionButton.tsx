import React, {PropsWithChildren, useState} from 'react';
import {LoadingButton} from './LoadingButton';

export interface IAsyncActionButtonProps extends PropsWithChildren {
	action: () => Promise<any>;
}

export function AsyncActionButton({action, children}: IAsyncActionButtonProps) {
	const [isLoading, setIsLoading] = useState(false);

	const onClick = () => {
		setIsLoading(true);
		action()
			.finally(() => {
				setIsLoading(false);
			});
	};

	return <LoadingButton onClick={onClick} loading={isLoading}>{children}</LoadingButton>;
}