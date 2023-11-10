import GitHubIcon from '@mui/icons-material/GitHub';
import {Button, ButtonGroup, Paper, Toolbar} from '@mui/material';
import React from 'react';

export function Footer() {
	return <Paper>
		<Toolbar>
			<ButtonGroup>
				<Button variant="contained" startIcon={<GitHubIcon/>}
								onClick={() => window.open('https://github.com/InterplanetaryDevs/ipfs-toolbox/tree/dev')}>Source
					Code</Button>
			</ButtonGroup>
		</Toolbar>
	</Paper>;
}
