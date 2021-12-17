import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { currentPhase } from "@/src/components/view/Development";
import { MAINNET, ROPSTEN, RINKEBY } from '@stabilitydao/addresses'
import { useSelector, useDispatch } from "react-redux";
import dividendAbi from '@/src/abis/dividendAbi'
import AlphaTesting from "@/src/components/AlphaTesting";
import { totalSupply } from "@/redux/slices/tokenSlice";
import WEB3 from "@/src/functions/web3"
import addresses from '@stabilitydao/addresses'
import { buyLinks } from "@/src/wallet/swaps";
import { pools } from '@/src/wallet/pools';
import { payers } from '@/src/wallet/payers';
import { useWeb3React } from '@web3-react/core'
import tokenAbi from '@/src/abis/tokenAbi'
import poolAbi from '@/src/abis/poolAbi'
import { dtotalSupply } from "@/redux/slices/dTokenSlice";
import { updateIsWalletOption } from "@/redux/slices/modalsSlice";
import { updateIsPending } from '@/redux/slices/modalsSlice'
const appEnabled = {
    [MAINNET]: false,
    [ROPSTEN]: true,
    [RINKEBY]: false,
}

function Home() {
    const dispatch = useDispatch()
    const web3 = WEB3()
    const [Reward, setReward] = useState(null)
    const { library, chainId, active, account } = useWeb3React()
    const [sdivbalance, setsdivbalance] = useState(null)
    const [pendingPayment, setpendingPayment] = useState(null)
    const currentNetwork = useSelector(state => state.network.value)
    const profitpriceIn$ = useSelector(state => state.profitpriceIn$.value)
    const network = chainId ? chainId : currentNetwork
    const [stakedBalance, setstakedBalance] = useState(null)
    const token = useSelector(state => state.token)
    const dToken = useSelector(state => state.dToken)

    const dividends = payers;

    useEffect(() => {
        if (web3 && web3.eth.net.isListening() && network) {
            if (addresses[network].token) {
                let contract = new web3.eth.Contract(tokenAbi, addresses[network].token);
                contract.methods.totalSupply().call().then(r => {
                    dispatch(totalSupply(web3.utils.fromWei(r, "ether")))
                })
            }

            if (addresses[network].dToken) {
                const dividendTokenContract = new web3.eth.Contract(tokenAbi, addresses[network].dToken);
                dividendTokenContract.methods.totalSupply().call().then(r => {
                    dispatch(dtotalSupply(web3.utils.fromWei(r, "ether")))
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }

        if (account && pools[network]) {
            const pool = pools[network][Object.keys(pools[network])[0]]
            const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(pool.contract));
            poolContract.methods.pending(account).call().then((value) => {
                return library.utils.fromWei(value, 'ether')
            }).then((reward) => {
                setReward(reward)
            })
            poolContract.methods.userInfo(account).call().then((staked) => {
                return library.utils.fromWei(staked[0], 'ether')
            }).then((stakedBalance) => {
                setstakedBalance(stakedBalance)
            })
        }

        if (addresses[network] && addresses[network].dToken && account) {
            let contract;
            contract = new web3.eth.Contract(tokenAbi, addresses[network].dToken);
            contract.methods.balanceOf(account).call().then((balance) => {
                setsdivbalance(web3.utils.fromWei(balance, "ether"))
            }).catch((err) => {
                console.log(err)
            })
        }
        if (dividends[network] && account) {
            const dividendcontract = new library.eth.Contract(dividendAbi, dividends[network][0])
            dividendcontract.methods.paymentPending(account).call().then((pending) => {
                setpendingPayment(pending / 10 ** 18)
            })
        }
    }, [network, active])
    async function harvest() {
        dispatch(updateIsPending(true))
        try {
            const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(pool.contract));
            await poolContract.methods.harvest().send({ from: account })
            const value = await poolContract.methods.pending(account).call()
            const reward = library.utils.fromWei(value, 'ether')
            setReward(reward)
            dispatch(updateIsPending(false))
        } catch (err) {
            console.log(err)
            dispatch(updateIsPending(false))
        }
    }
    async function releasePayment() {
        const dividendAddress = dividends[network][0]
        if (pendingPayment !== null) {
            dispatch(updateIsPending(true))
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
                dispatch(updateIsPending(false))
            } catch (err) {
                console.log(err)
                dispatch(updateIsPending(false))
            }
        } else {
            showAlert("Failed")
        }
    }
    setInterval(() => {
        if (library && library.eth && pools[network]) {
            const pool = pools[network][Object.keys(pools[network])[0]]
            const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(pool.contract));
            poolContract.methods.pending(account).call().then((value) => {
                return library.utils.fromWei(value, 'ether')
            }).then((reward) => {
                setReward(reward)
            })
        }
    }, 15000);
    return (
        <section className="dark:bg-gradient-to-br dark:from-black dark:via-space dark:to-black dark:text-white h-calc">
            <div className="container p-4 ">
                {appEnabled[network] ? (
                    <div className="flex flex-col max-w-6xl mx-auto">
                        <div className="flex flex-wrap">
                            <div className="flex w-full md:w-1/2 justify-center md:justify-end md:pr-6">
                                <div className="flex w-96 justify-center">
                                    <img src="/logo.svg" alt="logo" width={256} height={256} />
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-1/2 justify-center md:items-start md:pl-6">
                                <div className="flex flex-col w-full md:w-80 lg:w-96 items-center md:items-start">
                                    <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                                        Stability
                                    </h1>
                                    <div className="text-xl font-medium leading-normal sm:text-2xl mb-4">
                                        Profit generating DeFi protocol
                                    </div>
                                    <div className="flex w-full flex-wrap justify-center md:justify-start">
                                        <Link href="/about">
                                            <div className="h-10 dark:bg-indigo-800 dark:text-white dark:border-[#4e1173] py-0.5 px-4 rounded-xl cursor-pointer flex items-center justify-center mb-1 text-center text-indigo-700 text-lg font-Roboto mr-5 mb-5">
                                                About
                                            </div>
                                        </Link>
                                        <Link href="/development">
                                            <div className="h-10 dark:bg-[#431365] py-0.5 px-4 rounded-xl cursor-pointer dark:text-white dark:border-[#4e1173] flex items-center justify-center mb-1 text-center text-indigo-700 text-lg font-Roboto mr-5 mb-5" >
                                                Development
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex py-3 justify-center flex-wrap md:my-1 xl:my-3">
                            <div className="flex flex-col w-full m-5 md:m-0 md:w-1/2 items-center md:items-end md:px-3 xl:px-6">
                                <div className="flex w-full sm:w-96 md:w-80 lg:w-96 flex-col px-10 py-8 dark:bg-[rgba(0,0,0,0.5)] rounded-2xl">
                                    <div className="flex text-3xl">Staking</div>
                                    {!active && <div className="flex pt-8 pb-6">
                                        <button
                                            type="button"
                                            className=" h-10 btn rounded-2xl w-full"
                                            id="options-menu"
                                            onClick={() => {
                                                dispatch(updateIsWalletOption(true))
                                            }}
                                        >
                                            Connect Wallet
                                        </button>
                                    </div>}
                                    {active &&
                                        <div className="flex">


                                            <div className="flex flex-col w-3/5 py-4">
                                                <div className="flex dark:text-teal-100">Earned</div>
                                                <div className="flex dark:text-teal-100 font-bold">
                                                    {Reward ? (
                                                        <div className="h-20">
                                                            <div className="mb-4 text-lg">
                                                                {Math.floor(Reward * 10000) / 10000} SDIV
                                                            </div>
                                                            <button className="btn w-full dark:bg-teal-700 border-none outline-none rounded-xl" onClick={harvest}>Harvest</button>
                                                        </div>
                                                    ) : (
                                                        <div className="h-20">-</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-2/5 py-4">
                                                <div className="flex dark:text-teal-100">PROFIT staked</div>
                                                <div className="flex dark:text-teal-100 font-bold">
                                                    <div className="text-lg">
                                                        {Math.floor(stakedBalance * 100000) / 100000}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col w-full m-5 md:m-0 md:w-1/2 items-center md:items-start md:px-3 xl:px-6">
                                <div className="flex w-full sm:w-96 md:w-80 lg:w-96 flex-col px-10 py-8 dark:bg-[rgba(0,0,0,0.5)] rounded-2xl">
                                    <div className="flex text-3xl">Dividends</div>
                                    {!active && <div className="flex pt-8 pb-6">
                                        <button
                                            type="button"
                                            className=" h-10 btn rounded-2xl w-full"
                                            id="options-menu"
                                            onClick={() => dispatch(updateIsWalletOption(true))}
                                        >
                                            Connect Wallet
                                        </button>
                                    </div>}
                                    {active &&
                                        <div className="flex">
                                            <div className="flex flex-col w-3/5 py-4">
                                                <div className="flex dark:text-teal-100">Earned</div>
                                                <div className="flex dark:text-teal-100 font-bold">
                                                    {pendingPayment ? (
                                                        <div className="h-20">
                                                            <div className="mb-4 text-lg whitespace-nowrap">
                                                                {Math.floor(pendingPayment * 10000) / 10000} WETH
                                                            </div>
                                                            <button className="btn w-full dark:bg-green-700 border-none outline-none rounded-xl" onClick={releasePayment}>Release</button>
                                                        </div>
                                                    ) : (
                                                        <div className="h-20">-</div>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="flex flex-col w-2/5 py-4">
                                                <div className="flex dark:text-teal-100">SDIV in wallet</div>
                                                <div className="flex dark:text-teal-100 font-bold">
                                                    <div className="text-lg">
                                                        {Math.floor(sdivbalance * 10000) / 10000}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap md:py-3 justify-center md:my-1 xl:my-2">
                            <div className="flex flex-col w-full m-5 md:m-0 md:w-1/2 items-center md:items-end md:px-3 xl:px-6">
                                <div className="flex w-full sm:w-96 md:w-80 lg:w-96 flex-col py-7 px-10 dark:bg-[rgba(0,0,0,0.5)] rounded-2xl">
                                    <div className="flex w-full justify-between pr-4">
                                        <span className="text-3xl ">$PROFIT</span>
                                        <span>
                                            {buyLinks && buyLinks[network] ? (
                                                <a className="mt-2" href={buyLinks[network]} target="_blank" rel="noopener noreferrer">
                                                    <button title="Swap ETH to PROFIT" className="h-8 p-0 w-24 text-md rounded-xl btn my-0.5">
                                                        Swap
                                                    </button>
                                                </a>
                                            ) : (
                                                <div className="mt-1">
                                                    <div className="h-8" />
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex mt-3">
                                        <table className="table-auto w-72">
                                            <tbody>
                                                <tr>
                                                    <td>Price</td>
                                                    <td className="text-right">{profitpriceIn$ ? `$${profitpriceIn$}` : "-"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Market cap</td>
                                                    <td className="text-right">{token.totalSupply && profitpriceIn$ ? (<span>${(profitpriceIn$ * (token ? token.totalSupply : 0)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ')}</span>) : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Total supply</td>
                                                    <td className="text-right">{token ? (token.totalSupply * 1).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ') : ''}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full m-5 md:m-0 md:w-1/2 items-center md:items-start md:px-3 xl:pl-6">
                                <div className="flex w-full sm:w-96 md:w-80 lg:w-96 flex-col  py-7 px-10 dark:bg-[rgba(0,0,0,0.5)] rounded-2xl">
                                    <div className="flex text-3xl">$SDIV</div>
                                    <div className="flex mt-3">
                                        <table className="table-auto w-72">
                                            <tbody>
                                                <tr>
                                                    <td>Price</td>
                                                    <td className="text-right">-</td>
                                                </tr>
                                                <tr>
                                                    <td>Market cap</td>
                                                    <td className="text-right">-</td>
                                                </tr>
                                                <tr>
                                                    <td>Total supply</td>
                                                    <td className="text-right">{dToken ? (dToken.totalSupply * 1).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ') : "-"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-lg mx-auto mb-20">
                        <img src="/logo.svg" alt="logo" width={512} height={512} />
                        <div className="text-center">
                            <div className="mt-0 mb-2 text-3xl font-medium leading-normal sm:text-4xl font-Roboto">
                                <h1 className="text-4xl sm:text-6xl">
                                    Stability
                                </h1>
                                Profit generating DeFi protocol
                            </div>
                            <p className="mt-0 mb-4 text-sm font-medium leading-normal">
                                Decentralized organization
                            </p>
                            <Link href="/development">
                                <div className="w-80 mx-auto dark:bg-[#2f004b] py-0.5 px-4 rounded-xl cursor-pointer dark:text-[#4faaff] dark:border-[#4e1173] flex items-center justify-center mb-1 text-center text-indigo-700 sm:text-2xl font-Roboto">
                                    Phase 0: {currentPhase}
                                </div>
                            </Link>
                        </div>
                        <div>
                            <AlphaTesting />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Home
