import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import {ButtonGroup, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, {useState} from 'react';
import {useConfigurationProperty} from '../../hooks/UseConfigurationProperty';
import {IConfigurationProperty} from '../../services/configuration';

export function ConfigTextField({label, property}: {
	label: string,
	property: IConfigurationProperty<string>,
}) {
	const [value, setValue] = useConfigurationProperty(property);
	const [text, setText] = useState(property.value);

	const cancel = () => setText(value);

	return <div>
		<TextField
			fullWidth={true}
			label={label}
			value={text}
			onChange={(e) => setText(e.target.value)}
			placeholder={property.defaultValue}
			onKeyDown={(ev) => {
				if (ev.key == 'Escape') {
					cancel();
				}
			}}
			InputProps={{
				endAdornment: (<ButtonGroup>
					{property.defaultValue != value && <IconButton
              onClick={() => {
								setValue(property.defaultValue);
								setText(property.defaultValue);
							}}
          ><RefreshIcon/></IconButton>}
					{property.value !== text && <>
              <IconButton
                  onClick={cancel}
              ><CloseIcon/></IconButton>
              <IconButton
                  onClick={() => {
										setValue(text);
									}}
              ><CheckIcon/></IconButton>
          </>}
				</ButtonGroup>),
			}}/>
	</div>;
}