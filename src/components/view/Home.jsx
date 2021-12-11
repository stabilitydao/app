import React from 'react'
import Link from 'next/link'
import {currentPhase, phaseTasks} from "@/src/components/view/Roadmap";
import {TiTick} from "react-icons/ti";
import contributors from "@/src/constants/contributors.json";
import {useGetContributorsQuery} from "@/redux/slices/contributorsApi";

function UserData(name) {
    const { data } = useGetContributorsQuery(name)
    return data
}

function Home() {
    const contributorsData = contributors.map((name) => {
        return UserData(name)
    });

    return (
        <section className="dark:bg-gradient-to-br dark:from-black dark:via-space dark:to-black dark:text-white h-calc">
            <div className="container p-4 pb-32">
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
                    </div>
                </div>
                <div className="flex flex-wrap w-full te justify-center">
                    <Link href="/roadmap">
                        <div className="flex flex-col w-full mb-4 cursor-pointer sm:w1/2 md:w-1/3 rounded-3xl dark:hover:bg-gray-900">
                            <div className="flex justify-center mt-6 mb-4 text-4xl text-center">Roadmap</div>
                            <div>
                                <div className="flex items-center justify-center mb-1 text-center text-indigo-700 sm:text-3xl font-Roboto">
                                    Phase 0: {currentPhase}
                                </div>
                                <div>
                                    <div className="p-3 pt-0 mb-6">
                                        <ul className="text-lg font-semibold ">
                                            {
                                                Object.keys(phaseTasks[0]).map((task, value) => {
                                                    return phaseTasks[0][task] ? <li className="relative pl-8" key={value}><TiTick className="absolute left-2 inline  top-0.5 text-2xl text-teal-500" /><span dangerouslySetInnerHTML={{__html: task}} /></li> : <li className="pl-8" key={value}><span dangerouslySetInnerHTML={{__html: task}} /></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/tokens">
                        <div className="flex flex-col w-full mb-4 cursor-pointer sm:w1/2 md:w-1/3 rounded-3xl dark:hover:bg-gray-900">
                            <div className="flex justify-center mt-6 mb-3 text-4xl text-center">Tokenomics</div>
                            <div className="flex items-center justify-center pb-10 text-center text-indigo-700 sm:text-4xl font-Roboto">
                                <img src="/profit.svg" alt="profit" width="100" className="self-center float-left mt-12 mx-4" />
                                <img src="/SDIV.svg" alt="SDIV" width="100" className="self-center float-left mt-12 mx-4" />
                            </div>
                        </div>
                    </Link>
                    <Link href="/pools">
                        <div className="flex flex-col w-full mb-4 cursor-pointer sm:w1/2 md:w-1/3 rounded-3xl dark:hover:bg-gray-900">
                            <div className="flex justify-center mt-6 mb-3 text-4xl text-center">Pools</div>
                            <div className="flex flex-col h-full items-center justify-center pb-10 text-center text-teal-700 sm:text-4xl font-Roboto">
                                <div className="self-center">Dividend Minter</div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/team">
                        <div className="flex flex-col w-full mb-4 cursor-pointer sm:w1/2 md:w-1/3 rounded-3xl dark:hover:bg-gray-900">
                            <div className="flex justify-center mt-6 mb-4 text-4xl text-center">Team</div>
                            <div className="flex items-center justify-center pb-10 text-center text-indigo-700 sm:text-4xl font-Roboto">
                                <div className="flex flex-wrap justify-center">
                                    {contributorsData.map((data, index) => {
                                        return data ? (
                                            <div
                                                key={index}
                                                className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4"
                                            >
                                                <div className="px-5 pt-5 text-sm w-100 ">
                                                    <div className="flex-shrink-0">
                                                        <div  className="relative block">
                                                            <img alt="profil"
                                                                 src={data.avatar_url}
                                                                 className="object-cover w-16 h-16 mx-auto rounded-full "/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Home
