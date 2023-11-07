import React from 'react';
import {Box, Button, ButtonGroup, Toolbar} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export function Footer() {
	return <Box>
		<Toolbar>
			<ButtonGroup>
				<Button variant="outlined" startIcon={<GitHubIcon/>}>Source Code</Button>
			</ButtonGroup>
		</Toolbar>
	</Box>;
}
