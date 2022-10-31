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
import {useToolBox} from '../context/ToolBoxContext';
import {ToolList} from './menu/ToolList';
import {DashboardDefinition} from './Dashboard';
import {ConfigurationDefinition} from './Configuration';
import React from 'react';

export function Menu() {
	const {tool, setTool, setMenuOpen, isMenuOpen} = useToolBox();
	return <Drawer
		anchor={'left'}
		open={isMenuOpen}
		onClose={() => setMenuOpen(false)}
	>
		<Box
			sx={{width: 350}}
			role="presentation"
		>
			<List>
				<ListItem disablePadding selected={tool === DashboardDefinition}>
					<ListItemButton onClick={() => {
						setTool(DashboardDefinition);
					}}>
						<ListItemIcon>
							<DashboardIcon/>
						</ListItemIcon>
						<ListItemText primary={'Dashboard'}/>
					</ListItemButton>
				</ListItem>
			</List>
			<ToolList onClick={t => setTool(t)} tool={tool}/>
			<Divider/>
			<Typography>Settings</Typography>
			<List>
				<ListItem disablePadding selected={tool === ConfigurationDefinition}>
					<ListItemButton onClick={() => {
						setTool(ConfigurationDefinition);
					}}>
						<ListItemIcon>
							<SettingsIcon/>
						</ListItemIcon>
						<ListItemText primary={'Configuration'}/>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	</Drawer>;
}
