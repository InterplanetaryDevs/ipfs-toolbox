import {useIpfs} from '../../context/IpfsContext';
import {useSnackbar} from 'notistack';
import {InputAdornment, TextField} from '@mui/material';
import React, {useState} from 'react';
import {CID} from 'kubo-rpc-client';
import {LoadingButton} from '../../components/LoadingButton';

interface IPublishButtonProps {
	key: string;
}

export function PublishButton(props: IPublishButtonProps) {
	const {node} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const [value, setValue] = useState<string>('');
	const [loading, setLoading] = useState(false);

	const publish = () => {
		try {
			const cid = CID.parse(value);
			setLoading(true);
			node.name.publish(cid, {key: props.key})
				.then(r => {
					enqueueSnackbar(`Published ${value} to ${props.key}`, {variant: 'success'});
				}).catch(e => {
				enqueueSnackbar(`Failed to publish ${value} to ${props.key}`, {variant: 'error'});
			})
				.finally(() => {
					setLoading(false);
				});
		} catch (e) {
			enqueueSnackbar('Invalid CID entered', {variant: 'error'});
		}
	};

	return <TextField
			label={'CID'}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			InputProps={{
			endAdornment: (<InputAdornment position={'end'}>
				<LoadingButton onClick={publish} loading={loading}>Publish</LoadingButton>
			</InputAdornment>),
		}}
		/>
}
