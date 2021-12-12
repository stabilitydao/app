import React from 'react'
import { networks, switchNetwork } from '@/src/wallet'
import { ROPSTEN } from 'addresses'
import {useDispatch} from "react-redux";
import {useWeb3React} from "@web3-react/core";
import {updatenetwork} from "@/redux/slices/networkSlice";

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
        <div className="flex w-full justify-center mt-6">
            {account ? (
                <button className="btn w-96 text-xl rounded-xl dark:bg-[#6f098d] border-0 " onClick={() => { switchNetwork(networks[ROPSTEN], dispatch, library) }}>
                    Alpha Testing at Ropsten testnet
                </button>
            ) : (
                <button className="btn w-96 text-xl rounded-xl dark:bg-[#6f098d] border-0" onClick={() => {  setNetwork(ROPSTEN)  }}>
                    Alpha Testing at Ropsten testnet
                </button>
            )}
        </div>
    )
}

export default AlphaTesting
