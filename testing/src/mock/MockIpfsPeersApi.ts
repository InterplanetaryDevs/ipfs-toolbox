import {IIpfsPeersApi} from 'ipfs-cluster-api';
import {PeerListResult, RemovePeerResult} from 'ipfs-cluster-api/dist/api/IpfsPeersApi';

export class MockIpfsPeersApi implements IIpfsPeersApi {
	list(): Promise<PeerListResult> {
		return Promise.resolve([]);
	}

	remove(peerId: string): Promise<RemovePeerResult> {
		return Promise.resolve(undefined);
	}
}