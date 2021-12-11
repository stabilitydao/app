import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import addresses, { MAINNET, ROPSTEN, RINKEBY } from 'addresses'
import { useSelector } from "react-redux";
import Pool from '../Pool'

function Pools() {
    const { chainId } = useWeb3React()
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId ? chainId : currentNetwork

    const pools = {
        [ROPSTEN]: {
            "Old deprecated pool": {
                stake: 'PROFIT',
                earn: 'SDIV',
                contract: "0x75F929ba1C30A337de2B36C315c94A9abA24343A",
            },
            "Dividend Minter": {
                stake: 'PROFIT',
                earn: 'SDIV',
                contract: "0x20169ebb1b60ee0c45ECAa5235551cC69Ea788C0",
            },
        },
    };

    return (
        <section className="dark:bg-gradient-to-br dark:from-black dark:via-space dark:to-black dark:text-white h-calc">
            <div className="container p-4">
                <h1 className="mb-10 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Pools</h1>
                <div>
                    {pools[network] ? (
                        <div className="flex flex-row flex-wrap justify-center">
                            {Object.keys(pools[network]).map(name => {
                                const pool = pools[network][name]
                                return (
                                    <div key={name} className="flex flex-wrap justify-center ">
                                        <Pool name={name} pool={pool} network={network} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="m-6 text-2xl text-center">We currently have no pools on this network</div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Pools
