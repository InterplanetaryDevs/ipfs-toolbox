import {Button, Card, CardActions, CardHeader, CardMedia, Container, Grid, Typography} from '@mui/material';
import React from 'react';
import {useToolBox} from '../context/ToolBoxContext';
import {DefaultToolImage} from './ToolDefaults';

export function Dashboard() {
	const {setTool, tools} = useToolBox();

	return (<Container>
		{tools.map(c => (<Grid container key={c.name} spacing={3}>
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
