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
import {useToolBox} from '../context';
import {ToolList} from './ToolList';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {ToolSearch} from './ToolSearch';
import {ITool} from '../types';
import {ConfigurationDefinition, DashboardDefinition} from '../tools/definitions';

export function Menu() {
	const {tool, setTool, setMenuOpen, isMenuOpen, setSearchOpen} = useToolBox();

	const openTool = (tool: ITool) => {
		setMenuOpen(false);
		setTool(tool);
	};

	return <>
		<ToolSearch/>
		<Drawer
			anchor={'left'}
			open={isMenuOpen}
			onClose={() => setMenuOpen(false)}
		>
			<Box
				sx={{width: 350}}
				role="presentation"
			>
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => {
							setSearchOpen(true);
							setMenuOpen(false);
						}}>
							<ListItemIcon>
								<SearchIcon/>
							</ListItemIcon>
							<ListItemText primary={'Search'}/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding selected={tool === DashboardDefinition}>
						<ListItemButton onClick={() => openTool(DashboardDefinition)}>
							<ListItemIcon>
								<DashboardIcon/>
							</ListItemIcon>
							<ListItemText primary={'Dashboard'}/>
						</ListItemButton>
					</ListItem>
				</List>
				<ToolList onClick={openTool} tool={tool}/>
				<Divider/>
				<Typography>Settings</Typography>
				<List>
					<ListItem disablePadding selected={tool === ConfigurationDefinition}>
						<ListItemButton onClick={() => openTool(ConfigurationDefinition)}>
							<ListItemIcon>
								<SettingsIcon/>
							</ListItemIcon>
							<ListItemText primary={'Configuration'}/>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	</>;
}
