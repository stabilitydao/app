import React from 'react'
import {BsDot} from 'react-icons/bs'

function Roadmap() {
    return (
        <section className="dark:bg-black dark:text-white h-calc">
            <div className="container w-11/12 py-8">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Roadmap</h1>
                <div className="max-w-lg mx-auto">
                    <div className="p-2">
                        <div className="flex flex-row mb-2">
                            <BsDot
                                className="relative text-4xl text-indigo-500 border-2 border-indigo-500 rounded-full -left-4"/>
                            <h1 className="text-3xl font-Roboto">Phase 0: Inception</h1>
                        </div>
                        <div className="p-3 border-l-2 border-indigo-500">
                            <ul className="text-lg font-semibold ">
                                {
                                    [
                                        "Community",
                                        "White Paper",
                                        "Core contracts",
                                        "Testnet deployments to Goerli, FUJI, Mumbai",
                                        "App",
                                        "Audits",
                                        "Mainnet deployments to Ethereum, Avalanche, Polygon",
                                    ].map((data, index) => {
                                        return <li key={index}>{data}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="flex flex-row mb-2">
                            <BsDot
                                className="relative text-4xl text-indigo-500 border-2 border-indigo-500 rounded-full -left-4"/>
                            <h1 className="text-3xl font-Roboto">Phase 1: Bootstrapping</h1>
                        </div>
                        <div className="p-3 border-l-2 border-indigo-500">
                            <ul className="text-lg font-semibold ">
                                {
                                    [
                                        "Liquidity Bootstrapping (IDO)",
                                        "Formation of Governance",
                                        "Yield Profit Generator (Minting Farm projects conveyor)",
                                        "Development Matrix",
                                    ].map((data, index) => {
                                        return <li key={index}>{data}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="flex flex-row mb-2">
                            <BsDot
                                className="relative text-4xl text-indigo-500 border-2 border-indigo-500 rounded-full -left-4"/>
                            <h1 className="text-3xl font-Roboto">Phase 2: Generation</h1>
                        </div>
                        <div className="p-3 border-l-2 border-indigo-500">
                            <ul className="text-lg font-semibold ">
                                {
                                    [
                                        "Incubator construction",
                                        "Building of Generators",
                                        "Stable cross-chain Profit Generation",
                                        "Stability Fund Development (decentralized Improvement fund)",
                                    ].map((data, index) => {
                                        return <li key={index}>{data}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="flex flex-row mb-2">
                            <BsDot
                                className="relative text-4xl text-indigo-500 border-2 border-indigo-500 rounded-full -left-4"/>
                            <h1 className="text-3xl font-Roboto">Phase 3: Improvement</h1>
                        </div>
                        <div className="p-3 border-l-2 border-indigo-500">
                            <ul className="text-lg font-semibold ">
                                {
                                    [
                                        "Development of xUnits (offline business managed by DAO through Validators)",
                                        "TaxPayer company boilerplate",
                                        "Improvement network",
                                        "Stable Planet Improvement",
                                    ].map((data, index) => {
                                        return <li key={index}>{data}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Roadmap
