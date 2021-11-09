import React from 'react'
import { injected } from '@/components/wallet/connectors'
import { useWeb3React } from '@web3-react/core'

function WalletOption({ onClose }) {
    const {  activate } = useWeb3React()

    async function handleConnect() {
        try {
            await activate(injected)
            localStorage.setItem("auth", JSON.stringify(true))
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col pt-2 bg-white gap-y-2 dark:bg-blue-gray-900">
            {[
                {
                    name: "Metamask",
                    img: "/wallets/metamask.png"
                },
                {
                    name: "WalletConnect",
                    img: "/wallets/wallet-connect.svg"
                },
                {
                    name: "Keystone",
                    img: "/wallets/keystone.png"
                },
                {
                    name: "Lattice",
                    img: "/wallets/lattice.png"
                },
                {
                    name: "Coinbase Wallet",
                    img: "/wallets/coinbase.svg"
                },
                {
                    name: "Binance",
                    img: "/wallets/bsc.jpg"
                },
            ].map(({ name, img }, index) => {
                return (
                    <button onClick={handleConnect} key={index} className="block px-4 py-3 text-gray-700 bg-gray-100 rounded-xl text-md hover:bg-gray-300 hover:text-gray-900 dark:text-white dark:bg-blue-gray-800 dark:hover:bg-blue-gray-700" >
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
