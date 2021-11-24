import React from 'react'
import { BiCircle } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti'

export const currentPhase = "Inception";

export const phases = {
    "Inception": "Q4 2021",
    "Bootstrapping": "2022",
    "Generation": "2023",
    "Improvement": "2024",
};

export const phaseTasks = [
    {
        "Developer community <a href=\"https://t.me/chainbuilders\" target=\"_blank\" className=\"pl-1\">@chainbuilders</a>": true,
        "User community <a href=\"https://t.me/stabilitydao\" target=\"_blank\" className=\"pl-1\">@stabilitydao</a>": true,
        "Stability (PROFIT) token <a href=\"https://etherscan.io/token/0x3fa5F9c876BEbB41B8924633850b1a9922f7E4F9\" target=\"_blank\" className=\"pl-1\">0x3f..F9</a>": true,
        "White Paper": false,
        "App": false,
    },
    {
        "Liquidity bootstrapping (IDO)": false,
        "Bridging token to target chains": false,
        "Governance": false,
        "Staking pool": false,
        "Development Matrix": false,
        "AMM": false,
        "Yield farm project": false,
        "NFT minting project": false,
        "DeX trading bot": false,
        "Building projects in accordance with Matrix": false,
    },
    {
        "Incubator construction": false,
        "Minting farm projects conveyor": false,
        "NFT projects conveyor": false,
        "DeX mechanical trading system": false,
        "Arbitrage protocol": false,
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
                                                    return phaseTasks[index][task] ? <li className="pl-8 relative" key={value}><TiTick className="absolute left-2 inline  top-0.5 text-2xl text-teal-500" /><span dangerouslySetInnerHTML={{__html: task}} /></li> : <li className="pl-8" key={value}><span dangerouslySetInnerHTML={{__html: task}} /></li>
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
