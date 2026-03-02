import { useState } from 'react';
import { AddDialog } from './AddDialog';
import { RenameDialog } from './RenameDialog';
import { EditDialog } from './EditDialog';
import { INodeActions } from './INodeActions';
import { Button, ButtonGroup } from '@mui/material';

export const CommonActions = (props: CommonActionsProps) => {
	const { name, onChange, onDelete, onRename, onAdd, value } = props;
	const [editOpen, setEditOpen] = useState(false);
	const [renameOpen, setRenameOpen] = useState(false);
	const [addOpen, setAddOpen] = useState(false);

	return <>
		<ButtonGroup size={'small'}>
			{onChange && <Button onClick={() => setEditOpen(true)}>Edit</Button>}
			{onRename && <Button onClick={() => setRenameOpen(true)}>Rename</Button>}
			{onDelete && <Button onClick={onDelete}>Remove</Button>}
			{onAdd && <Button onClick={() => setAddOpen(true)}>Add</Button>}
		</ButtonGroup>
		{onChange && <EditDialog
			open={editOpen}
			onClose={() => setEditOpen(false)}
			onSave={(v) => {
				setEditOpen(false);
				onChange(v);
			}}
			value={value}
			label={name}
		/>}
		{onRename && <RenameDialog
			open={renameOpen}
			name={name}
			onClose={() => setRenameOpen(false)}
			onSave={(v) => {
				setRenameOpen(false);
				onRename(v);
			}}
		/>}
		{onAdd && <AddDialog
			open={addOpen}
			onClose={() => setAddOpen(false)}
			onAdd={(name, value) => {
				setAddOpen(false);
				onAdd(name, value);
			}}
		/>}
	</>;
};

export interface CommonActionsProps extends INodeActions {
	name: string;
	value: any;
}
