import { updatenetwork } from '@/redux/slices/networkSlice'
import { toast } from 'react-toastify'

async function switchNetwork(network, dispatch, library, onClose) {
    try {
        await library.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: network.hexchainid }],
        });
        dispatch(updatenetwork(network.chainid))
        onClose()
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
                onClose()
            } catch (error) {
                toast.error('Failed', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }
}

export { switchNetwork }