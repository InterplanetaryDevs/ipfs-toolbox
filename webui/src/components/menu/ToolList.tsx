import DashboardIcon from '@mui/icons-material/Dashboard';
import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {ITool} from '../../App';
import {TOOLS} from '../../tools/TOOLS';
import React from 'react';

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
									{t.icon ?? <DashboardIcon/>}
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
