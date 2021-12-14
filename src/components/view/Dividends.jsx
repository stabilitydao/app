import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import dividendAbi from '@/src/abis/dividendAbi'
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from '@/src/components/alert';
import WEB3 from '@/src/functions/web3';
import tokenAbi from '@/src/abis/tokenAbi.json'
import { updateIsWalletOption } from "@/redux/slices/modalsSlice";
import addresses, { MAINNET, ROPSTEN, RINKEBY } from 'addresses'
import AlphaTesting from "@/src/components/AlphaTesting";
import {networks} from "../../wallet/networks";
function Dividends() {
    const web3 = WEB3()
    const dispatch = useDispatch()
    const [pendingPayment, setpendingPayment] = useState(null)
    const [totalPending, settotalPending] = useState(null)
    const [totalPaid, settotalPaid] = useState(null)
    const [paidTo, setpaidTo] = useState(null)
    const currentNetwork = useSelector(state => state.network.value)
    const { library, chainId, active, account } = useWeb3React()
    const network = chainId ? chainId : currentNetwork
    const wethAddress = {
        [ROPSTEN]: "0xc778417e063141139fce010982780140aa0cd5ab",
    }
    const dividends = {
        [ROPSTEN]: ['0x6BaF629618551Cb7454013F67f5d4A9119A61627'],
    };
    useEffect(() => {
        if (dividends[network]) {
            const dividendAddress = dividends[network][0]
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
        }
    }, [network, active])

    function update(params) {
        
    }
    async function releasePayment() {
        const dividendAddress = dividends[network][0]
        if (pendingPayment !== null) {
            try {
                const contract = new library.eth.Contract(dividendAbi, dividendAddress)
                await contract.methods.releasePayment().send({ from: account })
                const pending = await contract.methods.paymentPending(account).call()
                setpendingPayment(pending / 10 ** 18)
                const paid = await contract.methods.totalPaid().call()
                settotalPaid(paid / 10 ** 18)
                const tokenContract = new library.eth.Contract(tokenAbi, wethAddress[network])
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
                {
                    !dividends[network] &&
                    <div className="m-6 text-2xl text-center font-semibold ">
                        <div>We currently have no dividend payers on this network</div>
                        <AlphaTesting />
                    </div>
                }
                {dividends[network] && <div className="flex justify-center">
                    <div className="w-96 flex flex-col m-5 overflow-hidden shadow-2xl rounded-3xl dark:border-green-900 dark:border-2 dark:bg-gradient-to-br dark:from-green-900 dark:to-black">
                        <div className="p-3 pb-2 text-3xl text-center dark:text-green-200 font-bold">Ether Payer</div>
                        <div className="flex flex-col w-full justify-center items-center">
                            <div className="dark:text-green-200 font-bold">Hold SDIV to earn WETH</div>
                            <a className="flex justify-center h-9 items-center" title="View contract on Etherscan" target="_blank" href={networks[network].explorerurl.concat(dividends[network])} rel="noopener noreferrer">
                                <span className="flex justify-center text-xs md:text-sm self-center dark:text-teal-400">{dividends[network]}</span>
                            </a>
                        </div>
                        <div className="p-5 pt-1 space-y-4">
                            <table className="table-auto  w-full">
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
                                    {active &&
                                        <>
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
                            {pendingPayment ? (
                                <button className='btn dark:bg-green-700 dark:border-0 w-full' onClick={releasePayment}>Release</button>
                            ) : null}
                        </div>
                    </div>
                </div>}
            </div>
        </section>
    )
}

export default Dividends