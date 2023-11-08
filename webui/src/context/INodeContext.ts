import {IConnectionCheckAble} from '../services/IConnectionCheckAble';

/**
 * Context for a node of type <T>
 */
export interface INodeContext<T> extends IConnectionCheckAble {
	/**
	 * Url to connect to the node
	 */
	apiUrl: string;

	/**
	 * Set the url to connect to the node
	 */
	setApiUrl(value: string): void;

	/**
	 * The actual node
	 */
	node: T;
}
