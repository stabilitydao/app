import React from 'react'

function Generation() {
    return (
        <section className="dark:bg-black dark:text-white h-calc">
            <div className="container p-4">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Generation</h1>
                <div className="">
                    <div>
                        <article className="mb-10">
                            <a className="py-4 overflow-hidden rounded-xl lg:p-6 ">
                                <h1 className="mb-4 text-4xl sm:text-5xl font-Roboto ">Generators</h1>
                                <p className="text-lg">
                                    <i>Profit Generation</i> is a broad term that encapsulates the process of delivering through developments a high level of value that’s necessary to earn profits. The process involves <i>Stability Builders</i> creating work units (smart contracts and decentralized applications) that become property of the Stability protocol and will essentially work for it. Clusters of work units (e.g. yield farms with a variety of features, AMMs, NFTs, etc.) being utilized in the same area are called <i>Profit Generators</i>.
                                </p>
                            </a>
                        </article>
                    </div>
                    <div>
                        <article>
                            <a className="py-4 overflow-hidden rounded-xl lg:p-6 ">
                                <h1 className="mb-4 text-4xl sm:text-5xl font-Roboto ">Resource distribution</h1>
                                <p className="text-lg">
                                    All profits generated by the organization through <i>Profit Generation</i> are divided between the token stakers, the development fund, and non-profit activities. Governance can change this allocation by following the criteria below:
                                </p>
                            </a>
                            <table className="text-sm table-auto bg-blend-darken lg:mx-8 md:text-xl">
                                <thead>
                                <tr>
                                    <th className="w-1/4">Profit Earner</th>
                                    <th className="w-1/4">Contract</th>
                                    <th className="w-1/4 text-center">Current share</th>
                                    <th className="w-1/4 text-right">Limits</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="py-1">Stakers</td>
                                    <td className="py-1">Pool</td>
                                    <td className="py-1 font-bold text-center">97%</td>
                                    <td className="py-1 text-right whitespace-nowrap">50% - 99%</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Builders</td>
                                    <td className="py-1">Development Fund</td>
                                    <td className="py-1 font-bold text-center">2.5%</td>
                                    <td className="py-1 text-right whitespace-nowrap">1% - 50%</td>
                                </tr>
                                <tr>
                                    <td className="py-1">People in need</td>
                                    <td className="py-1">Non-profit Fund</td>
                                    <td className="py-1 font-bold text-center">0.5%</td>
                                    <td className="py-1 text-right whitespace-nowrap">0.5% - 25%</td>
                                </tr>
                                </tbody>
                            </table>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Generation
