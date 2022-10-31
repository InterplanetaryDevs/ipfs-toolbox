import {IIpfsClusterContext} from './context/ApiContext';
import {IIpfsContext} from './context/IpfsContext';
import {IToolBoxContext} from './context/ToolBoxContext';

export interface IToolProps {
	toolBox: IToolBoxContext;
	ipfs: IIpfsContext;
	ipfsCluster: IIpfsClusterContext;
}
