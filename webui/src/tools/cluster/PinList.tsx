import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import ReplayIcon from '@mui/icons-material/Replay';
import {
	ButtonGroup,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	IconButton,
	Skeleton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import {useSnackbar} from 'notistack';
import React, {useEffect, useState} from 'react';
import {useIpfsCluster} from '../../context/IpfsClusterContext';
import {useLoading} from '../../hooks/UseLoading';
import {PinDetailPopup} from './PinDetailPopup';
import {PinDialog} from './PinDialog';

export const PinList = (props: any) => {
	const [pins, setPins] = useState<any[]>([]);
	const [editing, setEditing] = useState<any>();
	const [detail, setDetail] = useState<string>();

	const {enqueueSnackbar} = useSnackbar();
	const {ipfsCluster} = useIpfsCluster();
	const [isLoading, load] = useLoading();

	const reload = () => {
		load(ipfsCluster.allocations.list({
			filter: 'all'
		}))
			.then(r => {
				setPins(r);
			})
			.catch(e => {
				enqueueSnackbar(`Error: ${e}`, {variant: 'error'});
			});
	};

	//eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(reload, []);

	return <>
		<Card>
			<CardHeader title={'Pins'} subheader={`${isLoading ? '?' : pins.length} pins`}/>
			<CardActions>
				<IconButton onClick={reload}><ReplayIcon/></IconButton>
			</CardActions>
			<CardContent style={{overflow: 'auto'}}>
				{isLoading ? <Stack spacing={1}>
						<Skeleton variant="rectangular" width={'100%'} height={35}/>
						<Skeleton variant="rectangular" width={'100%'} height={45}/>
						{pins.map((p, k) => <Skeleton key={k} variant="rectangular" width={'100%'} height={45}/>)}
					</Stack> :
					<Table width={'100%'}>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Cid</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{pins.map((pin, k) => <TableRow key={k}>
								<TableCell align={'center'}>{pin.name && pin.name !== '' ? pin.name : '-'}</TableCell>
								<TableCell>{pin.cid['/']}</TableCell>
								<TableCell>
									<ButtonGroup variant={'outlined'}>
										<IconButton
											onClick={() => {
												setDetail(pin.cid['/']);
											}}
										><InfoIcon/></IconButton>
										<IconButton
											onClick={() => {
												setEditing(pin);
											}}
										><EditIcon/></IconButton>
										<IconButton
											color={'error'}
											onClick={() => {
												load(ipfsCluster.pins.remove(pin.cid['/']))
													.then(() => {
														console.log('deleted');
														return reload();
													})
													.catch(console.error);
											}}
										><DeleteIcon/></IconButton>
									</ButtonGroup>
								</TableCell>
							</TableRow>)}
						</TableBody>
					</Table>}
			</CardContent>
		</Card>
		<PinDialog
			onClose={() => setEditing(undefined)}
			pin={editing}
		/>
		<PinDetailPopup
			onClose={() => setDetail(undefined)}
			cid={detail}
		/>
	</>;
};
