import {Button, ButtonGroup} from '@mui/material';
import React, {useState} from 'react';
import {AddDialog} from '../dialog/AddDialog';
import {EditDialog} from '../dialog/EditDialog';
import {RenameDialog} from '../dialog/RenameDialog';
import {INodeActions} from '../struct/INodeActions';

export const CommonActions = (props: CommonActionsProps) => {
	const {name, onChange, onDelete, onRename, onAdd, value} = props;
	const [editOpen, setEditOpen] = useState(false);
	const [renameOpen, setRenameOpen] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
	const [newNode, setNewNode] = useState(false);

	return <>
		<ButtonGroup size={'small'}>
			{onChange && <Button onClick={() => setEditOpen(true)}>Edit</Button>}
			{onRename && <Button onClick={() => setRenameOpen(true)}>Rename</Button>}
			{onDelete && <Button onClick={onDelete}>Remove</Button>}
			{onAdd && <>
          <Button onClick={() => setAddOpen(true)}>Add</Button>
          <Button onClick={() => {
						setNewNode(true);
						setAddOpen(true);
					}}>Add Node</Button>
      </>}
		</ButtonGroup>
		{onChange && <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={(v) => {
					setEditOpen(false);
					onChange!(v);
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
					onRename!(v);
				}}
    />}
		{onAdd && <AddDialog
        open={addOpen}
				newNode={newNode}
        onClose={() => {
					setAddOpen(false);
					setNewNode(false);
				}}
        onAdd={(name, value) => {
					onAdd!(name, value);
					setAddOpen(false);
					setNewNode(false);
				}}
    />}
	</>;
};

export interface CommonActionsProps extends INodeActions {
	name: string;
	value: any;
}
