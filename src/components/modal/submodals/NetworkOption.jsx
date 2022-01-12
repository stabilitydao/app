import React from 'react'
import { networks, switchNetwork } from '@/src/wallet'
import { useSelector, useDispatch } from 'react-redux'
import { updatenetwork } from '@/redux/slices/networkSlice'
import { useWeb3React } from '@web3-react/core'
import { networkOrder } from '@/src/wallet/networks'

function NetworkOption({ onClose }) {
    const dispatch = useDispatch()
    const { account, library, chainId } = useWeb3React()
    const Sync = useSelector(state => state.sync.value)
    const currentNetwork = useSelector(state => state.network.value)

    function setNetwork(networkId) {
        dispatch(updatenetwork(networkId))
        updatenetwork()
        onClose()
    }

    return (
        <div className="flex flex-col pt-2 bg-white gap-y-2 dark:bg-slate-900">
            {
                networkOrder.map((id, index) => {
                    const net = networks[id]
                    if (account && Sync && Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString())) {
                        if (net.chainid === chainId) {
                            return <button onClick={() => { switchNetwork(net, dispatch, library, onClose()) }} key={index} className="block px-4 py-3 text-gray-900 bg-gray-300 rounded-xl text-md dark:text-white dark:bg-slate-700">
                                <span className="flex items-center font-Roboto">
                                    <span style={{ backgroundColor: net.color, }} className="w-3 h-3 rounded-full mr-3.5" />
                                    {net.fullname}
                                </span>
                            </button>
                        } else {
                            return <button onClick={() => { switchNetwork(net, dispatch, library, onClose()) }} key={index} className="block px-4 py-3 text-black bg-gray-100 rounded-xl text-md hover:bg-gray-300 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700">
                                <span className="flex items-center font-Roboto">
                                    <span style={{ backgroundColor: net.color, }} className="w-3 h-3 rounded-full mr-3.5" />
                                    {net.fullname}
                                </span>
                            </button>
                        }
                    } else {
                        if (net.chainid === currentNetwork) {
                            return <button onClick={() => { setNetwork(net.chainid) }} key={index} className="block px-4 py-3 text-gray-900 bg-gray-300 rounded-xl text-md dark:text-white dark:bg-slate-700">
                                <span className="flex items-center font-Roboto ">
                                    <span style={{ backgroundColor: net.color, }} className="w-3 h-3 rounded-full mr-3.5" />
                                    {net.fullname}
                                </span>
                            </button>
                        } else {
                            return <button onClick={() => { setNetwork(net.chainid) }} key={index} className="block px-4 py-3 text-black bg-gray-100 rounded-xl text-md hover:bg-gray-300 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700">
                                <span className="flex items-center font-Roboto">
                                    <span style={{ color: net.color, }} className="w-2 h-2" />
                                    <span style={{ backgroundColor: net.color, }} className="w-3 h-3 rounded-full mr-3.5" />
                                    {net.fullname}
                                </span>
                            </button>
                        }
                    }
                })
            }
        </div>
    )
}

export default NetworkOption
