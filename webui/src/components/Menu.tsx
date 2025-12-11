import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useToolBox } from '../context/ToolBoxContext';
import { ToolList } from './ToolList';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ToolSearch } from './ToolSearch';
import { ITool } from '../types';
import { ConfigurationDefinition, DashboardDefinition } from '../tools/definitions';

export function Menu() {
	const { tool, setTool, setMenuOpen, isMenuOpen, setSearchOpen } = useToolBox();

	const openTool = (tool: ITool) => {
		setMenuOpen(false);
		setTool(tool);
	};

	return <>
		<ToolSearch />
		<Drawer
			anchor={'left'}
			open={isMenuOpen}
			onClose={() => setMenuOpen(false)}
		>
			<Box
				sx={{ width: 350 }}
				role="presentation"
			>
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => {
							setSearchOpen(true);
							setMenuOpen(false);
						}}>
							<ListItemIcon>
								<SearchIcon />
							</ListItemIcon>
							<ListItemText primary={'Search'} />
						</ListItemButton>
					</ListItem>
					<ListItemButton onClick={() => openTool(DashboardDefinition)} selected={tool === DashboardDefinition}>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary={'Dashboard'} />
					</ListItemButton>
				</List>
				<ToolList onClick={openTool} tool={tool} />
				<Divider />
				<Typography>Settings</Typography>
				<List>
					<ListItemButton onClick={() => openTool(ConfigurationDefinition)} selected={tool === ConfigurationDefinition}>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary={'Configuration'} />
					</ListItemButton>
				</List>
			</Box>
		</Drawer>
	</>;
}
