import React, {useState} from 'react';
import {useToolBox} from '../../context/ToolBoxContext';
import {KeyBindInput} from '../../components/KeyBindInput';
import {Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Divider, Paper, Stack} from '@mui/material';
import {useSnackbar} from 'notistack';
import {DefaultAppConfiguration} from '../../types/IAppConfiguration';

export function AppConfiguration() {
	const {configuration, setConfiguration} = useToolBox();
	const {enqueueSnackbar} = useSnackbar();

	const [home, setHome] = useState(configuration.keyBinds.Home);
	const [menu, setMenu] = useState(configuration.keyBinds.Menu);
	const [config, setConfig] = useState(configuration.keyBinds.Configuration);
	const [search, setSearch] = useState(configuration.keyBinds.ToolSearch);

	const reset = () => {
		setHome(DefaultAppConfiguration.keyBinds.Home);
		setMenu(DefaultAppConfiguration.keyBinds.Menu);
		setConfig(DefaultAppConfiguration.keyBinds.Configuration);
		setSearch(DefaultAppConfiguration.keyBinds.ToolSearch);

		save();
	};

	const cancel = () => {
		setHome(configuration.keyBinds.Home);
		setMenu(configuration.keyBinds.Menu);
		setConfig(configuration.keyBinds.Configuration);
		setSearch(configuration.keyBinds.ToolSearch);
	};

	const save = () => {
		setConfiguration({
			...configuration,
			keyBinds: {
				ToolSearch: search,
				Configuration: config,
				Menu: menu,
				Home: home
			}
		});
		enqueueSnackbar('Configuration saved!', {variant: 'success'});
	};

	return <Card>
		<CardHeader title={'KeyBinds'}/>
		<CardContent>
			<Stack spacing={1} divider={<Divider/>}>
				<KeyBindInput label={'Home'} keyBind={home} onChange={setHome}/>
				<KeyBindInput label={'Menu'} keyBind={menu} onChange={setMenu}/>
				<KeyBindInput label={'Configuration'} keyBind={config} onChange={setConfig}/>
				<KeyBindInput label={'Search'} keyBind={search} onChange={setSearch}/>
			</Stack>
		</CardContent>
		<CardActions>
			<ButtonGroup>
				<Button onClick={reset}>Reset</Button>
				<Button onClick={cancel}>Cancel</Button>
				<Button onClick={save} variant={'contained'}>Save</Button>
			</ButtonGroup>
		</CardActions>
	</Card>;
}
