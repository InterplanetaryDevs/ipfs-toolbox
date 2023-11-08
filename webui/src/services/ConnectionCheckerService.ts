import {IConnectionCheckAble} from './IConnectionCheckAble';
import React from 'react';

export class ConnectionCheckerService implements IConnectionCheckAble {
	constructor(private check: () => Promise<boolean>) {
	}

	checking: boolean;
	connected: boolean;
	notConnectedMessage: React.ReactNode;
}