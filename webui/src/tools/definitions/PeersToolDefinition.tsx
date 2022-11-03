import React, {lazy} from 'react'
import {ITool} from '../../types';


const PeersTool = lazy(() => import('../peers/PeersTool'));
export const PeersToolDefinition: ITool = {
	tool: <PeersTool/>,
	name: 'Peers'
}
