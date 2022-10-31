import {useIpfs} from '../../context/IpfsContext';
import {useSnackbar} from 'notistack';
import {Button, InputAdornment, OutlinedInput} from '@mui/material';
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

	return <div>
		<OutlinedInput
			label={'Password'}
			type={'password'}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			endAdornment={(<InputAdornment position={'end'}>
				<Button onClick={exportKey}>Export</Button>
			</InputAdornment>)}
		/>
	</div>;
}