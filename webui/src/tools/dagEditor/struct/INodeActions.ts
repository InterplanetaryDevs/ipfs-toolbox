import {IAddAction} from './actions';
import {ICommonActions} from './ICommonActions';

export interface INodeActions extends ICommonActions {
	onAdd?: IAddAction
}
