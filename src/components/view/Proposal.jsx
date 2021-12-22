import React, { useState,useEffect } from 'react'
import { useQuery } from "@apollo/client";
import { GET_PROPOSAL_QUERY } from '@/src/graphql/queries'
import ErrorPage from 'next/error'
import { gov } from "@/src/wallet"
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import govAbi from '@/src/abis/govAbi'
import { showAlert } from '../alert';
function Proposal({ id }) {
    const [hasVoted, sethasVoted] = useState(false)
    const { chainId, library, account } = useWeb3React()
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId ? chainId : currentNetwork
    const { loading, error, data: proposal } = useQuery(GET_PROPOSAL_QUERY, {
        variables: { id: id.toLowerCase().toString() },
    });
    const govAddress = '0x005d71553aD3f8f919E5121aA45Bf24594DCE0d6'
    const proposalId = id.split('/').pop()
    async function castVote(value) {
        try {
            const govContract = new library.eth.Contract(govAbi, govAddress)
            await govContract.methods.castVote(proposalId, value).send({ from: account })
        } catch (error) {
            showAlert("Failed")
        }
    }
    useEffect(() => {
        if (account) {
            const govContract = new library.eth.Contract(govAbi, govAddress)
            govContract.methods.hasVoted(proposalId, account).call().then((vote) => {
                sethasVoted(vote)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [network])
    if (!gov[network]) {
        return <ErrorPage statusCode='404' />
    }
    return (
        <section className=" h-calc">
            <div className="container p-4">
                <h1 className="mb-10 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">
                    Proposal
                </h1>
                {
                    !hasVoted
                    &&
                    <div>
                        <button className="btn" onClick={() => { castVote(1) }}>
                            Vote for
                        </button>
                        <button className="btn" onClick={() => { castVote(0) }}>
                            Vote againt
                        </button>
                    </div>
                }
            </div>
        </section>
    )
}

export default Proposal
