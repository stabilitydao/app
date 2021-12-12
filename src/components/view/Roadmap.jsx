import React from 'react'
import { TiTick } from 'react-icons/ti'

export const currentPhase = "Inception";

export const phases = {
    "Inception": "Q4 2021",
    "Bootstrapping": "2022",
    "Generation": "2023-2028",
    "Improvement": "2029",
};

export const phaseTasks = [
    {
        "Developer community <a href=\"https://t.me/chainbuilders\" target=\"_blank\" className=\"pl-1\">@chainbuilders</a>": true,
        "User community <a href=\"https://t.me/stabilitydao\" target=\"_blank\" className=\"pl-1\">@stabilitydao</a>": true,
        "Stability (PROFIT) token <a href=\"https://etherscan.io/token/0x3fa5F9c876BEbB41B8924633850b1a9922f7E4F9\" target=\"_blank\" className=\"pl-1\">0x3f..F9</a>": true,
        "Dividend payer": false,
        "White paper": false,
        "App": false,
    },
    {
        "Liquidity bootstrapping (IDO)": false,
        "Bridging token to target chains": false,
        "Governance": false,
        "AMM V1": false,
        "NFT marketplace": false,
        "DeX arbitrage bot": false,
        "Development Matrix": false,
    },
    {
        "Incubator construction": false,
        "DAO factory": false,
        "Cross-chain swap": false,
        "DeX aggregator": false,
        "Yield projects conveyor": false,
        "Arbitrage protocol": false,
        "DeX mechanical trading system": false,
        "NFT game project": false,
        "Chain boilerplate": false,
        "Building Generators in accordance with Matrix": false,
        "Improvement Fund (decentralized non-profit fund)": false,
    },
    {
        "Development of xUnits (offline business managed by DAO through validators)": false,
        "TaxPayer company boilerplate": false,
        "Improvement network": false,
        "Stable Planet Improvement": false,
    },
];

function Roadmap() {
    return (
        <section className=" h-calc">
            <div className="container p-4 pt-8">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Roadmap</h1>
                <div className="max-w-lg mx-auto">
                    {
                        Object.keys(phases).map((name, index) => {
                            return (
                                <div className="py-2 my-6" key={index}>
                                    <div className="flex flex-row mb-2">
                                        {currentPhase === name ? (
                                            <div className="flex justify-between items-center w-full flex-wrap">
                                                <h1 className="text-2xl sm:text-3xl font-bold text-indigo-500 font-Roboto">Phase {index}: {name}</h1>
                                                <div className="text-2xl sm:text-3xl text-indigo-500" >{phases[name]}</div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center w-full flex-wrap">
                                                <h1 className="text-2xl sm:text-3xl font-bold dark:text-gray-200">Phase {index}: {name}</h1>
                                                <div className="text-2xl sm:text-3xl" >{phases[name]}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="pb-3 pt-1">
                                        <ul className="text-lg font-semibold dark:text-gray-200">
                                            {
                                                Object.keys(phaseTasks[index]).map((task, value) => {
                                                    return phaseTasks[index][task] ? <li className="relative py-0.5 pl-5" key={value}><TiTick className="absolute -left-1.5 inline  top-1 text-2xl text-teal-500" /><span dangerouslySetInnerHTML={{__html: task}} /></li> : <li className="py-0.5 pl-5" key={value}><span dangerouslySetInnerHTML={{__html: task}} /></li>
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
