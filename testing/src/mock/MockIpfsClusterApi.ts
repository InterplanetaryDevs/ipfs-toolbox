import {
	AddOptions,
	IIpfsAllocationsApi,
	IIpfsClusterApi,
	IIpfsPeersApi,
	IIpfsPinsApi,
	PeerInfo,
	VersionResult
} from 'ipfs-cluster-api';
import {MockIpfsAllocationsApi} from './MockIpfsAllocationsApi';
import {MockIpfsPeersApi} from './MockIpfsPeersApi';
import {MockIpfsPinsApi} from './MockIpfsPinsApi';

export class MockIpfsClusterApi implements IIpfsClusterApi {
	add(data: any, options: AddOptions): Promise<void> {
		return Promise.resolve(undefined);
	}

	get allocations(): IIpfsAllocationsApi {
		return new MockIpfsAllocationsApi();
	}

	id(): Promise<PeerInfo> {
		return Promise.resolve({
			version: 'test',
			id: 'testId',
			cluster_peers: [],
			addresses: [],
			cluster_peers_addresses: [],
			commit: '',
			error: '',
			peername: 'Testname',
			rpc_protocol_Version: 'Testversion',
			ipfs: {
				addresses: [],
				error: '',
				id: 'testId'
			}
		});
	}

	get peers(): IIpfsPeersApi {
		return new MockIpfsPeersApi();
	}

	get pins(): IIpfsPinsApi {
		return new MockIpfsPinsApi();
	}

	version(): Promise<VersionResult> {
		return Promise.resolve({
			version: 'test'
		});
	}
}