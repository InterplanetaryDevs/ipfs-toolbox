import React from 'react';
import {Box, Button, ButtonGroup, Toolbar} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export function Footer() {
	return <Box sx={{
		bgcolor: 'secondary.dark'
	}}>
		<Toolbar>
			<ButtonGroup>
				<Button variant="contained" startIcon={<GitHubIcon/>} onClick={() => window.open('https://github.com/InterplanetaryDevs/ipfs-toolbox/tree/dev')}>Source Code</Button>
			</ButtonGroup>
		</Toolbar>
	</Box>;
}
