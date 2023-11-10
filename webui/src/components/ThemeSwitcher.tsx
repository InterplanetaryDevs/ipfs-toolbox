import React from 'react';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {IconButton} from '@mui/material';
import {useConfiguration} from '../hooks/UseConfiguration';

export function ThemeSwitcher() {
	const {darkMode, setDarkMode} = useConfiguration();

	return <IconButton onClick={() => setDarkMode(!darkMode)}>
		{darkMode ? <Brightness7Icon/> : <DarkModeIcon/>}
	</IconButton>;
}
