import {PeerListResult, RemovePeerResult} from './IpfsPeersApi';

export interface IIpfsPeersApi {
	/**
	 * Cluster peers.
	 */
	list(): Promise<PeerListResult>;

	/**
	 * Remove a peer.
	 * @param {string} peerId
	 */
	remove(peerId: string): Promise<RemovePeerResult>;
}