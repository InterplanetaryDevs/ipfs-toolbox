import {ReactNode} from 'react';

export interface IConnectionCheckAble {
	/***
	 * Whether the node is connected or not
	 */
	connected: boolean;

	/***
	 * Whether the node is checking the connection
	 */
	checking: boolean;

	/***
	 * Message to display when not connected
	 */
	notConnectedMessage?: ReactNode;

	runCheck(): void;
}