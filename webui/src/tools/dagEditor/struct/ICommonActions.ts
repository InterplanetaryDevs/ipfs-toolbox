import {IChangeAction, IDeleteAction, IRenameAction} from './actions';

export interface ICommonActions {
	onChange?: IChangeAction
	onRename?: IRenameAction
	onDelete?: IDeleteAction
}
