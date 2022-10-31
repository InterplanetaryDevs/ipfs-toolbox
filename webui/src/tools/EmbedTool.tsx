export class EmbedTool {
	public static create(url: string): JSX.Element {
		return (<embed src={url} className={'embed'}/>);
	}
}
