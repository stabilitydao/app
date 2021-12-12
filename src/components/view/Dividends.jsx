import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import dividendAbi from '@/src/abis/dividendAbi'
import { useSelector } from "react-redux";
import { showAlert } from '@/src/components/alert';
import WEB3 from '@/src/functions/web3';
import tokenAbi from '@/src/abis/tokenAbi.json'
function Dividends() {
    const web3 = WEB3()
    const [pendingPayment, setpendingPayment] = useState(null)
    const [totalPending, settotalPending] = useState(null)
    const [totalPaid, settotalPaid] = useState(null)
    const [paidTo, setpaidTo] = useState(null)
    const currentNetwork = useSelector(state => state.network.value)
    const { library, chainId, active, account } = useWeb3React()
    const network = chainId ? chainId : currentNetwork
    const dividendAddress = '0x6BaF629618551Cb7454013F67f5d4A9119A61627'
    const wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab"
    useEffect(() => {
        if (active) {
            const contract = new library.eth.Contract(dividendAbi, dividendAddress)
            contract.methods.paymentPending(account).call().then((pending) => {
                setpendingPayment(pending / 10 ** 18)
            })
            contract.methods.totalPaidTo(account).call().then((paidTo) => {
                setpaidTo(paidTo / 10 ** 18)
            })
        }
        const contract = new web3.eth.Contract(dividendAbi, dividendAddress)
        contract.methods.totalPaid().call().then((paid) => {
            settotalPaid(paid / 10 ** 18)
        })
        const tokenContract = new web3.eth.Contract(tokenAbi, "0xc778417e063141139fce010982780140aa0cd5ab")
        tokenContract.methods.balanceOf(dividendAddress).call().then((totalPending) => {
            settotalPending(totalPending / 10 ** 18)
        })
    }, [network, active])

    async function releasePayment() {
        if (pendingPayment !== null) {
            try {
                const contract = new library.eth.Contract(dividendAbi, dividendAddress)
                await contract.methods.releasePayment().send({ from: account })
                const pending = await contract.methods.paymentPending(account).call()
                setpendingPayment(pending / 10 ** 18)
                const paid = await contract.methods.totalPaid().call()
                settotalPaid(paid / 10 ** 18)
                const tokenContract = new library.eth.Contract(tokenAbi, wethAddress)
                tokenContract.methods.balanceOf(dividendAddress).call().then((totalPending) => {
                    settotalPending(totalPending / 10 ** 18)
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            showAlert("Failed")
        }
    }

    return (
        <section className="h-calc">
            <div className="container p-4">
                <h1 className="mb-10 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Dividends</h1>
                { <div className="flex justify-center">
                    <div className="flex flex-col m-5 overflow-hidden shadow-2xl rounded-3xl dark:border-green-900 dark:border-2 dark:bg-gradient-to-br dark:from-green-900 dark:to-black">
                        <div className="p-3 text-3xl text-center dark:text-green-200 font-bold">EtherPayer</div>
                        <div className="p-3">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="">Total amount paid</td>
                                        <td className="pl-8 text-right">
                                            {totalPaid ? (
                                                <span>{totalPaid ? Math.floor(totalPaid * 10000) / 10000 : "-"} WETH</span>
                                            ) : '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Total pending</td>
                                        <td className="pl-8 text-right">
                                            {totalPending ? (
                                                <span>{totalPending ? Math.floor(totalPending * 10000) / 10000 : "-"} WETH</span>
                                            ) : '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Total amount paid to you</td>
                                        <td className="pl-8 text-right">
                                            {paidTo ? (
                                                <span>{paidTo ? Math.floor(paidTo * 10000) / 10000 : "-"} WETH</span>
                                            ) : '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Your pending payment
                                        </td>
                                        <td className="pl-8 text-right">
                                            {pendingPayment ? (
                                                <span>{Math.floor(pendingPayment * 10000) / 10000} WETH</span>
                                            ) : "-"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3">
                            {pendingPayment ? (
                                <button className='btn w-full' onClick={releasePayment}>Release</button>
                            ) : null}
                        </div>
                    </div>
                </div>}
            </div>
        </section>
    )
}

export default Dividends