import {PinOptions, PinStatusOptions} from '../options';

export interface IIpfsPinsApi {
	/**
	 * Local status of all tracked CIDs.
	 */
	list(): void;

	status(cid: string, options?: PinStatusOptions): any;

	add(cid: string, options: PinOptions): any;

	remove(cid: string): Promise<any>;

	recover(cid?: string): void;

	update(from: string, to: string, options: PinOptions): Promise<void>;
}