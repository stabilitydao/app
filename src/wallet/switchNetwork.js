import { updatenetwork } from '@/redux/slices/networkSlice'
import { showAlert } from '@/src/components/alert';
import { updateIsPending } from '@/redux/slices/modalsSlice'
async function switchNetwork(network, dispatch, library) {
    dispatch(updateIsPending(true))
    try {
        await library.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: network.hexchainid }],
        });
        dispatch(updatenetwork(network.chainid))
        dispatch(updateIsPending(false))
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
        showAlert("Failed")
        dispatch(updateIsPending(false))
    }
}

export { switchNetwork }