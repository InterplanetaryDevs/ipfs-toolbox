import {useIpfs} from '../../context/IpfsContext';
import {useSnackbar} from 'notistack';
import {Button, FormGroup, InputAdornment, OutlinedInput, TextField} from '@mui/material';
import {useState} from 'react';
import {CID} from 'ipfs-http-client';
import React from 'react';

interface IExportButtonProps {
	key: string;
}

export function ExportButton(props: IExportButtonProps) {
	const {ipfs} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const [value, setValue] = useState<string>('');

	const exportKey = () => {
		ipfs.key.export(props.key, value)
			.then(r => {
				enqueueSnackbar(`Exported key ${props.key}`, {variant: 'success'});
			}).catch(e => {
			enqueueSnackbar(`Failed to export key ${props.key}`, {variant: 'error'});
		});
	};

	return <FormGroup row>
		<TextField
			label={'Password'}
			type={'password'}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
		<Button onClick={exportKey}>Export</Button>
	</FormGroup>;
}