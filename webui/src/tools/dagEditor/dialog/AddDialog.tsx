import {Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import React, {useState} from 'react';
import {IAddAction} from '../struct/actions';
import {IDialogCommonProps} from './IDialogCommonProps';

export const AddDialog = (props: AddDialogProps) => {
	const [name, setName] = useState('');
	const [value, setValue] = useState('');

	const reset = () => {
		setName('');
		setValue('');
	};

	const cancel = () => {
		props.onClose();
		reset();
	};

	const add = () => {
		props.onAdd(name, props.newNode ? {} : value);
		reset();
	};

	return <Dialog {...props}>
		<DialogTitle id="form-dialog-title">Add entry</DialogTitle>
		<DialogContent>
			<TextField
				autoFocus
				margin="dense"
				label={'Name'}
				fullWidth
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			{!props.newNode && <TextField
          margin="dense"
          label={'Value'}
          fullWidth
          value={value}
          onChange={e => setValue(e.target.value)}
      />}
		</DialogContent>
		<DialogActions>
			<ButtonGroup>
				<Button onClick={cancel} color="primary" variant={'outlined'}>
					Cancel
				</Button>
				<Button onClick={add} color="primary" variant={'outlined'}>
					Add
				</Button>
			</ButtonGroup>
		</DialogActions>
	</Dialog>;
};

export interface AddDialogProps extends IDialogCommonProps {
	onAdd: IAddAction;
	newNode?: boolean;
}
