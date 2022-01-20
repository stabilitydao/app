import React from 'react'
import {BiTime} from "react-icons/bi";
import {BsLink} from "react-icons/bs";

function Generation() {
    return (
        <section className=" h-calc">
            <div className="container p-4 pt-24 lg:pt-0">
                <h1 className="mb-6 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Generation</h1>
                <div className="max-w-2xl mx-auto">
                    <article className="mb-10">
                        <div className="py-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl sm:text-4xl font-Roboto ">Units</h2>
                                <div className="flex items-center pr-5"><BiTime className="text-2xl mr-2" /><span className="text-2xl">Q1 2022</span></div>
                            </div>
                            <table className="table-auto">
                                <tbody>
                                <tr>
                                    <td className="whitespace-nowrap text-2xl pr-5">
                                        <a className="w-44 py-5 border-0 inline-flex flex-col items-center justify-center" href="https://reactswap.com" target="_blank" rel="noopener noreferrer">
                                            <img src="/reactswap.png" alt="Rarest" className="w-20 h-20 mb-2"/>
                                            <div className="flex font-bold text-2xl">
                                                ReactSwap
                                            </div>
                                        </a>
                                    </td>
                                    <td className="text-lg">
                                        Multi-chain automated market maker with liquidity providing farms, staking pools and lending markets. Fork of SushiSwap.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="whitespace-nowrap text-2xl pr-5">
                                        <a className="w-44 py-5 border-0 inline-flex flex-col items-center justify-center" href="https://rarest.market" target="_blank" rel="noopener noreferrer">
                                            <img src="/rarest.png" alt="Rarest" className="w-20 h-20 mb-2"/>
                                            <div className="flex font-bold text-2xl">
                                                Rarest
                                            </div>
                                        </a>
                                    </td>
                                    <td className="text-lg">
                                        NFT marketplace platform.<br />
                                        Creating, selling and collecting digital items.
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                    <article className="mb-10">
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