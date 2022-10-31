import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, TextField} from '@mui/material';
import {useToolBox} from '../context/ToolBoxContext';
import React, {useEffect, useMemo, useState} from 'react';
import {DefaultToolIcon, TOOLS} from '../tools/TOOLS';
import {ITool} from '../App';

export function ToolSearch() {
	const {setSearchOpen, isSearchOpen, setTool} = useToolBox();

	const [value, setValue] = useState('');

	useEffect(() => {
		if (isSearchOpen) {
			setTimeout(() => document.getElementById('tool-search')?.focus(), 25);
		}
	}, [isSearchOpen]);

	const results = useMemo(() => {
		const allItems = ([] as ITool[]).concat(...TOOLS.map(c => c.tools));

		return allItems.filter(t => t.name.toLowerCase().includes(value.toLowerCase()));
	}, [value]);

	const openTool = (tool: ITool) => {
		setSearchOpen(false);
		setTool(tool);
	};

	return <Modal open={isSearchOpen}>
		<Paper>
			<TextField id={'tool-search'} value={value} onChange={e => setValue(e.target.value)} variant={'standard'}
								 sx={{width: '100%'}}/>
			<List>
				{results.map((t, k) => (<ListItem>
					<ListItemButton onClick={() => openTool(t)}>
						<ListItemIcon>{t.icon ?? DefaultToolIcon}</ListItemIcon>
						<ListItemText primary={t.name}/>
					</ListItemButton>
				</ListItem>))}
			</List>
		</Paper>
	</Modal>;
}