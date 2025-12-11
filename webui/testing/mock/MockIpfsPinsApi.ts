import {IIpfsPinsApi, PinOptions, PinStatusOptions} from 'ipfs-cluster-api';

export class MockIpfsPinsApi implements IIpfsPinsApi {
	add(cid: string, options: PinOptions): any {
	}

	list(): void {
	}

	recover(cid?: string): void {
	}

	remove(cid: string): Promise<any> {
		return Promise.resolve(undefined);
	}

	status(cid: string, options?: PinStatusOptions): any {
	}

	update(from: string, to: string, options: PinOptions): any {
	}
}