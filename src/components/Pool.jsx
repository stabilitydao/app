import React, { useState, useEffect } from 'react'
import poolAbi from '@/src/abis/poolAbi'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import tokenAbi from '@/src/abis/tokenAbi'
import addresses from 'addresses'
import { networks } from "../wallet/networks";
import { updateIsWalletOption } from "@/redux/slices/modalsSlice";
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '@/src/components/alert'
import { updateTokenbalance } from '@/redux/slices/tokenbalanceSlice'
import { updateBalance } from '@/redux/slices/balanceSlice'
import {MdGeneratingTokens} from "react-icons/md";
function Pool({ name, pool, network }) {
    const [Approve, setApprove] = useState(false)
    const [wantTOStake, setwantTOStake] = useState(true)
    const dispatch = useDispatch()
    const { account, chainId, library } = useWeb3React()
    const [stakedBalance, setstakedBalance] = useState(0)
    const [Reward, setReward] = useState(0)
    const [stakeNow, setstakeNow] = useState("")
    const [unStakeNow, setunStakeNow] = useState("")
    const [TVL, setTVL] = useState("")
    const tokenBalance = useSelector(state => state.tokenBalance.value)
    async function stake() {
        if (stakeNow !== '' && !(stakeNow <= 0) && Approve && !(stakeNow > tokenBalance)) {
            try {
                const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(pool.contract));
                await poolContract.methods.stake(library.utils.toWei(`${stakeNow}`, 'ether')).send({ from: account })
                const staked = await poolContract.methods.userInfo(account).call()
                setstakedBalance(library.utils.fromWei(staked[0], 'ether'))
                const tokenContract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
                const tokenBalance = await tokenContract.methods.balanceOf(account).call()
                dispatch(updateTokenbalance(library.utils.fromWei(tokenBalance)))
                const tvl = await tokenContract.methods.balanceOf(pool.contract).call()
                const tvlInEther = library.utils.fromWei(tvl, 'ether')
                setTVL(tvlInEther)
                setstakeNow("")
            } catch (err) {
                console.log(err)
            }
        } else {
            showAlert("Failed")
        }
    }
    async function upprove() {
        if (!Approve) {
            try {
                const tokenContract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
                await tokenContract.methods.approve(pool.contract, ethers.constants.MaxUint256).send({ from: account })
                setApprove(true)
            } catch (err) {
                console.log(err)
            }
        } else {
            showAlert("Failed")
        }
    }
    async function unStake() {
        if (unStakeNow !== '' && !(unStakeNow <= 0) && !(unStakeNow > stakedBalance)) {
            try {
                const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(pool.contract));
                await poolContract.methods.unstake(library.utils.toWei(`${unStakeNow}`, 'ether')).send({ from: account })
                const staked = await poolContract.methods.userInfo(account).call()
                setstakedBalance(library.utils.fromWei(staked[0], 'ether'))
                const tokenContract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
                const tokenBalance = await tokenContract.methods.balanceOf(account).call()
                dispatch(updateTokenbalance(library.utils.fromWei(tokenBalance)))
                const TVL = await tokenContract.methods.balanceOf(pool.contract).call()
                setTVL(library.utils.fromWei(TVL, 'ether'))
                setunStakeNow('')
            } catch (err) {
                console.log(err)
            }
        } else {
            showAlert("Failed")
        }
    }
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
    useEffect(() => {
        if (account && Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString())) {
            library.eth.getBalance(account).then((balance) => {
                return library.utils.fromWei(balance, "ether")
            }).then((eths) => {
                dispatch(updateBalance(eths))
            })
            const tokenContract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
            tokenContract.methods.balanceOf(account).call().then((result) => {
                return library.utils.fromWei(result);
            }).then((tokenBalance) => {
                dispatch(updateTokenbalance(tokenBalance))
            })
        }
        if (account && pool.contract) {
            const tokenContract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
            tokenContract.methods.balanceOf(pool.contract).call().then((TVL) => {
                setTVL(library.utils.fromWei(TVL, 'ether'))
            })
            tokenContract.methods.allowance(account, pool.contract).call().then((approveAmount) => {
                if (approveAmount == 115792089237316195423570985008687907853269984665640564039457584007913129639935) {
                    setApprove(true)
                }
            })
            const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(pool.contract));
            poolContract.methods.userInfo(account).call().then((staked) => {
                return library.utils.fromWei(staked[0], 'ether')
            }).then((stakedBalance) => {
                setstakedBalance(stakedBalance)
            })
            poolContract.methods.pending(account).call().then((value) => {
                return library.utils.fromWei(value, 'ether')
            }).then((reward) => {
                setReward(reward)
            })
        }
    }, [account, chainId])

    return (
        <div className="flex flex-col w-full m-5 overflow-hidden bg-white shadow-2xl rounded-3xl dark:bg-gray-900 min-w-full">
            <div className="p-3 text-3xl text-center dark:bg-teal-900 dark:text-teal-100 font-bold">{name}</div>
            <div className="w-full text-sm dark:bg-gray-800">
                {network ? (
                    <a className="flex justify-center h-9 items-center" title="View contract on Etherscan" target="_blank" href={networks[network].explorerurl.concat(pool.contract)} rel="noopener noreferrer">
                        <span className="hidden justify-center text-xs md:text-sm self-center" style={{ color: networks[network].color }}>{networks[network].name}</span>
                        <span className="flex justify-center text-xs md:text-sm self-center dark:text-teal-400">{pool.contract}</span>
                    </a>
                ) : null}
            </div>
            <div className="px-7 py-4 flex">
                <div className="flex self-center w-1/3">
                    <img src="/profit.svg" alt="profit" width="100" className="w-8 mx-2" />
                    <MdGeneratingTokens className="self-center "/>
                    <img src="/SDIV.svg" alt="profit" width="100" className="w-8 mx-2" />
                </div>
                <div className="flex self-center w-2/3 justify-center">Stake {pool.stake} to earn {pool.earn}</div>
            </div>
            <div className="px-7 ">
                <table className="w-full text-sm table-auto bg-blend-darken">
                    <tbody>
                        <tr>
                            <td className="py-1 text-lg">TVL</td>
                            <td className="py-1 text-lg text-right">
                                {Math.floor(TVL * 100000) / 100000} {pool.stake}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {!account ? (
                <div className="p-7 text-center">
                    <button
                        type="button"
                        className="w-40 h-10 btn rounded-2xl"
                        id="options-menu"
                        onClick={() => dispatch(updateIsWalletOption(true))}
                    >
                        Connect Wallet
                    </button>
                </div>
            ) :
                <div className="p-7" >
                    {
                        Approve ?
                            <div>
                                <div className="flex dark:bg-teal-900 rounded-2xl" style={{/*{backgroundColor: '#fffeee'}*/}}>
                                    <div className="flex flex-col w-1/2 p-4">
                                        <div className="flex dark:text-teal-100">Earned</div>
                                        <div className="flex dark:text-teal-100 font-bold">
                                            {Reward > 0 ? (
                                                <div>
                                                    <div className="mb-4 text-xl whitespace-nowrap">
                                                        {Math.floor(Reward * 10000) / 10000} {pool.earn}
                                                    </div>
                                                    <button className="btn w-full dark:bg-teal-600 border-none outline-none text-sm rounded-2xl" onClick={harvest}>Harvest</button>
                                                </div>
                                            ) : (
                                                <div>-</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-1/2 p-4">
                                        <div className="flex dark:text-teal-100">Staked</div>
                                        <div className="flex dark:text-teal-100 font-bold">
                                            <div className="text-xl">
                                                {Math.floor(stakedBalance * 100000) / 100000} {pool.stake}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <div className="flex">
                                        <button className={`w-1/2 p-4 text-xl font-bold ${wantTOStake ? "" : "text-gray-500"}`} onClick={() => { setwantTOStake(true) }}>Stake</button>
                                        <button className={`w-1/2 p-4 text-xl font-bold ${wantTOStake ? "text-gray-500" : ""}`} onClick={() => { setwantTOStake(false) }}>Unstake</button>
                                    </div>
                                    {
                                        wantTOStake ?
                                            <div>
                                                <div className="flex justify-between mb-1 pr-1 text-sm">
                                                    <span />
                                                    <span>Balance: {tokenBalance > 0 ? Math.floor(tokenBalance * 1000000000) / 1000000000 : 0}</span>
                                                </div>
                                                <div className="flex text-gray-900 relative">
                                                    <input type="text" onChange={(e) => { setstakeNow(e.target.value) }} value={stakeNow} className="w-full pl-5 py-3 rounded-xl bg-gray-100 border-2 border-indigo-500 dark:border-indigo-700 outline-none dark:bg-black dark:text-white" min="0" placeholder="0.0" />
                                                    <div className="absolute right-4 top-3.5">
                                                        <span onClick={() => { setstakeNow(tokenBalance) }} className="cursor-pointer px-3 py-1 bg-indigo-200 border-indigo-500 rounded-2xl dark:bg-indigo-900 dark:text-white text-sm">
                                                            MAX
                                                        </span>
                                                        <span className="mx-2 text-indigo-500">|</span>
                                                        <span className="font-bold dark:text-white">{pool.stake}</span>
                                                    </div>
                                                </div>

                                                <div className="flex my-5">
                                                    <button className="btn w-full rounded-xl h-12 dark:bg-indigo-700" onClick={stake}>Stake</button>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <div className="flex justify-between mb-1 pr-1 text-sm">
                                                    <span />
                                                    <span>Staked: {Math.floor(stakedBalance * 1000000000) / 1000000000}</span>
                                                </div>
                                                <div className="flex relative">
                                                    <input type="text" onChange={(e) => { setunStakeNow(e.target.value) }} value={unStakeNow} className="w-full pl-5 py-3 rounded-xl bg-gray-100 border-2 border-indigo-500 dark:border-indigo-700 outline-none dark:bg-black dark:text-white" min="0" placeholder="0.0" />
                                                    <div className="absolute right-4 top-3.5 ">
                                                        <span onClick={() => { setunStakeNow(stakedBalance) }} className="cursor-pointer px-3 py-1 bg-indigo-200 border-indigo-500 rounded-2xl dark:bg-indigo-900 dark:text-white text-sm">
                                                            MAX
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex my-5">
                                                    <button className="btn w-full rounded-xl h-12 dark:bg-indigo-700" onClick={unStake}>Unstake</button>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                            :
                            <button className="btn w-full rounded-xl h-12" onClick={upprove}>Enable</button>
                    }
                </div >
            }
        </div>
    )
}

export default Pool
