import React, {useEffect, useState} from 'react';
import {ConnectionChecker} from '../components/ConnectionChecker';
import {useIpfs} from '../context/IpfsContext';
import {Card, CardContent, CircularProgress} from '@mui/material';
import {ToolContainer} from '../components/ToolContainer';
import {useEffectCancel} from '../hooks/UseEffectCancel';

export default function StatusTool() {
	const [idInfo, setIdInfo] = useState<any>();
	const ipfs = useIpfs();

	useEffectCancel((signal) => {
		ipfs.node.id({signal}).then(setIdInfo);
	}, []);

	return <ConnectionChecker context={ipfs}>
		<ToolContainer>
			<Card>
				<CardContent>
					{idInfo ? <>
						<p>Id: {idInfo.id.toString()}</p>
						<p>Version: {idInfo.agentVersion}</p>
						<p>Addresses: <ul>{idInfo.addresses?.map((i: any) => <li>{i.toString()}</li>)}</ul></p>
					</> : <CircularProgress/>}
				</CardContent>
			</Card>
		</ToolContainer>
	</ConnectionChecker>;
}