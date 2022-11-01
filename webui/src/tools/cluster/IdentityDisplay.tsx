import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	IconButton,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import {useSnackbar} from 'notistack';
import React, {useEffect, useState} from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import {useIpfsCluster} from '../../context/IpfsClusterContext';

export const IdentityDisplay = (props: any) => {
	const [identity, setIdentity] = useState<any>();
	const {enqueueSnackbar} = useSnackbar();
	const api = useIpfsCluster().ipfsCluster;

	const reload = () => {
		api.id()
			.then(setIdentity)
			.catch(e => {
				enqueueSnackbar(e, {variant: 'error'});
			});
	};

	//eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(reload, []);

	return identity ? <Card>
		<CardHeader title={identity.id}/>
		<CardActions>
			<IconButton onClick={reload}><ReplayIcon/></IconButton>
		</CardActions>
		<CardContent>
			<List>
				<ListItem>
					<ListItemText
						primary={'Addresses'}
						secondary={<List>
							{identity.addresses.map((v: string, k: number) => <ListItem key={k}>{v}</ListItem>)}
						</List>}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={'Peers'}
						secondary={<List>
							{identity.cluster_peers.map((v: string, k: number) => <ListItem key={k}>{v}</ListItem>)}
						</List>}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={'IPFS ID'}
						secondary={identity.ipfs.id}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={'IPFS addresses'}
						secondary={<List>
							{identity.ipfs.addresses.map((v: string, k: number) => <ListItem key={k}>{v}</ListItem>)}
						</List>}
					/>
				</ListItem>
			</List>
			{/*<pre>{JSON.stringify(identity, null, 2)}</pre>*/}
		</CardContent>
	</Card> : <CircularProgress/>;
};
