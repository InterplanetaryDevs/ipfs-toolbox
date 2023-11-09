import axios, {AxiosInstance} from 'axios';
import {AddOptions} from '../options';
import {PeerInfo, VersionResult} from '../results';
import {IpfsAllocationsApi} from './IpfsAllocationsApi';
import {IpfsPeersApi} from './IpfsPeersApi';
import {IpfsPinsApi} from './IpfsPinsApi';
import {IIpfsClusterApi} from './IIpfsClusterApi';

export class IpfsClusterApi implements IIpfsClusterApi {
	/**
	 * Create a new Cluster interface.
	 * @param {string} apiUrl API Url of the cluster
	 */
	constructor(apiUrl: string = 'http://localhost:9094') {
		this.api = axios.create({baseURL: apiUrl});
	}

	/**
	 * Cluster peer information
	 * @return {Promise<PeerInfo>}
	 */
	id(): Promise<PeerInfo> {
		return this.api.get('/id')
			.then(r => r.data);
	}

	/**
	 * Cluster version
	 */
	version(): Promise<VersionResult> {
		return this.api.get('/version')
			.then(r => r.data);
	}

	/**
	 * Peers API
	 * @return {IpfsPeersApi}
	 */
	get peers(): IpfsPeersApi {
		return new IpfsPeersApi(this.api);
	}

	/**
	 * Pins API
	 * @return {IpfsPinsApi}
	 */
	get pins(): IpfsPinsApi {
		return new IpfsPinsApi(this.api);
	}

	/**
	 * Add content to the cluster.
	 * @param data
	 * @param {AddOptions} options
	 * @return {Promise<void>}
	 */
	add(data: any, options: AddOptions): Promise<void> {
		return Promise.reject();
	}

	get allocations(): IpfsAllocationsApi {
		return new IpfsAllocationsApi(this.api);
	}

	private readonly api: AxiosInstance;
}
