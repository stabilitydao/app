import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from "react-redux";
import addresses from '@stabilitydao/addresses'
import {payers} from "@/src/wallet";
import Payer from "@/src/components/Payer";
function Dividends() {
    const currentNetwork = useSelector(state => state.network.value)
    const { chainId } = useWeb3React()
    const network = chainId ? chainId : currentNetwork
    const etherPayer = payers[network][0]
    const profitPayer = payers[network][1]

    return (
        <section className="h-calc">
            <div className="container p-4 pt-24 lg:pt-0">
                <h1 className="mb-10 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Dividends</h1>
                {
                    !payers[network] &&
                    <div className="m-6 text-2xl text-center font-semibold ">
                        <div>We currently have no dividend payers on this network</div>
                    </div>
                }
                <div className="flex flex-wrap justify-center">
                    {etherPayer && <Payer address={etherPayer} name={'Ether Payer'} rewardTokenAddress={addresses[network].weth} rewardTokenSymbol={'WETH'} color={'green'} network={network} />}
                    {profitPayer && <Payer address={profitPayer} name={'Profit Payer'} rewardTokenAddress={addresses[network].token} rewardTokenSymbol={'PROFIT'} color={'blue'} network={network} />}
                </div>
            </div>
        </section>
    )
}

export default Dividends