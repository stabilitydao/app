import React from 'react'
import { networks, switchNetwork } from '@/src/wallet'
import { ROPSTEN } from 'addresses'
import { useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { updatenetwork } from "@/redux/slices/networkSlice";

function AlphaTesting() {
    const
        dispatch = useDispatch(),
        { account, library, } = useWeb3React()
        ;

    function setNetwork(networkId) {
        dispatch(updatenetwork(networkId))
        updatenetwork()
    }

    return (
        <div className="flex w-full justify-center mt-8">
            <div className="relative group ">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-700 to-teal-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 " />
                {account ? (
                    <button className="relative px-7 py-4 text-white dark:bg-[#312e81] bg-indigo-700 rounded-lg leading-none flex items-center " onClick={() => { switchNetwork(networks[ROPSTEN], dispatch, library) }}>
                        Alpha Testing at Ropsten testnet
                    </button>
                ) : (
                    <button className="relative px-7 py-4 text-white dark:border-2 dark:border-[#4440b1] dark:bg-[#312e81] bg-indigo-700 rounded-lg leading-none flex items-center " onClick={() => { setNetwork(ROPSTEN) }}>
                        Alpha Testing at Ropsten testnet
                    </button>
                )}
            </div>
        </div>

    )
}

export default AlphaTesting
