import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Dialog,
	DialogContent,
	DialogTitle,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useIpfsCluster} from '../../context/IpfsClusterContext';
import {useLoading} from '../../hooks/UseLoading';

export const PinDetailPopup = (props: { cid?: string, onClose?: () => void }) => {
	const [expanded, setExpanded] = useState<string | false>(false);
	const [status, setStatus] = useState<any>();
	const [isLoading, load] = useLoading();
	const api = useIpfsCluster().ipfsCluster;

	const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	const reload = () => {
		props.cid && load(api.pins.status(props.cid))
			.then(setStatus)
			.catch(console.error);
	};

	//eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(reload, [props.cid]);

	const getStatusColor = (peer: any): string => peer.error !== '' ? 'red' :
		peer.status === 'pinned' ? 'green' :
			'blue';

	return <Dialog
		open={!!props.cid}
		onClose={props.onClose}
	>
		<DialogTitle>Pin Details</DialogTitle>
		<DialogContent>{isLoading ? <Stack spacing={1}>
			<Skeleton>

			</Skeleton>
		</Stack> : Object.entries(status?.peer_map ?? {})
			.map(([id, peer]: [string, any], k: number) => <Accordion
				key={k}
				expanded={expanded === id}
				onChange={handleChange(id)}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon/>}
				>
					<Typography color={getStatusColor(peer)}>{peer.peername}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<table>
						<tr>
							<th>ID</th>
							<td>{id}</td>
						</tr>
						<tr>
							<th>Status</th>
							<td>{peer.status}</td>
						</tr>
						<tr>
							<th>Priority</th>
							<td>{peer.priority_pin.toString()}</td>
						</tr>
						{peer.error !== '' && <>
                            <tr style={{color: 'red'}}>
                                <th>Error</th>
                                <td>{peer.error}</td>
                            </tr>
                            <tr>
                                <th>Attempts</th>
                                <td>{peer.attempt_count}</td>
                            </tr>
                            <tr>
                                <th>Timestamp</th>
                                <td>{peer.timestamp}</td>
                            </tr>
                        </>}
					</table>
				</AccordionDetails>
			</Accordion>)}
		</DialogContent>
	</Dialog>;
};
