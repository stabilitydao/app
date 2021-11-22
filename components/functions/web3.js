import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { networks } from '../wallet'
function WEB3() {
    const { account, chainId } = useWeb3React()
    const Sync = useSelector(state => state.sync.value)
    const currentNetwork = useSelector(state => state.network.value)
    if (account && Sync && Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString())) {
        return new Web3(new Web3.providers.HttpProvider(networks[chainId].rpc));
    } else {
        return new Web3(new Web3.providers.HttpProvider(networks[currentNetwork].rpc));
    }
}
export default WEB3