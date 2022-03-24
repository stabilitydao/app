import React, { useState } from 'react'
import tokenAbi from '@/src/abis/tokenAbi'
import { networks } from '../../../wallet'
import addresses from '@stabilitydao/addresses'
import WEB3 from '@/src/functions/web3'
import { useWeb3React } from '@web3-react/core'
import { useDispatch, useSelector } from "react-redux";
import { updateIsWaitingForWalletTxConfirm } from '@/redux/slices/modalsSlice'
import {
    updateDelegateMakerToken
} from '@/redux/slices/modalsSlice'
import { txConfirmedByNetwork, updateIsTxSubmitted, updateIsWalletOption } from "@/redux/slices/modalsSlice";
function DelegateMakerToken() {
    const dispatch = useDispatch()
    const [Address, setAddress] = useState(null)
    const { library, active, chainId, account } = useWeb3React()
    const web3 = WEB3()
    const currentNetwork = useSelector(state => state.network.value)
    const rpcLib = chainId ? library : web3
    const network = chainId && networks[chainId] ? chainId : currentNetwork
    async function handledelegate(address) {
        if (address !== null) {
            dispatch(updateIsWaitingForWalletTxConfirm(true))
            dispatch(updateDelegateMakerToken(false))
            try {
                const nftContract = new library.eth.Contract(tokenAbi, addresses[network].pm);
                await nftContract.methods.delegate(address).send({ from: account })
                    .on('transactionHash', txhash => {
                        dispatch(updateIsWaitingForWalletTxConfirm(false))
                        dispatch(updateIsTxSubmitted(txhash))
                    })
                    .on('receipt', r => {
                        dispatch(txConfirmedByNetwork())
                    })
                setAddress(null)
            } catch (error) {
                console.log(error)
                dispatch(updateDelegateMakerToken(true))
                dispatch(updateIsWaitingForWalletTxConfirm(false))
            }
        }
    }

    return (
        <div className="bg-gray-100 font-Roboto dark:bg-gray-800 dark:text-white p-4 flex flex-col pt-2  gap-y-2 ">
            <p className='text-sm'>To activate your voting power in the DAO, you must delegate your tokens to yourself or someone else.</p>
            <button onClick={() => { handledelegate(account) }} className="px-4 mb-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Delegate to self
            </button>
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="address"></label>
                <input id="address" type="text" onChange={(e) => { setAddress(e.target.value) }} className="block w-full px-4 py-1 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <button onClick={() => { handledelegate(Address) }} className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Delegate to an address
            </button>
        </div>
    )
}

export default DelegateMakerToken