import {IPFSHTTPClient} from 'kubo-rpc-client';

export class MockIpfsClient implements IPFSHTTPClient {
	add(entry: any, options: any | undefined): Promise<any> {
		return Promise.resolve(undefined);
	}

	addAll(source: any, options: any): AsyncIterable<any> {
		async function* generateSequence(): AsyncGenerator<any> {
		}

		return generateSequence();
	}

	bases: any;
	bitswap: any;
	block: any;
	bootstrap: any;

	cat(ipfsPath: any, options: any): AsyncIterable<Uint8Array> {
		async function* generateSequence(): AsyncGenerator<any> {
		}

		return generateSequence();
	}

	codecs: any;

	commands(options: any): Promise<string[]> {
		return Promise.resolve([]);
	}

	config: any;
	dag: any;
	dht: any;
	diag: any;

	dns(domain: string, options: any): Promise<string> {
		return Promise.resolve('');
	}

	files: any;

	get(ipfsPath: any, options: any): AsyncIterable<Uint8Array> {
		async function* generateSequence(): AsyncGenerator<any> {
		}

		return generateSequence();
	}

	getEndpointConfig(): any {
		return undefined;
	}

	hashers: any;

	id(options: any): Promise<any> {
		return Promise.resolve(undefined);
	}

	isOnline(): boolean {
		return false;
	}

	key: any;
	log: any;

	ls(ipfsPath: any, options: any): AsyncIterable<any> {
		async function* generateSequence(): AsyncGenerator<any> {
		}

		return generateSequence();
	}

	mount(options: any): Promise<any> {
		return Promise.resolve(undefined);
	}

	name: any;
	object: any;
	pin: any;

	ping(peerId: any, options: any): AsyncIterable<any> {
		async function* generateSequence(): AsyncGenerator<any> {
		}

		return generateSequence();
	}

	pubsub: any;
	refs: any;
	repo: any;

	resolve(name: string, options: any): Promise<string> {
		return Promise.resolve('');
	}

	start(): Promise<void> {
		return Promise.resolve(undefined);
	}

	stats: any;

	stop(options: any): Promise<void> {
		return Promise.resolve(undefined);
	}

	swarm: any;

	version(options: any): Promise<any> {
		return Promise.resolve(undefined);
	}

}