import React from 'react'
import Link from 'next/link'
import {currentPhase} from "@/src/components/view/Roadmap";
import { MAINNET, ROPSTEN, RINKEBY } from 'addresses'
import {useSelector} from "react-redux";
import AlphaTesting from "@/src/components/AlphaTesting";

const appEnabled = {
    [MAINNET]: false,
    [ROPSTEN]: true,
    [RINKEBY]: false,
}

function Home() {
    const currentNetwork = useSelector(state => state.network.value)

    return (
        <section className="dark:bg-gradient-to-br dark:from-black dark:via-space dark:to-black dark:text-white h-calc">
            <div className="container p-4 pb-32">
                {appEnabled[currentNetwork] ? (
                    <div className="flex flex-col max-w-6xl mx-auto">
                        <div className="flex flex-wrap">
                            <div className="flex w-full md:w-1/2 justify-center md:justify-end md:pr-6">
                                <div className="flex w-96 justify-center">
                                    <img src="/logo.svg" alt="logo" width={256} height={256} />
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-1/2 justify-center md:items-start md:pl-6">
                                <div className="flex flex-col items-center md:items-start">
                                    <h1 className="text-4xl sm:text-6xl">
                                        Stability
                                    </h1>
                                    <div className="text-3xl font-medium leading-normal sm:text-4xl ">
                                        Profit generating DeFi protocol
                                    </div>
                                    <p className="mt-0 mb-4 text-sm font-medium leading-normal">
                                        Decentralized organization
                                    </p>
                                    <Link href="/roadmap">
                                        <div className="dark:bg-[#2f004b] py-0.5 px-4 rounded-xl cursor-pointer dark:text-[#96aaff] dark:border-[#4e1173] flex items-center justify-center mb-1 text-center text-indigo-700 sm:text-2xl font-Roboto">
                                            Phase 0: {currentPhase}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex py-3 justify-center flex-wrap md:my-3">
                            <div className="flex w-full md:w-1/2 flex-col items-center md:items-end md:pr-3 lg:pr-6 my-5 md:my-0">
                                <div className="flex w-80 md:w-80 lg:w-96 flex-col p-6 dark:bg-black rounded-2xl">
                                    <div className="flex text-3xl">Staking</div>
                                    <div className="flex">
                                        <div className="flex flex-col w-1/2 p-4">
                                            <div className="flex dark:text-teal-100">Earned</div>
                                            <div className="flex dark:text-teal-100 font-bold">
                                                {0 ? (
                                                    <div>
                                                        <div className="mb-4 text-xl whitespace-nowrap  ">
                                                            {0}
                                                        </div>
                                                        <button className="btn w-full dark:bg-teal-600 border-none outline-none text-sm rounded-2xl" onClick={harvest}>Harvest</button>
                                                    </div>
                                                ) : (
                                                    <div>-</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-1/2 p-4">
                                            <div className="flex dark:text-teal-100">PROFIT staked</div>
                                            <div className="flex dark:text-teal-100 font-bold">
                                                <div className="text-xl">
                                                    0
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/2 flex-col items-center md:items-start md:pr-3 lg:pl-6 my-5 md:my-0">
                                <div className="flex w-80 md:w-80 lg:w-96 flex-col p-6 dark:bg-black rounded-2xl">
                                    <div className="flex text-3xl">Dividends</div>
                                    <div className="flex">
                                        <div className="flex flex-col w-1/2 p-4">
                                            <div className="flex dark:text-teal-100">Earned</div>
                                            <div className="flex dark:text-teal-100 font-bold">
                                                {0 ? (
                                                    <div>
                                                        <div className="mb-4 text-xl whitespace-nowrap  ">
                                                            {0}
                                                        </div>
                                                        <button className="btn w-full dark:bg-teal-600 border-none outline-none text-sm rounded-2xl" onClick={harvest}>Harvest</button>
                                                    </div>
                                                ) : (
                                                    <div>-</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-1/2 p-4">
                                            <div className="flex dark:text-teal-100">SDIV in wallet</div>
                                            <div className="flex dark:text-teal-100 font-bold">
                                                <div className="text-xl">
                                                    0
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap md:py-3 justify-center md:my-3">
                            <div className="flex w-full md:w-1/2 flex-col items-center md:items-end md:pr-3 lg:pr-6 my-5 md:my-0">
                                <div className="flex w-80 md:w-80 lg:w-96 h-40 flex-col p-6 dark:bg-black rounded-2xl">
                                    <div className="flex text-3xl">PROFIT</div>
                                    <div className="flex">
                                        <table className="table-auto">
                                            <tbody>
                                            <tr>
                                                <td>Price</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>Marketcap</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>Total supply</td>
                                                <td>1 000 000-</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/2 flex-col items-center md:items-start md:pr-3 lg:pl-6 my-5 md:my-0">
                                <div className="flex w-80 md:w-80 lg:w-96 flex-col h-40 p-6 dark:bg-black rounded-2xl">
                                    <div className="flex text-3xl">SDIV</div>
                                    <div className="flex">
                                        <table className="table-auto">
                                            <tbody>
                                            <tr>
                                                <td>New SDIV/block</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>Total supply</td>
                                                <td>22 021</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-lg mx-auto mb-20">
                        <img src="/logo.svg" alt="logo" width={512} height={512} />
                        <div className="text-center">
                            <div className="mt-0 mb-2 text-3xl font-medium leading-normal sm:text-4xl font-Roboto">
                                <h1 className="text-4xl sm:text-6xl">
                                    Stability
                                </h1>
                                Profit generating DeFi protocol
                            </div>
                            <p className="mt-0 mb-4 text-sm font-medium leading-normal">
                                Decentralized organization
                            </p>
                            <Link href="/roadmap">
                                <div className="w-80 mx-auto dark:bg-[#2f004b] py-0.5 px-4 rounded-xl cursor-pointer dark:text-[#96aaff] dark:border-[#4e1173] flex items-center justify-center mb-1 text-center text-indigo-700 sm:text-2xl font-Roboto">
                                    Phase 0: {currentPhase}
                                </div>
                            </Link>
                        </div>
                        <div>
                            <AlphaTesting />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Home
