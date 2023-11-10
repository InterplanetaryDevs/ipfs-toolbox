import {createTheme} from '@material-ui/core/styles';
import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';

export const Theme: ThemeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			main: '#1a237e',
		},
		secondary: {
			main: '#0277bd',
		},
	},
};

const baseTheme: ThemeOptions = {
	typography: {
		fontFamily: '\'Work Sans\', sans-serif',
		fontSize: 14,
		fontFamilySecondary: '\'Roboto Condensed\', sans-serif',
	},
};

const darkTheme = createTheme({
	...baseTheme,
	palette: {
		type: 'dark',
		primary: {
			main: '#26a27b',
		},
		secondary: {
			main: '#fafafa',
		},
	},
});

const lightTheme = createTheme({
	...baseTheme,
	palette: {
		type: 'light',
		primary: {
			main: '#fafafa',
		},
		secondary: {
			main: '#26a27b',
		},
	},
});

export {darkTheme, lightTheme};
