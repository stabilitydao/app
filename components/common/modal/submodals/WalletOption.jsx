import React from 'react'
import { injected, walletconnect } from '@/components/wallet/connectors'
import walletConnectError from '@/components/wallet/'
import { useWeb3React } from '@web3-react/core'

function WalletOption({ onClose }) {

    const { activate } = useWeb3React()
    async function handleWalletConnect(connector) {
        try {
            await activate(connector, undefined, true)
            localStorage.setItem("auth", JSON.stringify(true))
            onClose()
        } catch (error) {
            walletConnectError(error)
            onClose()
        }
    }

    return (
        <div className="flex flex-col pt-2 bg-white gap-y-2 dark:bg-blue-gray-900">
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
            ].map(({ name, connector, img }, index) => {
                return (
                    <button onClick={() => { handleWalletConnect(connector) }} key={index} className="block px-4 py-3 text-gray-700 bg-gray-100 rounded-xl text-md hover:bg-gray-300 hover:text-gray-900 dark:text-white dark:bg-blue-gray-800 dark:hover:bg-blue-gray-700" >
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
