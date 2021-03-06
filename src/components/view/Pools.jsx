import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {pools} from '@/src/wallet/pools';
import { useSelector } from "react-redux";
import Pool from '../Pool'

function Pools() {
    const { chainId } = useWeb3React()
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId ? chainId : currentNetwork

    return (
        <section className=" h-calc">
            <div className="container p-4 pt-24 lg:pt-0">
                <h1 className="mb-10 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Pools</h1>
                <div>
                    {pools[network] ? (
                        <div className="flex flex-row flex-wrap justify-center gap-2">
                            {Object.keys(pools[network]).map(name => {
                                const pool = pools[network][name]
                                return (
                                    <div key={name} className="flex flex-wrap justify-center m-6">
                                        <Pool name={name} pool={pool} network={network} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="m-6 text-2xl text-center font-bold">
                            <div>We currently have no pools on this network</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Pools
