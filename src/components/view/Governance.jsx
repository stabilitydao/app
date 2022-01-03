import React, { useEffect, useState }  from 'react'
import {networks} from "@/src/wallet";
import {gov, tl, splitter} from "@/src/wallet";
import {useWeb3React} from "@web3-react/core";
import {useSelector} from "react-redux";
import WEB3 from "@/src/functions/web3";
import tokenAbi from "@/src/abis/tokenAbi.json";
import govAbi from "@/src/abis/govAbi.json";
import splitterAbi from "@/src/abis/splitterAbi.json";
import addresses from "@stabilitydao/addresses";

function Governance() {
    const { chainId } = useWeb3React()
    const web3 = WEB3()
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId && networks[chainId] ? chainId : currentNetwork
    const [shares, setShares] = useState({
        div: '-',
        gov: '-',
        dev: '-',
    })
    const [treasureBalances, setTreasureBalances] = useState({})
    const [govSettings, setGovSettings] = useState({
        quorum: '-',
        votingDelay: '-',
        votingPeriod: '-',
        proposalThreshold: '-',
    })


    useEffect(async () => {
        if (network && web3 && await web3.eth.net.isListening()) {
            let contract

            if (gov[network]) {
                contract = new web3.eth.Contract(tokenAbi, addresses[network].token);

                const totalSupply = await contract.methods.totalSupply().call()

                contract = new web3.eth.Contract(govAbi, gov[network]);

                const
                    quorumRow = await contract.methods.quorum(await web3.eth.getBlockNumber() - 1).call(),
                    quorumPerc = Math.round(100* 100 * quorumRow / totalSupply ) / 100,
                    votingDelay = await contract.methods.votingDelay().call(),
                    votingDelayHours = Math.round(votingDelay * networks[network].blocktimeAvgSec / 3600),
                    votingDelayMins = Math.round(votingDelay * networks[network].blocktimeAvgSec / 60),
                    votingDelayText = votingDelayHours ? `${votingDelayHours} hours` : `${votingDelayMins} mins`,
                    votingPeriod = await contract.methods.votingPeriod().call(),
                    votingPeriodHours = Math.round(votingPeriod * networks[network].blocktimeAvgSec / 3600),
                    votingPeriodMins = Math.round(votingPeriod * networks[network].blocktimeAvgSec / 60),
                    votingPeriodText = votingPeriodHours ? `${votingPeriodHours} hours` : `${votingPeriodMins} mins`,
                    proposalThreshold = await contract.methods.proposalThreshold().call(),
                    proposalThresholdPerc = Math.round(100* 100 * proposalThreshold / totalSupply ) / 100

                    setGovSettings({
                    quorum: `${web3.utils.fromWei(quorumRow)} votes / ${quorumPerc}%`,
                    votingDelay: `${votingDelay} blocks / ${votingDelayText}`,
                    votingPeriod: `${votingPeriod} blocks / ${votingPeriodText}`,
                    proposalThreshold: `${web3.utils.fromWei(proposalThreshold)} votes / ${proposalThresholdPerc}%`,
                })
            } else {
                setGovSettings({
                    quorum: '-',
                    votingDelay: '-',
                    votingPeriod: '-',
                    proposalThreshold: '-',
                })
            }

            if (splitter[network]) {
                contract = new web3.eth.Contract(splitterAbi, splitter[network]);

                setShares({
                    div: `${await contract.methods.div().call()}%`,
                    gov: `${await contract.methods.gov().call()}%`,
                    dev: `${await contract.methods.dev().call()}%`,
                })
            } else {
                setShares({
                    div: '-',
                    gov: '-',
                    dev: '-',
                })
            }

            const balances = {}

            if (tl[network]) {
                contract = new web3.eth.Contract(tokenAbi, addresses[network].weth);
                const wethBal = await contract.methods.balanceOf(tl[network]).call()
                if (wethBal > 0) {
                    balances.weth = web3.utils.fromWei(wethBal)
                }

                if (addresses[network].token) {
                    contract = new web3.eth.Contract(tokenAbi, addresses[network].token);
                    const profitBal = await contract.methods.balanceOf(tl[network]).call()
                    if (profitBal > 0) {
                        balances.profit = web3.utils.fromWei(profitBal)
                    }
                }
            }

            setTreasureBalances(balances)
        }
    }, [network]);

    return (
        <section className=" h-calc">
            <div className="container p-4">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Governance</h1>
                <div className="max-w-2xl mx-auto">
                    <article className="mb-8">
                        <div className="py-4 mb-2">
                            <div className="mb-4 flex justify-between items-center flex-wrap">
                                <h2 className="text-3xl sm:text-4xl font-Roboto">Gov</h2>
                                <a className=" flex justify-center h-9 items-center" title="View contract on blockchain explorer" target="_blank" href={`${networks[network].explorerurl}address/${gov[network]}`} rel="noopener noreferrer">
                                    <span style={ networks[network].testnet && { color: networks[network].color }} className="flex font-bold justify-center text-xs md:text-sm self-center dark:text-teal-400">{gov[network]}</span>
                                </a>
                            </div>
                            <p className="text-lg">
                                PROFIT token holders with sufficient voting power can directly participate in the governance of the Stability protocol. These will be the only investors who can collectively change the organization’s resource distribution (mentioned below) and participate in critical decision-making processes involving the direction of the entire ecosystem.
                            </p>
                        </div>
                        <div className="mb-4">
                            <table>
                                <thead>
                                <tr>
                                    <td className="pb-2 text-xl font-bold" colSpan={2}>Governance settings</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="w-48">Quorum</td>
                                    <td>{govSettings.quorum}</td>
                                </tr>
                                <tr>
                                    <td>Voting delay</td>
                                    <td>{govSettings.votingDelay}</td>
                                </tr>
                                <tr>
                                    <td>Voting period</td>
                                    <td>{govSettings.votingPeriod}</td>
                                </tr>
                                <tr>
                                    <td>Proposal threshold</td>
                                    <td>{govSettings.proposalThreshold}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="py-1">
                            <div className="dark:text-blue-800 text-2xl font-bold">Voting user interface is under active development</div>
                        </div>
                    </article>
                    <article className="mb-8">
                        <div className="py-4">
                            <div className="mb-4 flex justify-between items-center flex-wrap">
                                <h2 className="text-3xl sm:text-4xl font-Roboto ">Treasure</h2>
                                <a className=" flex justify-center h-9 items-center" title="View contract on blockchain explorer" target="_blank" href={`${networks[network].explorerurl}address/${tl[network]}`} rel="noopener noreferrer">
                                    <span style={ networks[network].testnet && { color: networks[network].color }} className="flex justify-center text-xs md:text-sm self-center dark:text-teal-400">{tl[network]}</span>
                                </a>
                            </div>
                            <p className="text-lg">
                                Treasure assets are balances of tokens on governance timelock contract address. <br />
                                Governance timelock controller adds execution delay to each successed proposal, manages DAO assets and protocol access rights.
                            </p>
                            <p className="text-xl mt-2">
                                <span className="mr-2">Treasure balance:</span> {Object.keys(treasureBalances).length ? Object.keys(treasureBalances).map(cur => {
                                    return (
                                        <span className="mr-2" key={cur}>{treasureBalances[cur]} {cur.toUpperCase()}</span>
                                    )
                            }) : '-'}
                            </p>
                        </div>
                    </article>
                    <article className="mb-8">
                        <div className="py-4">
                            <div className="mb-4 flex justify-between items-center flex-wrap">
                                <h2 className="text-3xl sm:text-4xl font-Roboto ">Splitter</h2>
                                {splitter[network] &&
                                    <a className=" flex justify-center h-9 items-center" title="View contract on blockchain explorer" target="_blank" href={`${networks[network].explorerurl}address/${splitter[network]}`} rel="noopener noreferrer">
                                        <span style={ networks[network].testnet && { color: networks[network].color }} className="flex justify-center text-xs md:text-sm self-center dark:text-teal-400">{splitter[network]}</span>
                                    </a>
                                }
                            </div>
                            <p className="text-lg mb-6">
                                All profits generated by the organization through <i>Profit Generation</i> are divided between dividend token holders, governance and the development fund. Governance can change this allocation by following the criteria below:
                            </p>
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
                                    <td className="py-1 font-bold text-center">{shares.div}</td>
                                    <td className="py-1 text-right whitespace-nowrap">10% - 60%</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Governance</td>
                                    <td className="py-1 pl-1">Treasure</td>
                                    <td className="py-1 font-bold text-center">{shares.gov}</td>
                                    <td className="py-1 text-right whitespace-nowrap">10% - 60%</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Builders</td>
                                    <td className="py-1 pl-1">DevFund</td>
                                    <td className="py-1 font-bold text-center">{shares.dev}</td>
                                    <td className="py-1 text-right whitespace-nowrap">10% - 60%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Governance