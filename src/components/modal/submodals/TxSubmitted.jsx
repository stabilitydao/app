import React from 'react'
import {useSelector} from "react-redux";
import {networks} from "@/src/wallet";
import {useWeb3React} from "@web3-react/core";

function TxSubmitted() {
    const txhash = useSelector(state => state.modals.value.txhash)
    const currentNetwork = useSelector(state => state.network.value)
    const { chainId } = useWeb3React()
    const network = chainId ? chainId : currentNetwork

    return (
        <div className="dark:text-white">
            <div className="my-5 flex flex-col items-center justify-center p-5">
                <div className='flex justify-center items-center mb-10 mt-10 '>
                    <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-warn-gray-800 dark:border-white' />
                </div>
                <div className="font-Roboto my-10 text-2xl">Transaction submitted</div>
                <a className="flex justify-center h-9 items-center" title="View transaction on explorer" target="_blank" href={networks[network].explorerurl.concat(txhash)} rel="noopener noreferrer">
                    View on explorer
                </a>
            </div>
        </div>
    )
}

export default TxSubmitted