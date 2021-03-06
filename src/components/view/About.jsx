import React from 'react'
import { useGetMembersQuery } from "@/redux/slices/membersApi";
import { GoLocation } from "react-icons/go";
import { BsCheck } from "react-icons/bs";

function UserData(name) {
    const { data } = useGetMembersQuery(name)
    return data
}

function About({ membersName }) {
    const membersData = membersName.map((name) => {
        return UserData(name)
    })

    return (
        <section className=" h-calc">
            <div className="container p-4 pt-24 lg:pt-0">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Meet StabilityDAO</h1>
                <div className="">
                    <div>
                        <article className="flex flex-col items-center mb-10 max-w-3xl mx-auto text-center">
                            <img src="/logo.svg" alt="logo" width={512} height={512} />
                            <div className="text-center mb-10">
                                <h2 className="text-5xl mb-5">Revenue generation</h2>
                                <p className="mt-0 mb-4 text-lg leading-normal text-left">
                                    Stability is profit generating and distributing decentralized organization.<br />
                                    The main source of revenue is working Units - DeFi projects that generate income in blockchain networks.
                                </p>
                            </div>
                            <div className='mb-10 text-center'>
                                <h2 className="text-5xl mb-5">How it works?</h2>
                                <img src="/revenue.png" alt="revenue" className='w-full h-auto' />
                                <a href="/litepaper.pdf" target="_blank" rel="nofollow" className="">
                                    <div className="w-60  my-8 h-10 dark:bg-indigo-800 dark:text-white dark:border-[#4e1173] py-0.5 px-4 rounded-xl cursor-pointer flex items-center justify-center mb-1 text-center text-indigo-700 text-lg font-Roboto mx-auto">
                                        Litepaper
                                    </div>
                                </a>
                            </div>
                        </article>
                        <article className="flex flex-col items-center mb-10 max-w-3xl mx-auto text-center">
                            <div className="container mb-10">
                                <h2 className="text-center text-5xl mb-10">Roadmap</h2>
                                <div className="flex md:px-6 max-w-5xl mx-auto text-left">
                                    <div className="flex flex-col w-1/3">
                                        <div className="flex h-12 text-2xl font-bold">
                                            Q4 2021
                                        </div>
                                        <div className="flex flex-col text-lg">
                                            <div className="relative flex items-center"><BsCheck className="absolute -left-6 text-2xl text-teal-400" />Tokens</div>
                                            <div className="relative flex items-center"><BsCheck className="absolute -left-6 text-2xl text-teal-400" />Staking</div>
                                            <div className="relative flex items-center"><BsCheck className="absolute -left-6 text-2xl text-teal-400" />Dividends</div>
                                            <div className="relative flex items-center"><BsCheck className="absolute -left-6 text-2xl text-teal-400" />App</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-1/3">
                                        <div className="flex h-12 text-2xl font-bold">
                                            Q1 2022
                                        </div>
                                        <div className="flex flex-col text-lg items-start">
                                            <div className="relative flex items-center"><BsCheck className="absolute -left-6 text-2xl text-teal-400" />Splitter</div>
                                            <div className="relative flex items-center"><BsCheck className="absolute -left-6 text-2xl text-teal-400" /><a href="/litepaper.pdf" target="_blank" className='underline' rel="nofollow">Litepaper</a></div>
                                            <div className="flex relative">
                                                <BsCheck className="absolute -left-6 text-2xl text-teal-400" />
                                                <img src="/pm.png" alt="Rarest" className="self-center w-5 h-5 mr-2" />
                                                Profit Maker
                                            </div>
                                            <div className="relative"><BsCheck className="absolute -left-6 text-2xl text-teal-400" />Governance</div>
                                            <div className="relative"><BsCheck className="absolute -left-6 text-2xl text-teal-400" />Treasury</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-1/3">
                                        <div className="flex h-12 text-2xl font-bold">
                                            Q2 2022
                                        </div>
                                        <div className="flex flex-col text-lg items-start">
                                            <div className="relative"><BsCheck className="absolute -left-6 text-2xl text-teal-400" />RevenueRouter</div>
                                            <div className="relative flex">
                                                <img src="/reactswap.png" alt="Rarest" className="self-center w-5 h-5 mr-2" />
                                                <div className="flex font-bold">
                                                    MVP-1
                                                </div>
                                            </div>
                                            <div>Farm</div>
                                            <div>SDIV burns</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-1/3">
                                        <div className="flex h-12 text-2xl font-bold">
                                            2022+
                                        </div>
                                        <div className="flex flex-col text-lg">
                                            <div className="relative flex">
                                                <img src="/reactswap.png" alt="Rarest" className="self-center w-5 h-5 mr-2" />
                                                <div className="flex font-bold">
                                                    MVP-2
                                                </div>
                                            </div>
                                            <div className="relative flex">
                                                <img src="/reactswap.png" alt="Rarest" className="self-center w-5 h-5 mr-2" />
                                                <div className="flex font-bold">
                                                    MVP-3
                                                </div>
                                            </div>
                                            <div className="relative flex">
                                                <img src="/reactswap.png" alt="Rarest" className="self-center w-5 h-5 mr-2" />
                                                <div className="flex font-bold">
                                                    MVP-4
                                                </div>
                                            </div>
                                            <div className="relative flex">
                                                <img src="/reactswap.png" alt="Rarest" className="self-center w-5 h-5 mr-2" />
                                                <div className="flex font-bold">
                                                    MVP-5
                                                </div>
                                            </div>
                                            <a className="w-44 border-0 inline-flex justify-start" href="https://rarest.market" target="_blank" rel="noopener noreferrer">
                                                <img src="/rarest.png" alt="Rarest" className="self-center w-5 h-5 mr-2" />
                                                <div className="flex font-bold">
                                                    Rarest
                                                </div>
                                            </a>
                                            <div>Docs</div>
                                            <div>Development matrix</div>
                                            <div>Algorithmic stablecoin</div>
                                            <div>GameFi platform</div>
                                            <div>DAO factory</div>
                                            <div>Bridge</div>
                                            <div>DeX mechanical trading system</div>
                                            <div>EVM chain</div>
                                            <div>Building Generators in accordance with Matrix</div>
                                            <div>Improvement Fund (decentralized non-profit fund)</div>
                                            <div>Development of xUnits (offline business managed by DAO through validators)</div>
                                            <div>TaxPayer company boilerplate</div>
                                            <div>Improvement network</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </article>
                        <article className="flex flex-col items-center mb-10 max-w-3xl mx-auto text-center">
                            <div className="text-center mb-10">
                                <h2 className="text-5xl mb-5">Tokenomics</h2>
                                <p className="mt-0 mb-4 text-lg leading-normal text-left">
                                    We base native $PROFIT token on fair tokenomics and launch model without pre-sale, initial offering and funding.
                                    All entire supply goes to liquidity pools for public sale by Development Fund.
                                </p>
                                <div className="flex flex-col mt-0 mb-4 text-lg leading-normal text-center w-full">

                                    <h3 className="flex text-2xl font-bold mx-auto">Token distribution</h3>
                                    <ul className="text-left text-lg mx-auto py-2 font-bold">
                                        <li><span className="inline-flex w-16 justify-end mr-6">100%</span> in circulation</li>
                                        <li><span className="inline-flex w-16 justify-end mr-6">0%</span> team</li>
                                        <li><span className="inline-flex w-16 justify-end mr-6">0%</span> infrastructure</li>
                                        <li><span className="inline-flex w-16 justify-end mr-6">0%</span> partnership</li>
                                        <li><span className="inline-flex w-16 justify-end mr-6">0%</span> VC investors</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
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

export default About