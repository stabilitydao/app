import { updatenetwork } from '@/redux/slices/networkSlice'
import { showAlert } from '@/src/components/alert';
import { updateIsWaitingForChangeNetwork } from '@/redux/slices/modalsSlice'
async function switchNetwork(network, dispatch, library) {
    dispatch(updateIsWaitingForChangeNetwork(true))
    try {
        await library.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: network.hexchainid }],
        });
        dispatch(updatenetwork(network.chainid))
        dispatch(updateIsWaitingForChangeNetwork(false))
    } catch (error) {
        if (error.code === 4902) {
            try {
                await library.currentProvider.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: network.hexchainid,
                            chainName: network.name,
                            rpcUrls: [network.rpc],
                            nativeCurrency: {
                                name: network.name,
                                symbol: network.symbol,
                                decimals: network.chainid,
                            },
                            blockExplorerUrls: [network.explorerurl],
                        },
                    ],
                });
                dispatch(updatenetwork(network.chainid))
            } catch (error) {
            }
        }
        showAlert("Failed",error.code,error.message)
        dispatch(updateIsWaitingForChangeNetwork(false))
    }
}

export { switchNetwork }