import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {IDialogCommonProps} from './IDialogCommonProps';

export const RenameDialog = (props: RenameDialogProps) => {
	const [value, setValue] = useState(props.name);

	useEffect(() => {
		setValue(props.name);
	}, [props.name]);

	return <Dialog {...props}>
		<DialogTitle id="form-dialog-title">Rename property</DialogTitle>
		<DialogContent>
			<TextField
				autoFocus
				margin="dense"
				label={`New name for '${props.name}'`}
				fullWidth
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</DialogContent>
		<DialogActions>
			<Button onClick={props.onClose} color="primary">
				Cancel
			</Button>
			<Button onClick={() => props.onSave(value)} color="primary">
				Save
			</Button>
		</DialogActions>
	</Dialog>;
};

export interface RenameDialogProps extends IDialogCommonProps {
	onSave: (value: any) => void;
	name: string;
}
