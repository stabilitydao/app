import React from 'react'

function Governance() {
    return (
        <section className=" h-calc">
            <div className="container p-4">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Governance</h1>
                <div className="max-w-2xl mx-auto">
                    <div>
                        <article className="mb-8">
                            <div className="py-4">
                                <h2 className="mb-4 text-3xl sm:text-4xl font-Roboto ">On-chain voting</h2>
                                <p className="text-lg">
                                    PROFIT token holders with sufficient voting power can directly participate in the governance of the Stability protocol. These will be the only investors who can collectively change the organization’s resource distribution (mentioned below) and participate in critical decision-making processes involving the direction of the entire ecosystem.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="max-w-2xl mx-auto">
                    <article >
                        <div className="w-full mb-7">
                            <h2 className="mb-4 text-3xl sm:text-4xl font-Roboto ">Resource distribution</h2>
                            <p className="text-lg">
                                All profits generated by the organization through <i>Profit Generation</i> are divided between dividend token holders, governance and the development fund. Governance can change this allocation by following the criteria below:
                            </p>
                        </div>
                        <table className="w-full mx-auto text-sm table-auto bg-blend-darken md:text-xl">
                            <thead>
                            <tr>
                                <th className="w-1/4 text-left">Target</th>
                                <th className="w-1/4">Contract</th>
                                <th className="w-1/4 text-center">Current share</th>
                                <th className="w-1/4 text-right">Limits</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="py-1">Dividends</td>
                                <td className="py-1 pl-1">EtherPayer</td>
                                <td className="py-1 font-bold text-center">48%</td>
                                <td className="py-1 text-right whitespace-nowrap">10% - 90%</td>
                            </tr>
                            <tr>
                                <td className="py-1">Governance</td>
                                <td className="py-1 pl-1">Gov</td>
                                <td className="py-1 font-bold text-center">48%</td>
                                <td className="py-1 text-right whitespace-nowrap">10% - 90%</td>
                            </tr>
                            <tr>
                                <td className="py-1">Builders</td>
                                <td className="py-1 pl-1">DevFund</td>
                                <td className="py-1 font-bold text-center">4%</td>
                                <td className="py-1 text-right whitespace-nowrap">1% - 50%</td>
                            </tr>
                            </tbody>
                        </table>
                    </article>
                </div>
            </div>

        </section>
    )
}

export default Governance