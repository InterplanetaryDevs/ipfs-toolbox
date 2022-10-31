import {AxiosInstance} from 'axios';
import {PeerInfo} from '../results';

export type PeerListResult = PeerInfo[]

export type RemovePeerResult = unknown

export class IpfsPeersApi {
	constructor(private readonly api: AxiosInstance) {
	}

	/**
	 * Cluster peers.
	 */
	public list(): Promise<PeerListResult> {
		return this.api.get('/peers')
			.then(r => r.data);
	}

	/**
	 * Remove a peer.
	 * @param {string} peerId
	 */
	public remove(peerId: string): Promise<RemovePeerResult> {
		return this.api.delete(`/peers/${peerId}`)
			.then(r => r.data);
	}
}
