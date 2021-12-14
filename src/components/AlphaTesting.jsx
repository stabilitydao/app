import React from 'react'
import { networks, switchNetwork } from '@/src/wallet'
import { ROPSTEN } from 'addresses'
import { useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { updatenetwork } from "@/redux/slices/networkSlice";
import {GiCrane} from "react-icons/gi";

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
                    <button className="relative px-5 py-4 text-white dark:bg-[#551069] bg-indigo-700 rounded-lg leading-none flex items-start " onClick={() => { switchNetwork(networks[ROPSTEN], dispatch, library) }}>
                        <GiCrane className="text-5xl mr-5 self-center"/>
                        <span className="text-2xl">Pre-Alpha Testing <br />Ropsten testnet</span>
                    </button>
                ) : (
                    <button className="relative px-5 py-4 text-white dark:bg-[#551069] bg-indigo-700 rounded-lg leading-none flex items-start " onClick={() => { setNetwork(ROPSTEN) }}>
                        <GiCrane className="text-5xl mr-5 self-center"/>
                        <span className="text-2xl">Pre-Alpha Testing <br />Ropsten testnet</span>
                    </button>
                )}
            </div>
        </div>

    )
}

export default AlphaTesting
