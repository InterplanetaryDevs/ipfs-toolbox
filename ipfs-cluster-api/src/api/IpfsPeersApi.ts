import {AxiosInstance} from 'axios';
import {PeerInfo} from '../results';
import {IIpfsPeersApi} from './IIpfsPeersApi';

export type PeerListResult = PeerInfo[]

export type RemovePeerResult = unknown

export class IpfsPeersApi implements IIpfsPeersApi {
	constructor(private readonly api: AxiosInstance) {
	}

	/**
	 * Cluster peers.
	 */
	list(): Promise<PeerListResult> {
		return this.api.get('/peers')
			.then(r => r.data);
	}

	/**
	 * Remove a peer.
	 * @param {string} peerId
	 */
	remove(peerId: string): Promise<RemovePeerResult> {
		return this.api.delete(`/peers/${peerId}`)
			.then(r => r.data);
	}
}
