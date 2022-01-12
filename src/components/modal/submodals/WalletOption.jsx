import React from 'react'
import { injected, walletconnect, walletlinkconnector, torusconnector, cloverconnector } from '@/src/wallet/connectors'
import walletConnectError from '@/src/wallet'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateIsPending } from '@/redux/slices/modalsSlice'

function WalletOption({ onClose }) {
    const dispatch = useDispatch()
    const { activate } = useWeb3React()
    async function handleWalletConnect(connector) {
        onClose()
        dispatch(updateIsPending(true))
        try {
            await activate(connector, undefined, true)
            localStorage.setItem("auth", JSON.stringify(true))
            dispatch(updateIsPending(false))
        } catch (error) {
            walletConnectError(error)
            dispatch(updateIsPending(false))
        }
    }

    return (
        <div className="flex flex-col pt-2 bg-white gap-y-2 dark:bg-slate-900">
            {[
                {
                    name: "Metamask",
                    connector: injected,
                    img: "/wallets/metamask.png"
                },
                {
                    name: "WalletConnect",
                    connector: walletconnect,
                    img: "/wallets/wallet-connect.svg"
                },
                {
                    name: "Coinbase",
                    connector: walletlinkconnector,
                    img: "/wallets/coinbase.svg"
                },
                {
                    name: "Torus",
                    connector: torusconnector,
                    img: "/wallets/torus.png"
                },
                {
                    name: "Clover",
                    connector: cloverconnector,
                    img: "/wallets/clover.svg"
                },
            ].map(({ name, connector, img }, index) => {
                return (
                    <button onClick={() => { handleWalletConnect(connector) }} key={index} className="block px-4 py-3 text-gray-700 bg-gray-100 rounded-xl text-md hover:bg-gray-300 hover:text-gray-900 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700" >
                        <span className="flex flex-col font-Roboto">
                            <span className="flex items-center justify-between">
                                {name}
                                <img src={img} alt="wallet_img" width="32" />
                            </span>
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

export default WalletOption
