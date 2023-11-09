import {AxiosInstance} from 'axios';
import {PinOptions, PinStatusOptions} from '../options';
import {mapOptions} from '../utils';
import {IIpfsPinsApi} from './IIpfsPinsApi';

export class IpfsPinsApi implements IIpfsPinsApi {
	constructor(private readonly api: AxiosInstance) {
	}

	/**
	 * Local status of all tracked CIDs.
	 */
	list() {

	}

	status(cid: string, options?: PinStatusOptions) {
		return this.api.get(`/pins/${cid}?${mapOptions(options)}`).then(r => r.data);
	}

	add(cid: string, options: PinOptions) {
		return this.api.post(`/pins/ipfs/${cid}?${mapOptions(options)}`);
	}

	remove(cid: string): Promise<any> {
		return this.api.delete(`/pins/${cid}`).then(r => r.data);
	}

	recover(cid?: string) {

	}

	update(from: string, to: string, options: PinOptions) {
		return this.api.post(`/pins/ipfs/${to}?mode=recursive&pin-update=${from}&${mapOptions(options)}`).then(r => {
		});
	}
}
