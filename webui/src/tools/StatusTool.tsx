import React, {useEffect, useState} from 'react';
import {ConnectionChecker} from '../components/ConnectionChecker';
import {useIpfs} from '../context/IpfsContext';
import {Card, CardContent} from '@mui/material';
import {ToolContainer} from '../components/ToolContainer';
import {useEffectCancel} from '../hooks/UseEffectCancel';

export default function StatusTool() {
	const [idInfo, setIdInfo] = useState<any>();
	const ipfs = useIpfs()

	useEffectCancel((signal) => {
		ipfs.node.id({signal}).then(setIdInfo)
		//TODO: get id and such
	}, []);

	return <ConnectionChecker context={ipfs}>
		<ToolContainer>
			<Card>
				<CardContent>
					{JSON.stringify(idInfo)}
				</CardContent>
			</Card>
		</ToolContainer>
	</ConnectionChecker>
}