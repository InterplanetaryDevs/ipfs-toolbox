import {useIpfs} from '../../context/IpfsContext';
import {useSnackbar} from 'notistack';
import {Button, FormControlLabel, FormGroup, Popover, Stack, Switch, TextField} from '@mui/material';
import React, {useState} from 'react';
import {CID} from 'ipfs-http-client';
import {AsyncActionButton} from '../../components/AsyncActionButton';
import {OptionsButton} from '../../components/OptionsButton';

interface IPublishButtonProps {
	keyName: string;
}

export function PublishButton(props: IPublishButtonProps) {
	const {ipfs} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const [value, setValue] = useState('');
	const [resolve, setResolve] = useState(true);
	const [allowOffline, setAllowOffline] = useState(false);
	const [lifetime, setLifetime] = useState('24h');
	const [ttl, setTtl] = useState('');


	const publish = () => {
		try {
			const cid = CID.parse(value);
			return ipfs.name.publish(cid, {
				key: props.keyName,
				resolve,
				allowOffline,
				ttl: ttl === '' ? undefined : ttl,
				lifetime
			})
				.then(r => {
					enqueueSnackbar(`Published ${value} to ${props.keyName}`, {variant: 'success'});
				}).catch(e => {
					enqueueSnackbar(`Failed to publish ${value} to ${props.keyName}`, {variant: 'error'});
				});
		} catch (e) {
			enqueueSnackbar('Invalid CID entered', {variant: 'error'});
			return Promise.reject();
		}
	};

	return <FormGroup row={true}>
		<TextField
			label={'cid'}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
		<OptionsButton>
			<Stack spacing={1}>
				<FormControlLabel
					control={<Switch checked={resolve} onChange={e => setResolve(e.target.checked)}/>}
					label={'Resolve'}
				/>
				<FormControlLabel
					control={<Switch checked={allowOffline} onChange={e => setAllowOffline(e.target.checked)}/>}
					label={'Allow offline'}
				/>
				<TextField
					label={'Lifetime'}
					value={lifetime}
					onChange={e => setLifetime(e.target.value)}
				/>
				<TextField
					label={'Ttl'}
					value={ttl}
					onChange={e => setTtl(e.target.value)}
				/>
			</Stack>
		</OptionsButton>
		<AsyncActionButton action={publish}>Publish</AsyncActionButton>
	</FormGroup>;
}

