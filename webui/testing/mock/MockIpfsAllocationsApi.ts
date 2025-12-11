import {AllocationResult, AllocationsOptions, IIpfsAllocationsApi} from 'ipfs-cluster-api';

export class MockIpfsAllocationsApi implements IIpfsAllocationsApi {
	get(cid: string): void {
	}

	list(options: AllocationsOptions): Promise<AllocationResult> {
		return Promise.resolve([]);
	}

}