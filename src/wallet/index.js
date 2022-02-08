import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { NoCloverProviderError, UserRejectedRequestError } from '@clover-network/clover-connector'
import { showAlert } from '@/src/components/alert';

export default function walletConnectError(error) {
    if (error instanceof NoEthereumProviderError || error instanceof NoCloverProviderError) {
        showAlert('Not detected.')
    } else if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect || error instanceof UserRejectedRequestError) {
        showAlert('Please authorize this website to access your account.')
    } else if (error.code == -32002) {
        showAlert('Already requested')
    }
    else {
        console.error(error);
        showAlert('An unknown error occurred. Check the console for more details.')
    }
}

export { injected, walletconnect } from './connectors'
export { networks } from './networks'
export { pools } from './pools'
export { payers } from './payers'
export { gov, tl, splitter } from './gov'
export { switchNetwork } from './switchNetwork'