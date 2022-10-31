import {AxiosInstance} from 'axios';
import {AllocationsOptions} from '../options';
import {AllocationResult} from '../results';
import {mapOptions} from '../utils';

export class IpfsAllocationsApi {
	constructor(private readonly api: AxiosInstance) {
	}

	list(options: AllocationsOptions = {}): Promise<AllocationResult> {
		return this.api.get('/allocations?' + mapOptions(options))
			.then(r => r.data);
	}

	get(cid: string) {
	}
}
