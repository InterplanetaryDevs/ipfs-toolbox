import React from 'react';
import {Button, ButtonGroup, Card, CardContent} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export function Footer() {
	return <Card>
		<CardContent>
			<ButtonGroup>
				<Button variant="outlined" startIcon={<GitHubIcon />}>Source Code</Button>
			</ButtonGroup>
		</CardContent>
	</Card>;
}