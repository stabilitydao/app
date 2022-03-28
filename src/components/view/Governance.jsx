import React, { useEffect, useState } from 'react'
import { networks } from "@/src/wallet";
import { gov, tl, splitter, govData } from "@/src/wallet";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import WEB3 from "@/src/functions/web3";
import tokenAbi from "@/src/abis/tokenAbi.json";
import govAbi from "@/src/abis/govAbi.json";
import splitterAbi from "@/src/abis/splitterAbi.json";
import addresses from "@stabilitydao/addresses";
import {
    updateDelegateProfitToken, updateDelegateMakerToken
} from '@/redux/slices/modalsSlice'
function Governance() {
    const { account, chainId, library } = useWeb3React()
    const web3 = WEB3()
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId && networks[chainId] ? chainId : currentNetwork
    const [shares, setShares] = useState({
        div: '-',
        gov: '-',
        dev: '-',
    })
    const dispatch = useDispatch()
    const [treasureBalances, setTreasureBalances] = useState({})
    const [govSettings, setGovSettings] = useState({
        quorum: '-',
        votingDelay: '-',
        votingPeriod: '-',
        proposalThreshold: '-',
    })
    const [votingPower, setVotingPower] = useState(0)
    const IsDelegateProfitToken = useSelector(state => state.modals.value.IsDelegateProfitToken)
    const IsDelegateMakerToken = useSelector(state => state.modals.value.IsDelegateProfitToken)
    const rpcLib = chainId ? library : web3

    useEffect(async () => {
        if (rpcLib) {
            let contract

            if (gov[network]) {
                contract = new rpcLib.eth.Contract(tokenAbi, addresses[network].token);

                const totalSupply = await contract.methods.totalSupply().call()

                contract = new rpcLib.eth.Contract(govAbi, gov[network]);

                const blockNumber = await web3.eth.getBlockNumber() - 10

                const
                    quorumRow = await contract.methods.quorum(blockNumber).call(),
                    quorumPerc = Math.round(100 * 100 * quorumRow / totalSupply) / 100,
                    votingDelay = await contract.methods.votingDelay().call(),
                    votingDelayHours = Math.round(votingDelay * networks[network].blocktimeAvgSec / 3600),
                    votingDelayMins = Math.round(votingDelay * networks[network].blocktimeAvgSec / 60),
                    votingDelayText = votingDelayHours ? `${votingDelayHours} hours` : `${votingDelayMins} mins`,
                    votingPeriod = await contract.methods.votingPeriod().call(),
                    votingPeriodHours = Math.round(votingPeriod * networks[network].blocktimeAvgSec / 3600),
                    votingPeriodMins = Math.round(votingPeriod * networks[network].blocktimeAvgSec / 60),
                    votingPeriodText = votingPeriodHours ? `${votingPeriodHours} hours` : `${votingPeriodMins} mins`,
                    proposalThreshold = await contract.methods.proposalThreshold().call(),
                    proposalThresholdPerc = Math.round(100 * 100 * proposalThreshold / totalSupply) / 100

                setGovSettings({
                    quorum: `${web3.utils.fromWei(quorumRow)} votes / ${quorumPerc}%`,
                    votingDelay: `${votingDelay} blocks / ${votingDelayText}`,
                    votingPeriod: `${votingPeriod} blocks / ${votingPeriodText}`,
                    proposalThreshold: `${web3.utils.fromWei(proposalThreshold)} votes / ${proposalThresholdPerc}%`,
                })

                if (account) {
                    setVotingPower(Math.round(web3.utils.fromWei(await contract.methods.getVotes(account, blockNumber).call()) * 100) / 100)
                }
            } else {
                setGovSettings({
                    quorum: '-',
                    votingDelay: '-',
                    votingPeriod: '-',
                    proposalThreshold: '-',
                })
            }

            if (splitter[network]) {
                contract = new rpcLib.eth.Contract(splitterAbi, splitter[network]);

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
                contract = new rpcLib.eth.Contract(tokenAbi, addresses[network].weth);
                const wethBal = await contract.methods.balanceOf(tl[network]).call()
                if (wethBal > 0) {
                    balances.weth = web3.utils.fromWei(wethBal)
                }

                if (addresses[network].token) {
                    contract = new rpcLib.eth.Contract(tokenAbi, addresses[network].token);
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
            <div className="container p-4 pt-24 lg:pt-0">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Governance</h1>
                <div className="max-w-2xl mx-auto">
                    <article className="mb-8">
                        <div className="py-4 mb-2">
                            <div className="mb-4 flex justify-between items-center flex-wrap">
                                <h2 className="text-3xl sm:text-4xl font-Roboto">Gov</h2>
                                <a className=" flex justify-center h-9 items-center" title="View contract on blockchain explorer" target="_blank" href={`${networks[network].explorerurl}address/${gov[network]}`} rel="noopener noreferrer">
                                    <span style={networks[network].testnet && { color: networks[network].color }} className="flex font-bold justify-center text-xs md:text-sm self-center dark:text-teal-400">{gov[network]}</span>
                                </a>
                            </div>
                            <p className="text-lg">
                                Voting token holders with sufficient voting power can directly participate in the governance of the Stability protocol. These will be the only investors who can collectively change the organization’s resource distribution (mentioned below) and participate in critical decision-making processes involving the direction of the entire ecosystem.
                            </p>
                        </div>
                        <div className="mb-4">
                            <table>
                                <thead>
                                    <tr>
                                        <td className="pb-2 text-xl font-bold" colSpan={2}>Contract parameters</td>
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
                        <div>
                            <div className="text-xl font-bold">Voting tokens</div>
                            <div className="py-4 flex">
                                <div className="flex flex-col items-center justify-between h-28 mx-5">
                                    <img src="/profit.png" title="Stability (PROFIT)" alt="PROFIT" className="w-16 h-16" />
                                    {chainId ? <button className="btn text-sm" onClick={() => { dispatch(updateDelegateProfitToken(!IsDelegateProfitToken)) }}>delegate</button> : ''}
                                </div>
                                <div className="flex flex-col items-center justify-between h-28 mx-5">
                                    <img src="/pm.png" title="Profit Maker (PM)" alt="PM" className="w-16 h-16" />
                                    {chainId ? <button className="btn text-sm" onClick={() => { dispatch(updateDelegateMakerToken(!IsDelegateMakerToken)) }}>delegate</button> : ''}
                                </div>
                            </div>
                        </div>
                        {chainId && account && (
                            <div className="mt-3 mb-5">
                                <div className="text-xl font-bold mb-2">Your voting power</div>
                                <div className="text-3xl font-bold">{votingPower}</div>
                            </div>
                        )}
                        {govData[network] && govData[network].tally &&
                            <div className="py-1 my-5">
                                <a className=" flex justify-start h-9 items-center" title="Go to Tally" target="_blank" href={govData[network].tally} rel="noopener noreferrer">
                                   <button className="btn">Tally governance app</button>
                                </a>
                            </div>
                        }
                    </article>
                    <article className="mb-8">
                        <div className="py-4">
                            <div className="mb-4 flex justify-between items-center flex-wrap">
                                <h2 className="text-3xl sm:text-4xl font-Roboto ">Treasury</h2>
                                <a className=" flex justify-center h-9 items-center" title="View contract on blockchain explorer" target="_blank" href={`${networks[network].explorerurl}address/${tl[network]}`} rel="noopener noreferrer">
                                    <span style={networks[network].testnet && { color: networks[network].color }} className="flex justify-center text-xs md:text-sm self-center dark:text-teal-400">{tl[network]}</span>
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
                                        <span style={networks[network].testnet && { color: networks[network].color }} className="flex justify-center text-xs md:text-sm self-center dark:text-teal-400">{splitter[network]}</span>
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
                                        <td className="py-1 pl-1">EtherPayer, ProfitPayer</td>
                                        <td className="py-1 font-bold text-center">{shares.div}</td>
                                        <td className="py-1 text-right whitespace-nowrap">10% - 60%</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">Governance</td>
                                        <td className="py-1 pl-1">Treasury</td>
                                        <td className="py-1 font-bold text-center">{shares.gov}</td>
                                        <td className="py-1 text-right whitespace-nowrap">10% - 60%</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">Builders</td>
                                        <td className="py-1 pl-1">DevFund</td>
                                        <td className="py-1 font-bold text-center">{shares.dev}</td>
                                        <td className="py-1 text-right whitespace-nowrap">20% - 60%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                </div>
            </div >
        </section >
    )
}

export default Governance