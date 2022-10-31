import {Button, Card, CardActions, CardHeader, CardMedia, Container, Grid, Typography} from '@mui/material';
import React from 'react';
import {DefaultToolImage, TOOLS} from '../tools/TOOLS';
import {ITool} from '../App';
import {useToolBox} from '../context/ToolBoxContext';


export const DashboardDefinition: ITool = {
	name: 'Dashboard',
	tool: <Dashboard/>,
};

export function Dashboard() {
	const {setTool} = useToolBox();

	return (<Container>
		{TOOLS.map(c => (<Grid container key={c.name} spacing={3}>
			<Grid item xs={12}>
				<Typography variant={'h4'}>{c.name}</Typography>
			</Grid>
			{c.tools.map(t => (<Grid item xs={4} key={t.name}>
				<Card>
					<CardMedia
						component={'img'}
						image={t.image ?? DefaultToolImage}
					/>
					<CardHeader title={t.name}/>
					<CardActions>
						<Button onClick={() => setTool(t)}>Open</Button>
					</CardActions>
				</Card>
			</Grid>))}
		</Grid>))}
	</Container>);
}
