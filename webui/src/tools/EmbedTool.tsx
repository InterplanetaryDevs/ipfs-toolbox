export class EmbedTool {
	public static create(url: string): JSX.Element {
		return (<embed src={url} width={'100%'} height={'100%'}/>);
	}
}
