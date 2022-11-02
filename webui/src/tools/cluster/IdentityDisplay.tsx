import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import {useSnackbar} from 'notistack';
import React, {useState} from 'react';
import {useIpfsCluster} from '../../context/IpfsClusterContext';
import {useReloadButton} from '../../hooks/UseReloadButton';

export const IdentityDisplay = (props: any) => {
	const [identity, setIdentity] = useState<any>();
	const {enqueueSnackbar} = useSnackbar();
	const api = useIpfsCluster().ipfsCluster;

	const {reloadButton} = useReloadButton(() => api.id()
			.then(setIdentity)
			.catch(e => {
				enqueueSnackbar(e, {variant: 'error'});
			})
	);

	return identity ? <Card>
		<CardHeader title={identity.id}/>
		<CardActions>
			{reloadButton}
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
