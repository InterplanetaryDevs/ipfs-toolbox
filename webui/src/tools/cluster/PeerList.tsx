import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import {useSnackbar} from 'notistack';
import React, {useState} from 'react';
import {useIpfsCluster} from '../../context/IpfsClusterContext';
import {useReloadButton} from '../../hooks/UseReloadButton';

export const PeerList = (props: any) => {
	const [peers, setPeers] = useState<any[]>([]);
	const {enqueueSnackbar} = useSnackbar();
	const api = useIpfsCluster().ipfsCluster;

	const {reloadButton, isLoading} = useReloadButton(() => api.peers.list()
		.then(setPeers)
		.catch(e => {
			enqueueSnackbar(`Error: ${e}`, {variant: 'error'});
		}))

	return <Card>
		<CardHeader title={'Peers'} subheader={`${isLoading ? '?' : peers.length} peers`}/>
		<CardActions>
			{reloadButton}
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
