import React, { useState, useEffect } from 'react'
import WEB3 from '../functions/web3'
import govAbi from '@/src/abis/govAbi'
import { gov } from '../wallet'
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
export const ProposalState = ({ address }) => {
    const web3 = WEB3()
    const [state, setstate] = useState()
    const { active, chainId, account, library } = useWeb3React()
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId ? chainId : currentNetwork
    const badge = [

        'PENDING',

        'ACTIVE',

        'CALCELED',

        'DEFEATED',

        'SUCCEEDED',

        'QUEUED',

        'EXPIRED',

        'EXECUTED'
    ]
    useEffect(() => {
        const govContract = new web3.eth.Contract(govAbi, gov[network])
        govContract.methods.state(address).call().then((r) => {
            setstate(r)
        }).catch((err) => {
            console.log(err)
        })
    }, [network])
    return (
        <>
            {state &&
                badge.filter((obj, index) => {
                    if (index == state) {
                        return (
                            <div className={`w-16  h-4 `}>
                                {obj}
                            </div>
                        )
                    }
                })
            }
        </>
    )

}

