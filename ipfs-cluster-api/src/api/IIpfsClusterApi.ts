import {PeerInfo, VersionResult} from '../results';
import {AddOptions} from '../options';
import {IIpfsPeersApi} from './IIpfsPeersApi';
import {IIpfsPinsApi} from './IIpfsPinsApi';
import {IIpfsAllocationsApi} from './IIpfsAllocationsApi';

export interface IIpfsClusterApi {
	readonly peers: IIpfsPeersApi;
	readonly pins: IIpfsPinsApi;
	readonly allocations: IIpfsAllocationsApi;

	/**
	 * Cluster peer information
	 * @return {Promise<PeerInfo>}
	 */
	id(): Promise<PeerInfo>;

	/**
	 * Cluster version
	 */
	version(): Promise<VersionResult>;

	/**
	 * Add content to the cluster.
	 * @param data
	 * @param {AddOptions} options
	 * @return {Promise<void>}
	 */
	add(data: any, options: AddOptions): Promise<void>;
}