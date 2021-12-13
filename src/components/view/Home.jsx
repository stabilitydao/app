import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { currentPhase } from "@/src/components/view/Development";
import { MAINNET, ROPSTEN, RINKEBY } from 'addresses'
import { useSelector, useDispatch } from "react-redux";
import dividendAbi from '@/src/abis/dividendAbi'
import AlphaTesting from "@/src/components/AlphaTesting";
import { symbol, name, totalSupply } from "@/redux/slices/tokenSlice";
import WEB3 from "@/src/functions/web3"
import addresses from 'addresses'
import { useWeb3React } from '@web3-react/core'
import tokenAbi from '@/src/abis/tokenAbi'
import poolAbi from '@/src/abis/poolAbi'
const appEnabled = {
    [MAINNET]: false,
    [ROPSTEN]: true,
    [RINKEBY]: false,
}

function Home() {
    const dispatch = useDispatch()
    const web3 = WEB3()
    const [Reward, setReward] = useState(null)
    const { library, active, chainId, account } = useWeb3React()
    const [sdivbalance, setsdivbalance] = useState(null)
    const [pendingPayment, setpendingPayment] = useState(null)
    const [sdivsupply, setsdivsupply] = useState(null)
    const currentNetwork = useSelector(state => state.network.value)
    const profitpriceIn$ = useSelector(state => state.profitpriceIn$.value)
    const network = chainId ? chainId : currentNetwork
    const [stakedBalance, setstakedBalance] = useState(null)
    const profitPrice = useSelector(state => state.price.value)
    const token = useSelector(state => state.token)
    const dToken = useSelector(state => state.dToken)
    const [mintedReward, setmintedReward] = useState(null)

    addresses[3].dToken = '0x424E1eAe04a2580EcD4d5f19Ad5285cC2b05a05C';
    const pools = {
        [ROPSTEN]: {
            "Dividend Minter": {
                stake: 'PROFIT',
                earn: 'SDIV',
                contract: "0x20169ebb1b60ee0c45ECAa5235551cC69Ea788C0",
            },
        },
    };
    const pool = {
        stake: 'PROFIT',
        earn: 'SDIV',
        contract: "0x20169ebb1b60ee0c45ECAa5235551cC69Ea788C0",
    }
    const dividends = {
        [ROPSTEN]: ['0x6BaF629618551Cb7454013F67f5d4A9119A61627'],
    };
    useEffect(() => {
        if (web3.eth.net.isListening()) {
            if (addresses[network].token) {
                let contract;
                contract = new web3.eth.Contract(tokenAbi, addresses[network].token);
                contract.methods.symbol().call().then((r) => {
                    dispatch(symbol(r))
                })
                contract = new web3.eth.Contract(tokenAbi, addresses[network].token);
                contract.methods.name().call().then((r) => {
                    dispatch(name(r))
                })
                contract = new web3.eth.Contract(tokenAbi, addresses[network].token);
                contract.methods.totalSupply().call().then((r) => {
                    dispatch(totalSupply(web3.utils.fromWei(r, "ether")))
                })
            }
            if (addresses[network].dToken) {
                const dividendTokenContract = new web3.eth.Contract(tokenAbi, addresses[network].dToken);
                dividendTokenContract.methods.totalSupply().call().then((supply) => {setsdivsupply(web3.utils.fromWei(supply, "ether"))}).catch((err) => {console.log(err)})
            }

        }
        if (account && pool.contract) {
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

        if (addresses[network].dToken && account) {
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
        const sdivmintContract = new web3.eth.Contract(poolAbi,'0x20169ebb1b60ee0c45ECAa5235551cC69Ea788C0')
        sdivmintContract.methods.rewardTokensPerBlock().call().then((minted)=>[
            setmintedReward(web3.utils.fromWei(minted, "ether"))
        ]).catch((err)=>{
            console.log(err)
        })
    }, [network])
    async function harvest() {
        try {
            const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(pool.contract));
            await poolContract.methods.harvest().send({ from: account })
            const value = await poolContract.methods.pending(account).call()
            const reward = library.utils.fromWei(value, 'ether')
            setReward(reward)
        } catch (err) {
            console.log(err)
        }
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
    setInterval(() => {
        if (library && library.eth) {
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
                {appEnabled[currentNetwork] ? (
                    <div className="flex flex-col max-w-6xl mx-auto">
                        <div className="flex flex-wrap">
                            <div className="flex w-full md:w-1/2 justify-center md:justify-end md:pr-6">
                                <div className="flex w-96 justify-center">
                                    <img src="/logo.svg" alt="logo" width={256} height={256} />
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-1/2 justify-center md:items-start md:pl-6">
                                <div className="flex flex-col items-center md:items-start">
                                    <h1 className="text-4xl sm:text-6xl">
                                        Stability
                                    </h1>
                                    <div className="text-3xl font-medium leading-normal sm:text-4xl ">
                                        Profit generating DeFi protocol
                                    </div>
                                    <p className="mt-0 mb-4 text-sm font-medium leading-normal">
                                        Decentralized organization
                                    </p>
                                    <Link href="/development">
                                        <div className="dark:bg-[#2f004b] py-0.5 px-4 rounded-xl cursor-pointer dark:text-[#4faaff] dark:border-[#4e1173] flex items-center justify-center mb-1 text-center text-indigo-700 sm:text-2xl font-Roboto">
                                            Phase 0: {currentPhase}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex py-3 justify-center flex-wrap md:my-3">
                            <div className="flex w-full md:w-1/2 flex-col items-center md:items-end md:pr-3 lg:pr-6 my-5 md:my-0">
                                <div className="flex w-80 md:w-80 lg:w-96 flex-col p-6 dark:bg-black rounded-2xl">
                                    <div className="flex text-3xl">Staking</div>
                                    <div className="flex">
                                        <div className="flex flex-col w-1/2 p-4">
                                            <div className="flex dark:text-teal-100">Earned</div>
                                            <div className="flex dark:text-teal-100 font-bold">
                                                {Reward ? (
                                                    <div>
                                                        <div className="mb-4 text-lg whitespace-nowrap  ">
                                                            {Math.floor(Reward * 10000) / 10000} SDIV
                                                        </div>
                                                        <button className="btn w-full dark:bg-teal-600 border-none outline-none text-sm rounded-2xl" onClick={harvest}>Harvest</button>
                                                    </div>
                                                ) : (
                                                    <div>-</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-1/2 p-4">
                                            <div className="flex dark:text-teal-100">PROFIT staked</div>
                                            <div className="flex dark:text-teal-100 font-bold">
                                                <div className="text-lg">
                                                    {Math.floor(stakedBalance * 100000) / 100000} {pool.stake}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/2 flex-col items-center md:items-start md:pr-3 lg:pl-6 my-5 md:my-0">
                                <div className="flex w-80 md:w-80 lg:w-96 flex-col p-6 dark:bg-black rounded-2xl">
                                    <div className="flex text-3xl">Dividends</div>
                                    <div className="flex">
                                        <div className="flex flex-col w-1/2 p-4">
                                            <div className="flex dark:text-teal-100">Earned</div>
                                            <div className="flex dark:text-teal-100 font-bold">
                                                {pendingPayment ? (
                                                    <div>
                                                        <div className="mb-4 text-xl whitespace-nowrap  ">
                                                            {Math.floor(pendingPayment * 10000) / 10000} WETH
                                                        </div>
                                                        <button className="btn w-full dark:bg-teal-600 border-none outline-none text-sm rounded-2xl" onClick={releasePayment}>ReleasePayment</button>
                                                    </div>
                                                ) : (
                                                    <div>-</div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="flex flex-col w-1/2 p-4">
                                            <div className="flex dark:text-teal-100">SDIV in wallet</div>
                                            <div className="flex dark:text-teal-100 font-bold">
                                                <div className="text-xl">
                                                    {Math.floor(sdivbalance * 10000) / 10000}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap md:py-3 justify-center md:my-3">
                            <div className="flex w-full md:w-1/2 flex-col items-center md:items-end md:pr-3 lg:pr-6 my-5 md:my-0">
                                <div className="flex w-80 md:w-80 lg:w-96 h-40 flex-col p-6 dark:bg-black rounded-2xl">
                                    <div className="flex text-3xl">PROFIT</div>
                                    <div className="flex">
                                        <table className="table-auto w-full">
                                            <tbody>
                                                <tr>
                                                    <td>Price</td>
                                                    <td>{profitpriceIn$ ? `$${profitpriceIn$}` : "-"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Marketcap</td>
                                                    <td >{token.totalSupply && profitpriceIn$ ? (<span>${(profitpriceIn$ * (token ? token.totalSupply : 0))}</span>) : '-'}</td>                                                </tr>
                                                <tr>
                                                    <td>Total supply</td>
                                                    <td>{token ? (token.totalSupply * 1) : ''}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/2 flex-col items-center md:items-start md:pr-3 lg:pl-6 my-5 md:my-0">
                                <div className="flex w-80 md:w-80 lg:w-96 flex-col h-40 p-6 dark:bg-black rounded-2xl">
                                    <div className="flex text-3xl">SDIV</div>
                                    <div className="flex">
                                        <table className="table-auto w-full">
                                            <tbody>
                                                <tr>
                                                    <td>New SDIV/block</td>
                                                    <td>{mintedReward}</td>
                                                </tr>
                                                <tr>
                                                    <td>Total supply</td>
                                                    <td>{sdivsupply?sdivsupply:"-"}</td>
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
