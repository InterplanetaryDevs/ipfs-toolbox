import React, {useState} from 'react';
import {useIpfs} from '../../context/IpfsContext';
import {useEffectCancel} from '../../hooks/UseEffectCancel';
import {collectIterable} from '../../utils/CollectIterable';
import {LsResult, PinQueryType} from 'ipfs-core-types/dist/src/pin';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container, FormControl,
	InputLabel,
	List,
	ListItem,
	ListItemText, MenuItem, Select
} from '@mui/material';
import {useReloadButton} from '../../hooks/UseReloadButton';

export default function PinsTool() {
	const {ipfs} = useIpfs();
	const [type, setType] = useState<PinQueryType>('direct');
	const [pins, setPins] = useState<LsResult[]>([]);

	const {reloadButton, isLoading} = useReloadButton(() => collectIterable<LsResult>(ipfs.pin.ls({
			type,
		}))
			.then(r => setPins(r)),
		[type]);

	return <Container>
		<Card>
			<CardHeader title={'Pins'}/>
			<CardActions>
				<FormControl>
					<InputLabel>Type</InputLabel>
					<Select
						value={type}
						label="Type"
						onChange={e => setType(e.target.value as PinQueryType)}
					>
						<MenuItem value={'all'}>All</MenuItem>
						<MenuItem value={'direct'}>Direct</MenuItem>
						<MenuItem value={'indirect'}>Indirect</MenuItem>
						<MenuItem value={'recursive'}>Recursive</MenuItem>
					</Select>
				</FormControl>
				{reloadButton}
			</CardActions>
			<CardContent>
				<List>
					{pins.map(p => (<ListItem key={p.cid.toString()}>
						<ListItemText
							primary={p.cid.toString()}
							secondary={`Type: ${p.type}, Metadata: ${JSON.stringify(p.metadata)}`}
						/>
					</ListItem>))}
				</List>
			</CardContent>
		</Card>
	</Container>;
}
