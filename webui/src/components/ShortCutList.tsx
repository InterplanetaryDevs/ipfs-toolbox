import {Box, Stack, Typography} from '@mui/material';
import React from 'react';
import {useToolBox} from '../context/ToolBoxContext';
import {IShortCut} from '../services/ShortcutService/IShortCut';
import {ShortCutDisplay} from './ShortCutDisplay';

export function reduceEntries(shortcuts: IShortCut[]) {
	return Object.entries(shortcuts
		.reduce((group, product) => {
			const category = product.category ?? 'unknown';
			group[category] = group[category] ?? [];
			group[category].push(product);
			return group;
		}, {} as { [key: string]: IShortCut[] }));
}

export function ShortCutList() {
	const {shortcutService} = useToolBox();

	return <Box>
		<Stack spacing={1}>
			{reduceEntries(shortcutService.getShortCuts())
				.map(([category, shortcuts]) => <Stack>
					<Typography variant={'caption'}>{category}</Typography>
					{shortcuts.map((v, i) => (<Box
						sx={{display: 'flex', borderBottomWidth: 1, borderBottomColor: 'primary.dark'}}>
						<div style={{flexGrow: 1}}>{v.name}</div>
						<ShortCutDisplay keyBind={v.keyBind}/>
					</Box>))}
				</Stack>)}
		</Stack>
	</Box>;
}
