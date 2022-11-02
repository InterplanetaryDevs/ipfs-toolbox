import {useIpfs} from '../../context/IpfsContext';
import {useSnackbar} from 'notistack';
import {Button, FormControlLabel, FormGroup, Popover, Switch, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {CID} from 'ipfs-http-client';
import {LoadingButton} from '../../components/LoadingButton';

interface IPublishButtonProps {
	keyName: string;
}

export function PublishButton(props: IPublishButtonProps) {
	const {ipfs} = useIpfs();
	const {enqueueSnackbar} = useSnackbar();

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState('');
	const [resolve, setResolve] = useState(true);
	const [allowOffline, setAllowOffline] = useState(false);
	const [lifetime, setLifetime] = useState('24h');
	const [ttl, setTtl] = useState('');

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const publish = () => {
		try {
			const cid = CID.parse(value);
			setLoading(true);
			ipfs.name.publish(cid, {
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
			})
				.finally(() => {
					setLoading(false);
				});
		} catch (e) {
			enqueueSnackbar('Invalid CID entered', {variant: 'error'});
		}
	};
	const open = Boolean(anchorEl);
	return <>
		<FormGroup row={true}>
			<TextField
				label={'cid'}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<Button onClick={handleClick}>Options</Button>
			<LoadingButton onClick={publish} loading={loading}>Publish</LoadingButton>
		</FormGroup>
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
		>
			<FormGroup>
				<FormControlLabel
					control={<Switch checked={resolve} onChange={e => setResolve(e.target.checked)}/>}
					label="Resolve"
				/>
				<FormControlLabel
					control={<Switch checked={allowOffline} onChange={e => setAllowOffline(e.target.checked)}/>}
					label="Allow offline"
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
			</FormGroup>
		</Popover>
	</>;
}

