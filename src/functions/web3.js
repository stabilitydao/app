import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { networks } from '../wallet'
function WEB3() {
    const { chainId } = useWeb3React()
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId ? chainId.toString() : currentNetwork.toString()

    if (networks[network]) {
        return new Web3(new Web3.providers.HttpProvider(networks[network].rpc));
    }

    return null

}
export default WEB3