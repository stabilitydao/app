import React, { useEffect } from 'react'
import { Copy, ExternalLink } from 'react-feather';
import { injected } from '@/components/wallet/connectors'
import { networks } from '@/components/wallet/networks';
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { updateBalance } from '@/redux/slices/balanceSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


function Profile({ onClose }) {
    const dispatch = useDispatch()
    const { account, deactivate, chainId, library } = useWeb3React()
    const balance = useSelector(state => state.balance.value)
    
    useEffect((dispatch) => {
        if (account) {
            library.eth.getBalance(account).then((balance) => {
                // dispatch(updatenetwork(chainId))
                return library.utils.fromWei(balance, "ether")
            }).then((eths) => {
                dispatch(updateBalance(eths))
            })
        }
    }, [account, library, chainId])
    
    async function handleDisconnect() {
        try {
            await deactivate(injected)
            dispatch(updateBalance(null))
            localStorage.setItem("auth", JSON.stringify(false))
            onClose()
        } catch (error) {
            toast.error('Failed.', {
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

    return (
        <div className="flex flex-col py-3 bg-white dark:bg-blue-gray-900 gap-y-4">
            <div >
                <h2 className="text-sm text-left font-Roboto">
                    YOUR ADDRESS
                </h2>
            </div>
            <div className="px-4 py-3 text-gray-700 bg-gray-100 rounded-xl text-md hover:bg-gray-300 hover:text-gray-900 dark:text-white dark:bg-blue-gray-800 dark:hover:bg-blue-gray-700" >
                <div className="flex items-start mx-auto w-60 sm:w-full gap-x-1">
                    <h1 className="truncate font-Roboto">
                        {account}
                    </h1>
                    <Copy size={24} strokeWidth={1} className="cursor-pointer onClick-active" onClick={() => { navigator.clipboard.writeText(account) }} />
                </div>
            </div>
            {
                Object.entries(networks).map((network, index) => {
                    if (network[0] == chainId) {
                        return <a key={index}rel="noopener noreferrer" className="flex flex-row items-center justify-end font-Roboto gap-x-1" href={network[1].explorerurl + account} target="_blank">
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
                                return <span key={index}>{`${Math.floor(balance * 100) / 100} ${network[1].symbol}`}</span>
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