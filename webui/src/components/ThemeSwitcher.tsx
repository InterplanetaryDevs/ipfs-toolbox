import React from 'react';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {IconButton} from '@mui/material';
import {useConfiguration} from '../hooks/UseConfiguration';
import {useConfigurationProperty} from '../hooks/UseConfigurationProperty';

export function ThemeSwitcher() {
	const config = useConfiguration();
	const [darkMode, setDarkMode] = useConfigurationProperty<boolean>(config.darkMode);

	return <IconButton onClick={() => setDarkMode(!darkMode)}>
		{darkMode ? <Brightness7Icon/> : <DarkModeIcon/>}
	</IconButton>;
}
