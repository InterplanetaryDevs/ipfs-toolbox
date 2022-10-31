import {AxiosInstance} from 'axios';
import {PinOptions} from '../options';
import {PinStatusOptions} from '../options';
import {mapOptions} from '../utils';

export class IpfsPinsApi {
	constructor(private readonly api: AxiosInstance) {
	}

	/**
	 * Local status of all tracked CIDs.
	 */
	public list() {

	}

	public status(cid: string, options?: PinStatusOptions) {
		return this.api.get(`/pins/${cid}?${mapOptions(options)}`).then(r => r.data);
	}

	public add(cid: string, options: PinOptions) {
		return this.api.post(`/pins/ipfs/${cid}?${mapOptions(options)}`);
	}

	public remove(cid: string): Promise<any> {
		return this.api.delete(`/pins/${cid}`).then(r => r.data);
	}

	public recover(cid?: string) {

	}

	public update(from: string, to: string, options: PinOptions) {
		return this.api.post(`/pins/ipfs/${to}?mode=recursive&pin-update=${from}&${mapOptions(options)}`).then(r => {
		});
	}
}
