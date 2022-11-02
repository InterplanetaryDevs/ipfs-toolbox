import {IKeyBind} from '../types';
import {Chip, FormControlLabel, InputBase} from '@mui/material';
import React from 'react';

interface IKeyBindInputProps {
	label: string
	keyBind: IKeyBind;
	onChange?: (keyBind: IKeyBind) => void;
}

export function KeyBindInput({keyBind, onChange, label}: IKeyBindInputProps) {
	return <FormControlLabel
		label={label}
		labelPlacement={'top'}
		control={<InputBase
			fullWidth={true}
			onKeyDown={(ev) => {
				ev.preventDefault();
				onChange && onChange({
					key: ev.key.toLowerCase(),
					ctrlKey: ev.ctrlKey,
					altKey: ev.altKey,
					shiftKey: ev.shiftKey,
					metaKey: ev.metaKey,
				});
			}}
			placeholder={'Enter new keybind...'}
			endAdornment={<>
				{keyBind.ctrlKey && (<Chip label={'ctrl'}/>)}
				{keyBind.altKey && (<Chip label={'alt'}/>)}
				{keyBind.shiftKey && (<Chip label={'shift'}/>)}
				{keyBind.metaKey && (<Chip label={'win'}/>)}
				<Chip label={keyBind.key}/>
			</>}
		/>}
	/>;
}
