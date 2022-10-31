import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {ButtonGroup, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, {useEffect, useState} from 'react';

interface IConnectionTextFieldProps {
	label: string;
	value: string;
	placeholder: string;
	onChange: (value: string) => void;
}

export function ConnectionTextField(props: IConnectionTextFieldProps) {
	const [text, setText] = useState(props.value);

	useEffect(() => {
		setText(props.value);
	}, [props.value]);

	return (<div>
		<TextField
			value={text}
			onChange={(e) => setText(e.target.value)}
			label={props.label}
			size={'small'}
			placeholder={props.placeholder}
		/>
		{props.value !== text && (<ButtonGroup>
			<IconButton
				onClick={() => setText(props.value)}
			><CloseIcon/></IconButton>
			<IconButton
				onClick={() => {
					props.onChange(text);
				}}
			><CheckIcon/></IconButton>
		</ButtonGroup>)}
	</div>);
}
