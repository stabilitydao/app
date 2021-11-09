import React from 'react'
import { networks, switchNetwork } from '@/components/wallet/'
import { useSelector, useDispatch } from 'react-redux'
import { updatenetwork } from '@/redux/slices/networkSlice'
import { useWeb3React } from '@web3-react/core'

function NetworkOption({ onClose }) {
    const dispatch = useDispatch()
    const { account, library, } = useWeb3React()
    const currentNetwork = useSelector(state => state.network.value)

    function setNetwork(networkId) {
        dispatch(updatenetwork(networkId))
        updatenetwork()
        onClose()
    }

    return (
        <div className="flex flex-col pt-2 bg-white gap-y-2 dark:bg-blue-gray-900">
            {
                Object.entries(networks).map((network, index) => {
                    if (account) {
                        if (network[1].chainid === currentNetwork) {
                            return <button onClick={() => { switchNetwork(network[1], dispatch, library, onClose()) }} key={index} className="block px-4 py-3 text-gray-900 bg-gray-300 rounded-xl text-md dark:text-white dark:bg-blue-gray-700">
                                <span className="flex items-center font-Roboto">
                                    <span style={{backgroundColor: network[1].color,}} className="w-3 h-3 rounded-full mr-3.5" />
                                    {network[1].fullname}
                                </span>
                            </button>
                        } else {
                            return <button onClick={() => { switchNetwork(network[1], dispatch, library, onClose()) }} key={index} className="block px-4 py-3 text-black bg-gray-100 rounded-xl text-md hover:bg-gray-300 dark:text-white dark:bg-blue-gray-800 dark:hover:bg-blue-gray-700">
                                <span className="flex items-center font-Roboto">
                                    <span style={{backgroundColor: network[1].color,}} className="w-3 h-3 rounded-full mr-3.5" />
                                    {network[1].fullname}
                                </span>
                            </button>
                        }
                    } else {
                        if (network[1].chainid === currentNetwork) {
                            return <button onClick={() => { setNetwork(network[1].chainid) }} key={index} className="block px-4 py-3 text-gray-900 bg-gray-300 rounded-xl text-md dark:text-white dark:bg-blue-gray-700">
                                <span className="flex items-center font-Roboto">
                                     <span style={{backgroundColor: network[1].color,}} className="w-3 h-3 rounded-full mr-3.5" />
                                    {network[1].fullname}
                                </span>
                            </button>
                        } else {
                            return <button onClick={() => { setNetwork(network[1].chainid) }} key={index} className="block px-4 py-3 text-black bg-gray-100 rounded-xl text-md hover:bg-gray-300 dark:text-white dark:bg-blue-gray-800 dark:hover:bg-blue-gray-700">
                                <span className="flex items-center font-Roboto">
                                    <span  style={{color: network[1].color,}} className="w-2 h-2" />
                                     <span style={{backgroundColor: network[1].color,}} className="w-3 h-3 rounded-full mr-3.5" />
                                    {network[1].fullname}
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