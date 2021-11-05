import React from 'react'
import { BiCircle } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti'

const currentPhase = "Inception";

const phases = {
    "Inception": "Q4 2021",
    "Bootstrapping": "2022",
    "Generation": "2023",
    "Improvement": "2024",
};

const phaseTasks = [
    {
        "Blockchain developer community <a href=\"https://t.me/chainbuilders\" target=\"_blank\" className=\"pl-1 underline\" >@chainbuilders</a>": true,
        "White Paper": false,
        "Core contracts": false,
        "App": false,
        "Testnet deployments": false,
        "Security audits": false,
        "Mainnet deployments": false,
    },
    {
        "Liquidity bootstrapping (IDO)": false,
        "Development Matrix": false,
        "Formation of Governance": false,
        "Yield farm project": false,
        "NFT marketplace project": false,
        "DeX trading bot": false,
        "Building projects in accordance with Matrix": false,
    },
    {
        "Incubator construction": false,
        "Yield Profit Generator (minting farm projects conveyor)": false,
        "NFT Profit Generator (NFT projects conveyor)": false,
        "DeX Profit Generator (mechanical trading system, arbitrage protocol)": false,
        "Building Generators in accordance with Matrix": false,
        "Improvement Fund (decentralized non-profit fund)": false,
        "NFT game project": false,
        "Chain boilerplate": false,
    },
    {
        "Development of xUnits (offline business managed by DAO through Validators)": false,
        "TaxPayer company boilerplate": false,
        "Improvement network": false,
        "Stable Planet Improvement": false,
    },
];

function Roadmap() {
    return (
        <section className="dark:bg-black dark:text-white h-calc">
            <div className="container w-11/12 py-8">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Roadmap</h1>
                <div className="max-w-lg mx-auto">
                    {
                        Object.keys(phases).map((name, index) => {
                            return (
                                <div className="p-2" key={index}>
                                    <div className="flex flex-row mb-2 relative">
                                        <BiCircle className="relative p-1 text-4xl text-indigo-500 bg-indigo-500 border-2 border-indigo-500 rounded-full bg-clip-content -left-4" />
                                        {currentPhase === name ? (
                                            <div>
                                                <h1 className="text-3xl text-indigo-500 font-bold font-Roboto">Phase {index}: {name}</h1>
                                                <div className="absolute right-0 top-1 text-indigo-500 font-bold text-2xl" >{phases[name]}</div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h1 className="text-3xl font-Roboto">Phase {index}: {name}</h1>
                                                <div className="absolute right-0 top-1 font-bold text-2xl" >{phases[name]}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 border-l-2 border-indigo-500">
                                        <ul className="text-lg font-semibold ">
                                            {
                                                Object.keys(phaseTasks[index]).map((task, value) => {
                                                    return phaseTasks[index][task] ? <li className="pl-0.5" key={value}><TiTick className="inline pb-1 text-3xl text-teal-500" /><span dangerouslySetInnerHTML={{__html: task}} /></li> : <li className="pl-8" key={value}><span dangerouslySetInnerHTML={{__html: task}} /></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Roadmap
