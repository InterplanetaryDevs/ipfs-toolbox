import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import React from 'react';
import {ITool} from '../types';
import {DefaultToolIcon} from '../tools/ToolDefaults';
import {useToolBox} from '../context/ToolBoxContext';

export function ToolList(props: { onClick: (tool: ITool) => void, tool: ITool }) {
	const {tools} = useToolBox()

	return <>{
		tools.map((c, index) => (
			<>
				<Divider/>
				<Typography>{c.name}</Typography>
				<List>
					{c.tools.map((t, index) => (
						<ListItem key={t.name} disablePadding>
							<ListItemButton
								selected={props.tool === t}
								onClick={() => props.onClick(t)}
							>
								<ListItemIcon>
									{t.icon ?? DefaultToolIcon}
								</ListItemIcon>
								<ListItemText primary={t.name}/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</>
		))
	}</>;
}
