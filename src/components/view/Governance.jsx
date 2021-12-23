import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client";
import { GET_GOV_QUERY } from "@/src/graphql/queries";
import WEB3 from '@/src/functions/web3';
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { gov } from "@/src/wallet"
import { updateIsWalletOption } from "@/redux/slices/modalsSlice";
import Link from 'next/link'
import govAbi from '@/src/abis/govAbi'
import tokenAbi from '@/src/abis/tokenAbi'
import addresses from '@stabilitydao/addresses';
import { showAlert } from '../alert';
function Governance() {
    const web3 = WEB3()
    const dispatch = useDispatch()
    const [delegateAddress, setdelegateAddress] = useState(null)
    const [deledatedTo, setdeledatedTo] = useState(null)
    const [blocknumber, setBlocknumber] = useState()
    const { active, chainId, account, library } = useWeb3React()
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId ? chainId : currentNetwork

    let graphData;

    const { loading, error, data } = useQuery(GET_GOV_QUERY, {
        variables: { id: gov[3].toLowerCase() },
    });

    graphData = data

    if (!gov[network]) {
        graphData = null
    }
    if (graphData) {
        console.log(graphData.governor.proposals)
    }
    useEffect(() => {
        if (web3.eth && gov[network]) {
            web3.eth.getBlockNumber().then(e => {
                setBlocknumber(e)
            })
        }
        if (active) {
            const tokenContract = new library.eth.Contract(tokenAbi, addresses[network].token)
            tokenContract.methods.delegates(account).call().then((delegatedTo) => {
                setdeledatedTo(delegatedTo)
            }).catch((err) => { console.log(err) })
        }
    }, [web3.eth, network])
    async function handleDelegate(e) {
        e.preventDefault()
        if (!delegateAddress) {
            showAlert("Failed")
        } else {
            try {
                const tokenContract = new library.eth.Contract(tokenAbi, addresses[network].token)
                await tokenContract.methods.delegate(delegateAddress).send({ from: account })
                const delegatedTo = await tokenContract.methods.delegates(account).call()
                setdeledatedTo(delegatedTo)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <section className=" h-calc">
            <div className="container p-4">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Governance</h1>
                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col">
                        <article className="mb-8">
                            <div className="py-4">
                                <h2 className="mb-4 text-3xl sm:text-4xl font-Roboto ">On-chain voting</h2>
                                <p className="text-lg">
                                    PROFIT token holders with sufficient voting power can directly participate in the governance of the Stability protocol. These will be the only investors who can collectively change the organization’s resource distribution (mentioned below) and participate in critical decision-making processes involving the direction of the entire ecosystem.
                                </p>
                            </div>
                        </article>
                        <article className="my-0">
                            {/*Active proposals: {activeProposals}<br />*/}
                            {/*Proposals: {data ? data.governor.proposals.length : ""} <br />*/}
                            {/*Holders: [total token holders]<br />*/}
                            {/*Voters: [total voters]<br />*/}
                            {/*Engagement ratio: [delegated tokens / total supply]<br />*/}
                        </article>

                        {graphData ? (
                            <div>
                                {active ? (
                                    <article className="my-5 flex justify-between">
                                        <div>
                                            Your voting power: [address votes] <br />
                                            <h1>
                                                Delegated to: {deledatedTo?deledatedTo:"-"}
                                            </h1>
                                        </div>
                                        <form >
                                            <input type="text" className='w-20 h-6 bg-gray-200 focus:outline-none px-3 py-1 border-2 text-gray-900 border-indigo-800' onChange={(e) => { setdelegateAddress(e.target.value) }} value={delegateAddress} />
                                            <button className="btn" onClick={handleDelegate} >Delegate</button>
                                        </form>
                                    </article>
                                ) : (
                                    <div className="w-64">
                                        <button
                                            type="button"
                                            className=" h-10 btn rounded-2xl w-full"
                                            id="options-menu"
                                            onClick={() => dispatch(updateIsWalletOption(true))}
                                        >
                                            Connect Wallet
                                        </button>
                                    </div>
                                )}
                                <article className="my-5">
                                    <h2 className="text-2xl">Propsals</h2>
                                    <table className="table-auto text-xl w-full">
                                        <thead>
                                            <tr>
                                                <td className="px-2">Proposal</td>
                                                <td className="px-2">Voting</td>
                                                <td className="px-2">Total votes</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {graphData.governor.proposals.map((proposal, index) => {
                                                let status;
                                                let statusBg;
                                                if ((parseInt(proposal.startBlock) <= parseInt(blocknumber)) && (parseInt(proposal.endBlock) >= parseInt(blocknumber))) {
                                                    status = 'Active'
                                                    statusBg = 'bg-green-800'
                                                } else if (parseInt(proposal.startBlock) > parseInt(blocknumber)) {
                                                    status = 'Pending'
                                                    statusBg = 'bg-blue-800'
                                                } // ....

                                                let votes = 0
                                                let voters = 0
                                                let votesFor = 0
                                                let votesForWeight = 0
                                                let votesAgainst = 0
                                                let votesAgainstWeight = 0
                                                if (proposal.supports) {
                                                    proposal.supports.map(s => {
                                                        if (s.support == 1) {
                                                            votesFor++
                                                            s.votes.map(v => {
                                                                votesForWeight += parseInt(v.weight)
                                                                votes += parseInt(v.weight)
                                                                voters++
                                                            })
                                                        } else if (s.support == 0) {
                                                            votesAgainst++
                                                            s.votes.map(v => {
                                                                votesAgainstWeight += parseInt(v.weight)
                                                                votes += parseInt(v.weight)
                                                                voters++
                                                            })
                                                        }

                                                    })
                                                }

                                                return (
                                                    <tr key={index}>
                                                        <td className="p-2">
                                                            <div className="flex flex-col">
                                                                <div className="flex mb-1.5"><Link href="/governance/[id]" as={`/governance/${proposal.id.replace('/', '_')}`}><a>{proposal.description}</a></Link></div>
                                                                <div className="flex"><span className={`inline-flex ${statusBg} px-2 text-sm rounded-md `}>{status}</span></div>
                                                            </div>
                                                        </td>
                                                        <td className="p-2">
                                                            {votes > 0 ? (
                                                                <div className="flex flex-col">
                                                                    <div className="text-green-500">For: {Math.round(votesForWeight * 10 ** 5 / 10 ** 18) / 10 ** 5}</div>
                                                                    <div className="text-red-500">Against: {Math.round(votesAgainstWeight * 10 ** 5 / 10 ** 18) / 10 ** 5}</div>
                                                                </div>
                                                            ) : (
                                                                <div>Not yet</div>
                                                            )}
                                                        </td>
                                                        <td className="p-2">
                                                            {Math.round(votes * 10 ** 5 / 10 ** 18) / 10 ** 5}<br />
                                                            {voters} addresses
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </article>
                            </div>
                        ) : (
                            <div className="text-xl">Governance is not yet deployed at this network</div>
                        )}
                    </div>
                </div>
                <div className="max-w-2xl mx-auto mt-10">
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