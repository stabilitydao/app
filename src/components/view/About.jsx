import React from 'react'
import { useGetMembersQuery } from "@/redux/slices/membersApi";
import { GoLocation } from "react-icons/go";
import { BsCheck } from "react-icons/bs";

function UserData(name) {
    const { data } = useGetMembersQuery(name)
    return data
}

function Team({ membersName }) {
    const membersData = membersName.map((name) => {
        return UserData(name)
    })

    return (
        <section className=" h-calc">
            <div className="container p-4 pt-24 lg:pt-0">
                <div className="">
                    <div>
                        <article className="mb-10 max-w-3xl mx-auto text-center">
                            <h2 className="text-5xl mb-5">Team</h2>
                            <div className="relative py-4 overflow-hidden rounded-xl text-left px-8">
                                <div className="flex flex-col flex-wrap mb-6 text-lg">
                                    <div className="flex flex-wrap w-full mb-10 justify-between">
                                        <div className="w-full md:w-1/3 flex self-center justify-center w-full text-center h-52 ">
                                            <div className="relative flex flex-col self-center justify-center w-32 h-32 text-5xl bg-indigo-200 border-2 rounded-full dark:border-indigo-500 dark:bg-indigo-800">
                                                {membersData ? membersData.length : null}
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
                                            {membersData && membersData.map((data, index) => {
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
                                                                <div className="relative block">
                                                                    <img alt="profil"
                                                                        src={data.avatar_url}
                                                                        className="object-cover w-24 h-24 mx-auto rounded-full " />
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
                                                                    <GoLocation className="mt-1" />
                                                                    <div className="ml-1.5 text-md line flex flex-wrap">{data.location}</div>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="px-5 mt-1 mb-5 text-xs ">
                                                            <p className="overflow-hidden">
                                                                {data.bio ? data.bio.substring(0, 80) : null}
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

export default Team