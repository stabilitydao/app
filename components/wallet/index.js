import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { toast } from 'react-toastify'

function showAlert(message) {
    toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default function walletConnectError(error) {
    if (error instanceof NoEthereumProviderError) {
        showAlert('No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.')
    } else if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
        showAlert('Please authorize this website to access your Ethereum account.')
    }
    else if (error.code == -32002) {
        showAlert('Already requested')
    }
    else {
        console.error(error);
        showAlert('An unknown error occurred. Check the console for more details.')
    }
}

export { injected } from './connectors'
export { networks } from './networks'
export { switchNetwork } from './switchNetwork'