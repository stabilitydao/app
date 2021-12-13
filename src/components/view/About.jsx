import React from 'react'
import contributors from "@/src/constants/contributors.json";
import {useGetContributorsQuery} from "@/redux/slices/contributorsApi";
import {GoLocation} from "react-icons/go";
import Link from "next/link";
import {currentPhase} from "@/src/components/view/Development";

function UserData(name) {
    const { data } = useGetContributorsQuery(name)
    return data
}

function About() {
    const contributorsData = contributors.map((name) => {
        return UserData(name)
    })

    return (
        <section className=" h-calc">
            <div className="container p-4">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Meet Stability</h1>
                <div className="">
                    <div>
                        <article className="flex flex-col items-center mb-10 max-w-3xl mx-auto text-center">
                            <img src="/logo.svg" alt="logo" width={512} height={512} />
                            <div className="text-center mb-10">
                                <h2 className="text-5xl mb-5">Revenue generation</h2>
                                <p className="mt-0 mb-4 text-lg leading-normal text-left">
                                    Stability is decentralized financial platform for generating income in blockchain networks and distributing it among participants.
                                </p>
                            </div>
                        </article>
                        <article className="mb-10 max-w-3xl mx-auto text-center">
                            <h2 className="text-5xl mb-5">Team</h2>
                            <div className="relative py-4 overflow-hidden rounded-xl text-left px-8">
                                <div className="flex flex-col flex-wrap mb-6 text-lg">
                                    <div className="flex flex-wrap w-full mb-10 justify-between">
                                        <div className="w-full md:w-1/3 flex self-center justify-center w-full text-center h-52 ">
                                            <div className="relative flex flex-col self-center justify-center w-32 h-32 text-5xl bg-indigo-200 border-2 rounded-full dark:border-indigo-500 dark:bg-indigo-800">
                                                {contributorsData ? contributorsData.length : null}
                                                <span className="mt-1 text-xs font-bold" >builders</span>
                                            </div>
                                        </div>
                                        <div className="md:w-2/3 flex">
                                            Stability Builders are skilled individuals who directly contribute to the advancement of the entire ecosystem. These include github contributors (open-source developers), expert researchers from a variety of fields, top public relations & marketing personnel, and cybersecurity specialists.<br />
                                            Governance will be tasked with creating the optimal conditions that allow these highly qualified contributors to build and improve upon the protocol at maximum efficiency.
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="flex flex-wrap justify-center">
                                            {contributorsData.map((data, index) => {
                                                return data ? (
                                                    <a
                                                        title={`Go to ${data.name}'s GitHub profile`}
                                                        href={data.html_url}
                                                        rel="noreferrer"
                                                        target="_blank"
                                                        key={index}
                                                        className="w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 dark:hover:bg-gray-800 rounded-2xl"
                                                    >
                                                        <div className="px-5 pt-5 text-sm w-100 ">
                                                            <div className="flex-shrink-0">
                                                                <div  className="relative block">
                                                                    <img alt="profil"
                                                                         src={data.avatar_url}
                                                                         className="object-cover w-24 h-24 mx-auto rounded-full "/>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col justify-center mt-5">
                                                                <p className="text-xl font-bold text-center">
                                                                    {data.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col justify-center pl-5 my-1 text-sm">
                                                            {data.location ? (
                                                                <div className="flex align-middle">
                                                                    <GoLocation className="mt-1"/>
                                                                    <div className="ml-1.5 text-md line flex flex-wrap">{data.location}</div>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="px-5 mt-1 mb-5 text-xs ">
                                                            <p className="overflow-hidden">
                                                                {data.bio ? data.bio.substring(0,80) : null}
                                                            </p>
                                                        </div>
                                                    </a>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About