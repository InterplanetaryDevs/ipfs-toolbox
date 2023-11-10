import {createTheme} from '@material-ui/core/styles';

const baseTheme = createTheme({
	typography: {
		fontFamily: '\'Roboto Condensed\', sans-serif',
		fontSize: 14,
	},
});

export function createDarkTheme (accentColor: string) {
	return createTheme({
		...baseTheme,
		palette: {
			type: 'dark',
			primary: {
				main: accentColor,
			},
			secondary: {
				main: '#fafafa',
			},
		},
	});
}

export function createLightTheme(accentColor: string) {
	return createTheme({
		...baseTheme,
		palette: {
			type: 'light',
			primary: {
				main: '#e0e0e0',
			},
			secondary: {
				main: accentColor,
			},
		},
	});
}