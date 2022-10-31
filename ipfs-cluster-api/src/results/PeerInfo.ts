export type PeerInfo = {
	addresses: string[]
	cluster_peers: string[]
	cluster_peers_addresses: string[]
	commit: string
	error: string
	id: string
	ipfs: {
		addresses: string[]
		error: string
		id: string
	}
	peername: string
	rpc_protocol_Version: string
	version: string
}
