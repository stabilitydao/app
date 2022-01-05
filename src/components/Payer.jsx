import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import dividendAbi from '@/src/abis/dividendAbi'
import { useDispatch } from "react-redux";
import { showAlert } from '@/src/components/alert';
import WEB3 from '@/src/functions/web3';
import tokenAbi from '@/src/abis/tokenAbi.json'
import {
    txConfirmedByNetwork,
    updateIsTxSubmitted,
    updateIsWaitingForWalletTxConfirm,
    updateIsWalletOption
} from "@/redux/slices/modalsSlice";
import {networks} from "../wallet/networks";

function Payer({ name, address, rewardTokenAddress, rewardTokenSymbol, color, network }) {
    const web3 = WEB3()
    const dispatch = useDispatch()
    const [pendingPayment, setpendingPayment] = useState(null)
    const [totalPending, settotalPending] = useState(null)
    const [totalPaid, settotalPaid] = useState(null)
    const [paidTo, setpaidTo] = useState(null)
    const { library, chainId, active, account } = useWeb3React()
    const rpcLib = chainId ? library : web3
    
    useEffect(() => {
        if (active) {
            const contract = new library.eth.Contract(dividendAbi, address)
            contract.methods.paymentPending(account).call().then((pending) => {
                setpendingPayment(pending / 10 ** 18)
            })
            contract.methods.totalPaidTo(account).call().then((paidTo) => {
                setpaidTo(paidTo / 10 ** 18)
            })
        }
        const contract = new rpcLib.eth.Contract(dividendAbi, address)
        contract.methods.totalPaid().call().then((paid) => {
            settotalPaid(paid / 10 ** 18)
        })
        const tokenContract = new rpcLib.eth.Contract(tokenAbi, rewardTokenAddress)
        tokenContract.methods.balanceOf(address).call().then((totalPending) => {
            settotalPending(totalPending / 10 ** 18)
        })
    })

    async function releasePayment() {
        if (pendingPayment !== null) {
            dispatch(updateIsWaitingForWalletTxConfirm(true))
            try {
                const contract = new library.eth.Contract(dividendAbi, address)
                await contract.methods.releasePayment().send({ from: account })
                    .on('transactionHash', txhash => {
                        dispatch(updateIsWaitingForWalletTxConfirm(false))
                        dispatch(updateIsTxSubmitted(txhash))
                    })
                    .on('receipt', r => {
                        dispatch(txConfirmedByNetwork())
                    })
                const pending = await contract.methods.paymentPending(account).call()
                setpendingPayment(pending / 10 ** 18)
                const paid = await contract.methods.totalPaid().call()
                settotalPaid(paid / 10 ** 18)
                const tokenContract = new library.eth.Contract(tokenAbi, rewardTokenAddress)
                tokenContract.methods.balanceOf(address).call().then((totalPending) => {
                    settotalPending(totalPending / 10 ** 18)
                })
            } catch (err) {
                console.log(err)
                dispatch(updateIsWaitingForWalletTxConfirm(false))
            }
        } else {
            showAlert("Failed")
        }
    }

    let cardClassNames, titleClassNames, descClassNames, buttonClassNames;
    if (color === 'blue') {
        cardClassNames = "w-96 flex flex-col m-5 overflow-hidden shadow-2xl rounded-3xl dark:border-blue-900 dark:border-2 dark:bg-gradient-to-br dark:from-blue-900 dark:to-black"
        titleClassNames = "p-3 pb-2 text-3xl text-center dark:text-blue-200 font-bold"
        descClassNames = "dark:text-blue-200 font-bold"
        buttonClassNames = "btn dark:bg-blue-700 dark:border-0 w-full"
    } else if (color === 'green') {
        cardClassNames = "w-96 flex flex-col m-5 overflow-hidden shadow-2xl rounded-3xl dark:border-green-900 dark:border-2 dark:bg-gradient-to-br dark:from-green-900 dark:to-black"
        titleClassNames = "p-3 pb-2 text-3xl text-center dark:text-green-200 font-bold"
        descClassNames = "dark:text-green-200 font-bold"
        buttonClassNames = "btn dark:bg-green-700 dark:border-0 w-full"
    } else if (color === 'indigo') {
        cardClassNames = "w-96 flex flex-col m-5 overflow-hidden shadow-2xl rounded-3xl dark:border-indigo-900 dark:border-2 dark:bg-gradient-to-br dark:from-indigo-900 dark:to-black"
        titleClassNames = "p-3 pb-2 text-3xl text-center dark:text-indigo-200 font-bold"
        descClassNames = "dark:text-indigo-200 font-bold"
        buttonClassNames = "btn dark:bg-indigo-700 dark:border-0 w-full"
    }
    return (
        <div className="flex justify-center">
            <div className={cardClassNames}>
                <div className={titleClassNames}>{name}</div>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className={descClassNames}>Hold SDIV to earn {rewardTokenSymbol}</div>
                    <a className="flex justify-center h-9 items-center" title="View contract on Etherscan" target="_blank" href={`${networks[network].explorerurl}address/${address}`} rel="noopener noreferrer">
                        <span className="flex justify-center text-xs md:text-sm self-center dark:text-teal-400">{address}</span>
                    </a>
                </div>
                <div className="p-5 pt-1 space-y-4">
                    <table className="table-auto  w-full">
                        <tbody>
                        <tr>
                            <td className="">Total paid</td>
                            <td className="pl-4 text-right">
                                {totalPaid ? (
                                    <span>{totalPaid ? Math.floor(totalPaid * 10000) / 10000 : "-"} {rewardTokenSymbol}</span>
                                ) : '-'}
                            </td>
                        </tr>
                        <tr>
                            <td className="">Total pending</td>
                            <td className="pl-8 text-right">
                                {totalPending ? (
                                    <span>{totalPending ? Math.floor(totalPending * 10000) / 10000 : "-"} {rewardTokenSymbol}</span>
                                ) : '-'}
                            </td>
                        </tr>
                        {active &&
                            <>
                                <tr>
                                    <td className="">Total paid to you</td>
                                    <td className="pl-8 text-right">
                                        {paidTo ? (
                                            <span>{paidTo ? Math.floor(paidTo * 10000) / 10000 : "-"} {rewardTokenSymbol}</span>
                                        ) : '-'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Your pending payment
                                    </td>
                                    <td className="pl-8 text-right">
                                        {pendingPayment ? (
                                            <span>{Math.floor(pendingPayment * 10000) / 10000} {rewardTokenSymbol}</span>
                                        ) : "-"}
                                    </td>
                                </tr>
                            </>
                        }
                        </tbody>
                    </table>
                    {!active && <button
                        type="button"
                        className=" h-10 btn rounded-2xl w-full"
                        id="options-menu"
                        onClick={() => dispatch(updateIsWalletOption(true))}
                    >
                        Connect Wallet
                    </button>}
                </div>
                <div className="p-5 mb-3">
                    {account && pendingPayment ? (
                        <button className={buttonClassNames} onClick={releasePayment}>Release</button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Payer