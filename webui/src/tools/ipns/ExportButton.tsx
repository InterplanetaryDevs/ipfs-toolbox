import {Button, InputAdornment, TextField} from '@mui/material';
import {useSnackbar} from 'notistack';
import React, {useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';

interface IExportButtonProps {
	key: string;
}

export function ExportButton(props: IExportButtonProps) {
	const {node} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const [value, setValue] = useState<string>('');

	const exportKey = () => {
		node.key.export(props.key, value)
			.then(r => {
				enqueueSnackbar(`Exported key ${props.key}`, {variant: 'success'});
			}).catch(e => {
			enqueueSnackbar(`Failed to export key ${props.key}`, {variant: 'error'});
		});
	};

	return <TextField
		label={'Password'}
		type={'password'}
		value={value}
		onChange={(e) => setValue(e.target.value)}
		InputProps={{
			endAdornment: (<InputAdornment position={'end'}>
				<Button onClick={exportKey}>Export</Button>
			</InputAdornment>),
		}}
	/>;
}
