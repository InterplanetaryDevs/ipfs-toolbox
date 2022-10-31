import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {useSnackbar} from 'notistack';
import {useIpfsCluster} from '../../context/ApiContext';
import {PinOptions} from './types/PinOptions';
import {PinType} from './types/PinType';
import {PinForm} from './PinForm';

export interface PinDialogProps {
	pin?: PinType;
	onClose?: () => void;
}

export const PinDialog = (props: PinDialogProps) => {
	const {enqueueSnackbar} = useSnackbar();
	const api = useIpfsCluster().ipfsCluster;

	const updatePin = (pin: PinOptions) => {
		const {cid, ...pinOptions} = pin;
		api.pins.update(props.pin?.cid['/'], cid, pinOptions)
			.then(r => {
				props.onClose && props.onClose();
				enqueueSnackbar(`Pin updated`, {variant: 'success'});
			})
			.catch(e => {
				enqueueSnackbar(`Error: ${e}`, {variant: 'error'});
			});
	};

	return <Dialog
		open={!!props.pin}
		onClose={props.onClose}
	>
		<DialogTitle>Edit Pin</DialogTitle>
		<DialogContent>
			Editing {props.pin?.cid['/']}
			<div style={{height: 17}}/>
			<PinForm
				values={props.pin}
				onSubmit={(pin) => {
					updatePin(pin);
				}}
			/>
		</DialogContent>
	</Dialog>;
};
