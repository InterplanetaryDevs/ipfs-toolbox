import {ReactElement} from 'react';
import {IKeyBind} from './IKeyBind';

export interface IShortCut {
	id?: symbol;
	icon?: ReactElement;
	name: string;
	keyBind: IKeyBind;
	action: () => void;
	description?: string;
	hidden?: boolean;
	category?: string;
}
