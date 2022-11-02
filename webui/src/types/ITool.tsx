export interface ITool<TContext = {}> {
	icon?: JSX.Element;
	name: string;
	tool: JSX.Element;
	image?: string;
	context?: TContext;
}