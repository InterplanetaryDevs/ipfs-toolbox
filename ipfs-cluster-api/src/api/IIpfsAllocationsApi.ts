import {AllocationsOptions} from '../options';
import {AllocationResult} from '../results';

export interface IIpfsAllocationsApi {
	list(options: AllocationsOptions): Promise<AllocationResult>;

	get(cid: string): void;
}