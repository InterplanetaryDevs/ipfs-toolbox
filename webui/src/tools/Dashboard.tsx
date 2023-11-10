import {Button, Card, CardActions, CardHeader, CardMedia, Grid, Stack, Typography} from '@mui/material';
import React from 'react';
import {useToolBox} from '../context/ToolBoxContext';
import {DefaultToolImage} from './ToolDefaults';
import {ToolContainer} from '../components/ToolContainer';

export function Dashboard() {
	const {setTool, tools} = useToolBox();

	return (<ToolContainer>
		{tools.map(c => (<Grid container key={c.name} spacing={3}>
			<Grid item xs={12}>
				<Typography variant={'h4'}>{c.name}</Typography>
			</Grid>
			{c.tools.map(t => (<Grid item xs={4} key={t.name}>
				<Card>
					<CardMedia
						component={'img'}
						image={t.image ?? DefaultToolImage}
						sx={{height: 250}}
					/>
					<CardHeader title={t.name}/>
					<CardActions>
						<Button onClick={() => setTool(t)} color={'secondary'}>Open</Button>
					</CardActions>
				</Card>
			</Grid>))}
		</Grid>))}
	</ToolContainer>);
}
