import SaveIcon from '@mui/icons-material/Save';
import {Grid, IconButton, TextField} from '@mui/material';
import React, {useState} from 'react';
import {PinOptions} from './types/PinOptions';
import {PinType} from './types/PinType';

export interface PinFormProps {
	onSubmit: (pin: PinOptions & { cid: string }) => void;
	values?: PinType;
}

const defaults = {
	maxReplication: -1,
	minReplication: -1,
	shardSize: 0,
}

export const PinForm = (props: PinFormProps) => {
	const [cid, setCid] = useState(props.values?.cid['/'] ?? '');
	const [name, setName] = useState(props.values?.name ?? '');
	const [maxReplication, setMaxReplication] = useState((props.values?.replication_factor_max ?? defaults.maxReplication).toString());
	const [minReplication, setMinReplication] = useState((props.values?.replication_factor_min ?? defaults.minReplication).toString());
	const [shardSize, setShardSize] = useState((props.values?.shard_size ?? defaults.shardSize).toString());

	const submit = () => {
		props.onSubmit({
			cid: cid,
			name: name,
			maxReplication: parseInt(maxReplication) ?? defaults.maxReplication,
			minReplication: parseInt(minReplication) ?? defaults.minReplication,
			shardSize: parseInt(shardSize) ?? defaults.shardSize,
		});
	};


	return <Grid container spacing={3}>
		<Grid item xs={12}>
			<TextField
				value={cid}
				onChange={(e) => setCid(e.target.value)}
				label={'Cid*'}
				fullWidth={true}
			/>
		</Grid>
		<Grid item xs={12}>
			<TextField
				value={name}
				onChange={(e) => setName(e.target.value)}
				label={'Name'}
				fullWidth={true}
			/>
		</Grid>
		<Grid item xs={12} lg={6}>
			<TextField
				value={maxReplication}
				onChange={(e) => setMaxReplication(e.target.value)}
				label={'Max replication'}
				fullWidth={true}
			/>
		</Grid>
		<Grid item xs={12} lg={6}>
			<TextField
				value={minReplication}
				onChange={(e) => setMinReplication(e.target.value)}
				label={'Min replication'}
				fullWidth={true}
			/>
		</Grid>
		<Grid item xs={12} lg={6}>
			<TextField
				value={shardSize}
				onChange={(e) => setShardSize(e.target.value)}
				label={'Shard Size'}
				fullWidth={true}
			/>
		</Grid>
		<Grid item xs={12}>
			<IconButton onClick={submit}><SaveIcon/></IconButton>
		</Grid>
	</Grid>;
};
