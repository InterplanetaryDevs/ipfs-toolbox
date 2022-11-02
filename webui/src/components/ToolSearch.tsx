import {Dialog, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from '@mui/material';
import {useToolBox} from '../context/ToolBoxContext';
import React, {useEffect, useMemo, useState} from 'react';
import {AdditionalTools, TOOLS} from '../tools/TOOLS';
import {ITool} from '../types';
import {DefaultToolIcon} from '../tools/ToolDefaults';

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

	return <Dialog
		open={isSearchOpen}
		onClose={() => setSearchOpen(false)}
	>
				<TextField
					id={'tool-search'}
					value={value}
					placeholder={'Type something to search...'}
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
						} else if (ev.key === 'Escape') {
							ev.preventDefault();
							setSearchOpen(false);
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
	</Dialog>;
}
