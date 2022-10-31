export type AllocationInfo = {
	allocations: string[]
	cid: { '/': string }
	expire_at: string
	max_depth: number
	metadata: any
	mode: 'recursive'
	name: string
	origins: []
	pin_update: { '/': string }
	reference: any
	replication_factor_max: number
	replication_factor_min: number
	shard_size: number
	timestamp: string
	type: number
	user_allocations: any
}
