import {Card, CardContent, CardHeader} from '@mui/material';
import {useSnackbar} from 'notistack';
import {PinOptions} from 'ipfs-cluster-api';
import {useIpfsCluster} from '../../context/ApiContext';
import {PinForm} from './PinForm';
import React from 'react';

export const AddPinDialog = (props: any) => {
	const {enqueueSnackbar} = useSnackbar();
	const api = useIpfsCluster().ipfsCluster;

	const addPin = ({cid, ...pin}: PinOptions) => {
		api.pins.add(cid, pin)
			.then(r => {
				enqueueSnackbar(`Pin Added`, {variant: 'success'});
			})
			.catch(e => {
				enqueueSnackbar(`Error: ${e}`, {variant: 'error'});
			});
	};

	return <Card>
		<CardHeader title={'Add new pin'}/>
		<CardContent>
			<PinForm onSubmit={addPin}/>
		</CardContent>
	</Card>;
};
