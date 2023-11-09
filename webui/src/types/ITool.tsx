export interface ITool<TContext = {}> {
	url: string;
	icon?: JSX.Element;
	name: string;
	tool: JSX.Element;
	image?: string;
	context?: TContext;
}
