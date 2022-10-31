import {Alert, AlertTitle} from '@mui/material';
import React, {PropsWithChildren} from 'react';

export interface IErrorInfo {
	error: Error;
	errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<PropsWithChildren<{ render?: (error: IErrorInfo) => JSX.Element }>, { error?: IErrorInfo }> {
	constructor(props: {}) {
		super(props);
		this.state = {error: undefined};
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		this.setState({error: {error, errorInfo}});
	}

	render() {
		if (this.state.error) {
			return this.props.render ? this.props.render(this.state.error) :
				<ErrorDisplay error={this.state.error.error} errorInfo={this.state.error.errorInfo}/>;
		}
		return this.props.children;
	}
}

export const ErrorDisplay:({error, errorInfo}: { error: any; errorInfo: any }) => JSX.Element = ({error, errorInfo}) => {
	return <Alert severity="error" variant={'filled'}>
		<AlertTitle>{error.name}</AlertTitle>
		{error.message}
		{errorInfo && <pre>{errorInfo.componentStack}</pre>}
	</Alert>
}
