import {useIpfs} from '../../context/IpfsContext';
import {useSnackbar} from 'notistack';
import {FormGroup, TextField} from '@mui/material';
import React, {useState} from 'react';
import {AsyncActionButton} from '../../components/AsyncActionButton';

interface IExportButtonProps {
	keyName: string;
}

export function ExportButton(props: IExportButtonProps) {
	const {ipfs} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const [value, setValue] = useState<string>('');

	const exportKey = () => {
		return ipfs.key.export(props.keyName, value)
			.then(r => {
				enqueueSnackbar(`Exported key ${props.keyName}`, {variant: 'success'});
			}).catch(e => {
			enqueueSnackbar(`Failed to export key ${props.keyName}`, {variant: 'error'});
		});
	};

	return <FormGroup row>
		<TextField
			label={'Password'}
			type={'password'}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
		<AsyncActionButton action={exportKey}>Export</AsyncActionButton>
	</FormGroup>;
}