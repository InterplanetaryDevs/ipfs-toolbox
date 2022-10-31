import {useIpfs} from '../../context/IpfsContext';
import {useSnackbar} from 'notistack';
import {Button, InputAdornment, OutlinedInput} from '@mui/material';
import {useState} from 'react';
import {CID} from 'ipfs-http-client';
import React from 'react';

interface IPublishButtonProps {
	key: string;
}

export function PublishButton(props: IPublishButtonProps) {
	const {ipfs} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const [value, setValue] = useState<string>('');

	const publish = () => {
		try {
			const cid = CID.parse(value);
			ipfs.name.publish(cid, {key: props.key})
				.then(r => {
					enqueueSnackbar(`Published ${value} to ${props.key}`, {variant: 'success'});
				}).catch(e => {
				enqueueSnackbar(`Failed to publish ${value} to ${props.key}`, {variant: 'error'});
			});
		} catch (e) {
			enqueueSnackbar('Invalid CID entered', {variant: 'error'});
		}
	};

	return <div>
		<OutlinedInput
			label={'cid'}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			endAdornment={(<InputAdornment position={'end'}>
				<Button onClick={publish}>Publish</Button>
			</InputAdornment>)}
		/>
	</div>;
}