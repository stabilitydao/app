import React from 'react'
import Link from 'next/link'
import {currentPhase, phaseTasks} from "@/components/pages/Roadmap";
import {TiTick} from "react-icons/ti";
import contributors from "@/components/constants/contributors.json";
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
        <section className="dark:bg-black dark:text-white h-calc">
            <div className="container w-11/12 pb-32">
                <div className="max-w-lg mx-auto mb-20">
                    <img src="/logo.svg" alt="logo" />
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
                <div className="w-full flex flex-wrap">
                    <Link href="/roadmap">
                        <div className="flex flex-col w-full sm:w1/2 md:w-1/3 rounded-3xl dark:hover:bg-gray-900 cursor-pointer mb-4">
                            <div className="flex justify-center text-4xl text-center mt-6 mb-4">Roadmap</div>
                            <div>
                                <div className="flex justify-center text-center items-center mb-1 sm:text-3xl font-Roboto text-indigo-700">
                                    Phase 0: {currentPhase}
                                </div>
                                <div>
                                    <div className="p-3 pt-0 mb-6">
                                        <ul className="text-lg font-semibold ">
                                            {
                                                Object.keys(phaseTasks[0]).map((task, value) => {
                                                    return phaseTasks[0][task] ? <li className="pl-8 relative" key={value}><TiTick className="absolute left-2 inline  top-0.5 text-2xl text-teal-500" /><span dangerouslySetInnerHTML={{__html: task}} /></li> : <li className="pl-8" key={value}><span dangerouslySetInnerHTML={{__html: task}} /></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/ecosystem">
                        <div className="flex flex-col w-full sm:w1/2 md:w-1/3 rounded-3xl dark:hover:bg-gray-900 cursor-pointer mb-4">
                            <div className="flex justify-center text-4xl text-center mt-6 mb-3">Tokenomics</div>
                            <div className="flex justify-center text-center items-center sm:text-4xl font-Roboto text-indigo-700 items-center pb-10">
                                <img src="/profit.svg" alt="profit" width="100" className="float-left mt-12 self-center" />
                            </div>
                        </div>
                    </Link>
                    <Link href="/ecosystem#team">
                        <div className="flex flex-col w-full sm:w1/2 md:w-1/3 rounded-3xl dark:hover:bg-gray-900 cursor-pointer mb-4">
                            <div className="flex justify-center text-4xl text-center mt-6 mb-4">Team</div>
                            <div className="flex justify-center text-center items-center sm:text-4xl font-Roboto text-indigo-700 items-center pb-10">
                                <div className="flex flex-wrap justify-center">
                                    {contributorsData.map((data, index) => {
                                        return data ? (
                                            <div
                                                key={index}
                                                className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4"
                                            >
                                                <div className="w-100 px-5 pt-5 text-sm ">
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
