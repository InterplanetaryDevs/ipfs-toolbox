import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, TextField} from '@mui/material';
import {useToolBox} from '../context/ToolBoxContext';
import React, {useEffect, useMemo, useState} from 'react';
import {AdditionalTools, DefaultToolIcon, TOOLS} from '../tools/TOOLS';
import {ITool} from '../App';

export function ToolSearch() {
	const {setSearchOpen, isSearchOpen, setTool} = useToolBox();

	const [value, setValue] = useState('');
	const [selected, setSelected] = useState(0);

	useEffect(() => {
		if (isSearchOpen) {
			setTimeout(() => {
				const el = document.getElementById('tool-search') as HTMLInputElement;
				el?.focus();
				el?.setSelectionRange(0, value.length);
			}, 25);
		}
	}, [isSearchOpen]);

	const results = useMemo(() => {
		const allItems = AdditionalTools.concat(...TOOLS.map(c => c.tools));

		setSelected(0);
		return allItems.filter(t => t.name.toLowerCase().includes(value.toLowerCase()));
	}, [value]);

	const openTool = (tool: ITool) => {
		setSearchOpen(false);
		setTool(tool);
	};

	return <Modal open={isSearchOpen}>
		<Paper>
			<TextField
				id={'tool-search'}
				value={value}
				onChange={e => setValue(e.target.value)}
				variant={'standard'}
				sx={{width: '100%'}}
				onKeyDown={(ev) => {
					if (ev.key === 'Enter' && results.length >= selected) {
						ev.preventDefault();
						openTool(results[selected]);
					} else if (ev.key === 'ArrowDown') {
						ev.preventDefault();
						if (selected < results.length) {
							setSelected(s => s + 1);
						}
					} else if (ev.key === 'ArrowUp') {
						ev.preventDefault();
						if (selected > 0) {
							setSelected(s => s - 1);
						}
					}
				}}
			/>
			<List>
				{results.map((t, k) => (<ListItem key={t.name} selected={selected === k}>
					<ListItemButton onClick={() => openTool(t)}>
						<ListItemIcon>{t.icon ?? DefaultToolIcon}</ListItemIcon>
						<ListItemText primary={t.name}/>
					</ListItemButton>
				</ListItem>))}
			</List>
		</Paper>
	</Modal>;
}