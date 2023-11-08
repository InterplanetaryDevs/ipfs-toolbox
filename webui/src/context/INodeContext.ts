import {IConnectionCheckAble} from '../services/IConnectionCheckAble';

/**
 * Context for a node of type <T>
 */
export interface INodeContext<T> extends IConnectionCheckAble {
	/**
	 * The actual node
	 */
	node: T;
}
