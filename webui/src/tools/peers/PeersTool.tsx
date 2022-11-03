import {
	Button,
	Card,
	Container,
	FormGroup, IconButton,
	List,
	ListItem, ListItemAvatar,
	ListItemText,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import {useReloadButton} from '../../hooks/UseReloadButton';
import {useIpfs} from '../../context/IpfsContext';
import React, {useState} from 'react';
import {PeersResult} from 'ipfs-core-types/dist/src/swarm';
import {AsyncActionButton} from '../../components/AsyncActionButton';
import {useSnackbar} from 'notistack';
import ClearIcon from '@mui/icons-material/Clear';
import {PeerId} from 'ipfs-http-client/dist/src/dht/map-event';

export default function PeersTool() {
	const {ipfs} = useIpfs();
	const {enqueueSnackbar} = useSnackbar()
	const [peers, setPeers] = useState<PeersResult[]>([]);
	const [addr, setAddr] = useState('');

	const {reloadButton, reload} = useReloadButton((signal) => ipfs.swarm.peers({signal}).then(setPeers));

	//@ts-ignore should work anyways
	const connect = () => ipfs.swarm.connect(addr)
		.then(r => enqueueSnackbar(`Connected to peer ${addr}`, {variant: 'success'}))
		.catch(e => enqueueSnackbar(`Failed to connect to ${addr}`, {variant: 'error'}))

	const disconnect = (id: PeerId) => ipfs.swarm.disconnect(id)
		.then(reload)
		.catch(e => enqueueSnackbar(`Failed to disconnect ${id.toString()}`, {variant: 'error'}))

	return (<Container>
		<Paper>
			Connect new peer:
			<FormGroup row>
				<TextField value={addr} onChange={e => setAddr(e.target.value)} label={'Connectionstring'}/>
				<AsyncActionButton action={connect}>Connect</AsyncActionButton>
			</FormGroup>
		</Paper>
		<Paper>
			{reloadButton}
			{peers.length > 0 ? (<List>
				{peers.map(p => (<ListItem key={p.peer.toCID().toString()}>
					<ListItemText primary={p.peer.toCID().toString()} secondary={p.addr.toString()}/>
					<ListItemAvatar>
						<AsyncActionButton action={() => disconnect(p.peer)}><ClearIcon/></AsyncActionButton>
					</ListItemAvatar>
				</ListItem>))}
			</List>) : (<Typography>No Peers.</Typography>)}
		</Paper>
	</Container>);
};