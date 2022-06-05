import React, {useEffect, useState} from 'react'
import {BiTime} from "react-icons/bi";
import {GiRegeneration} from "react-icons/gi";
import addresses from "@stabilitydao/addresses";
import {gasPrice, networks, tl} from "@/src/wallet";
import {useSelector} from "react-redux";
import {useWeb3React} from "@web3-react/core";
import revenurRouterAbi from "@/src/abis/revenueRouterAbi.json";
import WEB3 from "@/src/functions/web3";

function Generation() {
    const { account, chainId, library } = useWeb3React()
    const web3 = WEB3()
    const rpcLib = chainId ? library : web3
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId && networks[chainId] ? chainId : currentNetwork
    const [estimateProfit, setEstimateProfit] = useState(0)
    const [generating, setGenerating] = useState(false)

    useEffect(
        () => {
            if (rpcLib && addresses[currentNetwork].revenueRouter) {
                const contract = new rpcLib.eth.Contract(revenurRouterAbi, addresses[currentNetwork].revenueRouter)

                contract.methods.estimateProfit().call().then(r => {
                    setEstimateProfit(web3.utils.fromWei(r) * 50)
                })
            }

        },
        [rpcLib, generating]
    )

    async function handleGenerate() {
        if (account && addresses[currentNetwork].revenueRouter) {
            const contract = new rpcLib.eth.Contract(revenurRouterAbi, addresses[currentNetwork].revenueRouter)
            const price = await gasPrice(library)
            contract.methods.run().send({ from: account, gasPrice: price }).on('transactionHash', txhash => {
                setGenerating(true)
            }).on('receipt', r => {
                setGenerating(false)
            })
        }
    }

    return (
        <section className=" h-calc">
            <div className="container p-4 pt-24 lg:pt-0">
                <h1 className="mb-6 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Generation</h1>
                <div className="max-w-2xl mx-auto">
                    <article className="mb-10">
                        <div className="mb-4 flex justify-between items-center flex-wrap">
                            <h2 className="text-3xl sm:text-4xl font-Roboto ">RevenueRouter</h2>
                            {addresses[network].revenueRouter &&
                                <a className=" flex justify-center h-9 items-center" title="View contract on blockchain explorer" target="_blank" href={`${networks[network].explorerurl}address/${addresses[network].revenueRouter}`} rel="noopener noreferrer">
                                    <span style={networks[network].testnet && { color: networks[network].color }} className="flex justify-center text-xs md:text-sm self-center dark:text-teal-400">{addresses[network].revenueRouter}</span>
                                </a>
                            }
                        </div>
                        {addresses[network].revenueRouter &&
                            <div className="flex items-center justify-between">
                                <div>Estimated PROFIT to generate: {estimateProfit}</div>
                                <div>
                                    {account && estimateProfit > 0 && !generating &&
                                        <button className="btn" onClick={handleGenerate}>Generate</button>
                                    }
                                </div>
                            </div>
                        }
                    </article>
                    <article className="mb-10">
                        <div className="py-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl sm:text-4xl font-Roboto ">Units</h2>
                                <div className="flex items-center pr-5"></div>
                            </div>
                            <table className="table-auto">
                                <thead>
                                <tr className="font-bold">
                                    <td className="text-center pr-5">Unit</td>
                                    <td>Share</td>
                                    <td className="text-center">Products</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="whitespace-nowrap text-2xl pr-5">
                                        <a className="py-5 border-0 inline-flex flex-col items-center justify-center" href="https://reactswap.com" target="_blank" rel="noopener noreferrer">
                                            <img src="/reactswap.png" alt="ReactSwap" className="w-16 h-16 mb-2"/>
                                            <div className="flex font-bold text-2xl whitespace-nowrap">
                                                ReactSwap
                                            </div>
                                        </a>
                                    </td>
                                    <td>
                                        <span className="flex w-16">100%</span>
                                    </td>
                                    <td className="text-md">
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="flex font-bold text-lg pr-4 whitespace-nowrap">
                                                    MVP-1
                                                </div>
                                                <div className="flex w-44">
                                                    Swap at the best price
                                                </div>
                                                <div className="flex items-center whitespace-nowrap">
                                                    <GiRegeneration className="text-3xl mr-2" /><span className="text-lg">v0</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex font-bold text-lg pr-4 whitespace-nowrap">
                                                    MVP-2
                                                </div>
                                                <div className="flex w-44">
                                                    Crypto trading
                                                </div>
                                                <div className="flex items-center whitespace-nowrap">
                                                    <BiTime className="ml-1.5 text-xl mr-3" /><span className="text-lg">Q3 2022</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex font-bold text-lg pr-4 whitespace-nowrap">
                                                    MVP-3
                                                </div>
                                                <div className="flex w-44">
                                                    Cross-chain swap
                                                </div>
                                                <div className="flex items-center whitespace-nowrap">
                                                    <BiTime className="ml-1.5 text-xl mr-3" /><span className="text-lg">Q4 2022</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex font-bold text-lg pr-4 whitespace-nowrap">
                                                    MVP-4
                                                </div>
                                                <div className="flex w-44">
                                                    Order book
                                                </div>
                                                <div className="flex items-center whitespace-nowrap">
                                                    <BiTime className="ml-1.5 text-xl mr-3" /><span className="text-lg">2023</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex font-bold text-lg pr-4 whitespace-nowrap">
                                                    MVP-5
                                                </div>
                                                <div className="flex w-44">
                                                    AMM
                                                </div>
                                                <div className="flex items-center whitespace-nowrap">
                                                    <BiTime className="ml-1.5 text-xl mr-3" /><span className="text-lg">2023</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                    <article className="mb-10 hidden">
                        <div className="py-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl sm:text-4xl font-Roboto ">Profit generators</h2>
                                <div className="flex items-center pr-5"><BiTime className="text-2xl mr-2" /><span className="text-2xl">Later</span></div>
                            </div>
                            <p className="text-lg">
                                <i>Profit Generation</i> is a broad term that encapsulates the process of delivering through developments a high level of value that’s necessary to earn profits. The process involves <i>Stability Builders</i> creating work units (smart contracts and decentralized applications) that become property of the Stability protocol and will essentially work for it. Clusters of work units (e.g. yield farms with a variety of features, AMMs, NFTs, etc.) being utilized in the same area are called <i>Profit Generators</i>.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Generation