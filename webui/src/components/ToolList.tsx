import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {DefaultToolIcon, TOOLS} from '../tools/TOOLS';
import React from 'react';
import {ITool} from '../types';

export function ToolList(props: { onClick: (tool: ITool) => void, tool: ITool }) {
	return <>{
		TOOLS.map((t, index) => (
			<>
				<Divider/>
				<Typography>{t.name}</Typography>
				<List>
					{t.tools.map((t, index) => (
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
