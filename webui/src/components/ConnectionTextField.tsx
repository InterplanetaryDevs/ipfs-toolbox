import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {ButtonGroup, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, {useState} from 'react';

interface IConnectionTextFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function ConnectionTextField(props: IConnectionTextFieldProps) {
  const [text, setText] = useState(props.value);

  return (<div>
    <TextField
      value={text}
      onChange={(e) => setText(e.target.value)}
      label={props.label}
      size={'small'}
      placeholder={props.placeholder}
    />
    {props.value !== text && <ButtonGroup>
        <IconButton
            onClick={() => setText(props.value)}
        ><CloseIcon/></IconButton>
        <IconButton
            onClick={() => {
              props.onChange(text);
              //set state twice to reload
              setText('');
              setTimeout(() => setText(props.value), 0);
            }}
        ><CheckIcon/></IconButton>
    </ButtonGroup>}
  </div>);
}
