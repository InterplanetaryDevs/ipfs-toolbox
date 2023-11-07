/**
 * Context for a node of type <T>
 */
export interface INodeContext<T> {
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

	/***
	 * Whether the node is connected or not
	 */
	connected: boolean;

	/***
	 * Whether the node is checking the connection
	 */
	checking: boolean;
}
