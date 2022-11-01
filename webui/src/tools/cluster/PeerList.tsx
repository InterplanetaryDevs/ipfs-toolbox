import ReplayIcon from '@mui/icons-material/Replay';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	IconButton,
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

export const PeerList = (props: any) => {
	const [peers, setPeers] = useState<any[]>([]);
	const [isLoading, load] = useLoading();
	const {enqueueSnackbar} = useSnackbar();
	const api = useIpfsCluster().ipfsCluster;

	const reload = () => {
		load(api.peers.list())
			.then(setPeers)
			.catch(e => {
				enqueueSnackbar(`Error: ${e}`, {variant: 'error'});
			});
	};

	//eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(reload, []);

	return <Card>
		<CardHeader title={'Peers'} subheader={`${isLoading ? '?' : peers.length} peers`}/>
		<CardActions>
			<IconButton onClick={reload}><ReplayIcon/></IconButton>
		</CardActions>
		<CardContent>
			<Table width={'100%'}>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>ID</TableCell>
						<TableCell>IPFS ID</TableCell>
						<TableCell>Version</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{isLoading ? <CircularProgress/> : peers.map((peer, k) => <TableRow key={k}>
						<TableCell>{peer.peername}</TableCell>
						<TableCell>{peer.id}</TableCell>
						<TableCell>{peer.ipfs.id}</TableCell>
						<TableCell>{peer.version}</TableCell>
					</TableRow>)}
				</TableBody>
			</Table>
		</CardContent>
	</Card>;
};
