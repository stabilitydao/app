import React, { useEffect } from 'react'
import { Copy, ExternalLink } from 'react-feather';
import { injected } from '@/src/wallet/connectors'
import { networks } from '@/src/wallet/networks';
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { updateBalance } from '@/redux/slices/balanceSlice'
import { updateTokenbalance } from '@/redux/slices/tokenbalanceSlice'
import { useDispatch } from 'react-redux'
import tokenAbi from '@/src/abis/tokenAbi'
import addresses from 'addresses'
import { showAlert } from '@/src/components/alert';


function Profile({ onClose }) {
    const dispatch = useDispatch()
    const { account, deactivate, chainId, library } = useWeb3React()
    const balance = useSelector(state => state.balance.value)
    const tokenBalance = useSelector(state => state.tokenBalance.value)
    useEffect(() => {
        if (account) {
            library.eth.getBalance(account).then((balance) => {
                return library.utils.fromWei(balance, "ether")
            }).then((eths) => {
                dispatch(updateBalance(eths))
            })

            const contract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
            contract.methods.balanceOf(account).call().then((result) => {
                return library.utils.fromWei(result);
            }).then((tokenBalance) => {
                dispatch(updateTokenbalance(tokenBalance))
            })
        }
    }, [account, library, chainId])

    async function handleDisconnect() {
        try {
            await deactivate(injected)
            dispatch(updateBalance(0))
            dispatch(updateTokenbalance(0))
            localStorage.setItem("auth", JSON.stringify(false))
            onClose()
        } catch (error) {
            showAlert("Failed")
        }
    }

    return (
        <div className="flex flex-col py-3 text-black bg-white dark:text-white dark:bg-blue-gray-900 gap-y-4">
            <div >
                <h2 className="text-sm text-left font-Roboto">
                    YOUR ADDRESS
                </h2>
            </div>
            <div className="px-4 py-3 text-gray-700 bg-gray-100 rounded-xl text-md hover:bg-gray-300 hover:text-gray-900 dark:text-white dark:bg-blue-gray-800 dark:hover:bg-blue-gray-700" >
                <div className="flex items-start mx-auto w-60 sm:w-full gap-x-1">
                    <h1 className="overflow-x-auto font-Roboto scrollbar-thin ">
                        {account}
                    </h1>
                    <Copy size={24} strokeWidth={1} className="cursor-pointer onClick-active" onClick={() => { navigator.clipboard.writeText(account) }} />
                </div>
            </div>
            {
                Object.entries(networks).map((network, index) => {
                    if (network[0] == chainId) {
                        return <a key={index} rel="noopener noreferrer" className="flex flex-row items-center justify-end font-Roboto gap-x-1" href={network[1].explorerurl + account} target="_blank">
                            View on explorer
                            <ExternalLink size={20} strokeWidth={1} className="cursor-pointer onClick-active" />
                        </a>
                    }
                })
            }
            <div className="">
                <h1 className="flex flex-row justify-between">
                    <span>Balance</span>
                    {
                        Object.entries(networks).map((network, index) => {
                            if (network[0] == chainId) {
                                return <span key={index}>{`${Math.floor(balance * 1000) / 1000} ${network[1].symbol}`}, {Math.floor(tokenBalance * 1000) / 1000} PROFIT</span>
                            }
                        })
                    }
                </h1>
            </div>
            <div className="h-12">
                <button
                    className="w-full btn rounded-2xl"
                    onClick={handleDisconnect}
                >
                    Disconnect Wallet
                </button>
            </div>
        </div>
    )
}

export default Profile