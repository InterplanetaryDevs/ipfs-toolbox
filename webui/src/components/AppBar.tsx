import {IconButton, Toolbar, Typography, AppBar as MuiAppBar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useIpfs} from '../context/IpfsContext';
import {useToolBox} from '../context/ToolBoxContext';
import {ConnectionTextField} from './ConnectionTextField';
import {useIpfsCluster} from '../context/ApiContext';

interface IAppBarProps {
}

export function AppBar(props: IAppBarProps) {
  const {tool, menu, setMenuOpen} = useToolBox();
  const {apiUrl, setApiUrl} = useIpfs();
  const {url, setUrl} = useIpfsCluster();

  return <MuiAppBar position="fixed">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setMenuOpen(true)}
        edge="start"
      >
        <MenuIcon/>
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        {tool.name}
      </Typography>
      {menu}
      <div style={{flexGrow: 1}}/>
      <div>
        <ConnectionTextField value={apiUrl} onChange={setApiUrl} label={'IPFS Url'} placeholder={'/ip4/127.0.0.1/tcp/5001'}/>
      </div>
      <div>
        <ConnectionTextField value={url} onChange={setUrl} label={'IPFS Cluster Url'} placeholder={'http://localhost:9094'}/>
      </div>
    </Toolbar>
  </MuiAppBar>;
}
