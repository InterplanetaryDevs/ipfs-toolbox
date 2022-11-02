import React, {useState} from 'react';
import {useToolBox} from '../../context/ToolBoxContext';
import {KeyBindInput} from '../../components/KeyBindInput';
import {Button, Paper, Stack} from '@mui/material';
import {useSnackbar} from 'notistack';

export function AppConfiguration() {
	const {configuration, setConfiguration} = useToolBox();
	const {enqueueSnackbar} = useSnackbar();

	const [home, setHome] = useState(configuration.keyBinds.Home);
	const [menu, setMenu] = useState(configuration.keyBinds.Menu);
	const [config, setConfig] = useState(configuration.keyBinds.Configuration);
	const [search, setSearch] = useState(configuration.keyBinds.ToolSearch);

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

	return <Paper>
		<Stack spacing={1}>
			<KeyBindInput label={'Home'} keyBind={home} onChange={setHome}/>
			<KeyBindInput label={'Menu'} keyBind={menu} onChange={setMenu}/>
			<KeyBindInput label={'Configuration'} keyBind={config} onChange={setConfig}/>
			<KeyBindInput label={'Search'} keyBind={search} onChange={setSearch}/>
			<Button onClick={save}>Save</Button>
		</Stack>
	</Paper>;
}