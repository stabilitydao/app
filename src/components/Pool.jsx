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
        <div className="flex flex-col flex-1 w-full m-5 overflow-hidden bg-white shadow-2xl md:w-2/3 lg:w-1/2 rounded-3xl dark:bg-gray-900">
            <div className="p-3 text-3xl text-center dark:bg-gray-800">{name}</div>
            <div className="p-5">Stake {pool.stake} to earn {pool.earn}</div>
            <div className="px-5 ">
                <table className="w-full text-sm table-auto bg-blend-darken">
                    <tbody>
                        <tr>
                            <td className="py-1 text-lg">Contract</td>
                            <td className="py-1 pl-6 text-xs text-right">{network ? (
                                <a className="relative" title="View contract on Etherscan" target="_blank" href={networks[network].explorerurl.concat(pool.contract)} rel="noopener noreferrer"><span className="absolute right-0 bottom-3" style={{ color: networks[network].color }}>{networks[network].name}</span> {pool.contract}</a>
                            ) : null}</td>
                        </tr>
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
                <div className="p-5 text-center">
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
                <div className="p-5" >
                    {/* {
                        Approve &&
                    } */}
                    {
                        Approve ?
                            <div>
                                <table className="w-full text-sm table-auto bg-blend-darken">
                                    <tbody>
                                        <tr>
                                            <td className="py-1 text-lg">Staked</td>
                                            <td className="py-1 text-lg text-right">
                                                {Math.floor(stakedBalance * 100000) / 100000} {pool.stake}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 text-lg">Earned</td>
                                            <td className="py-1 text-lg text-right">
                                                {Reward > 0 ? (
                                                    <div>
                                                        <button className="btn text-sm rounded-2xl mr-2" onClick={harvest}>Harvest</button> {Math.floor(Reward * 100000000) / 100000000} {pool.earn}
                                                    </div>
                                                ) : (
                                                    <div>-</div>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="my-4">
                                    <div className="flex">
                                        <button className={`p-4 text-2xl font-bold ${wantTOStake ? "" : "text-gray-500"}`} onClick={() => { setwantTOStake(true) }}>Stake {pool.stake}</button>
                                        <button className={`p-4 text-2xl font-bold ${wantTOStake ? "text-gray-500" : ""}`} onClick={() => { setwantTOStake(false) }}>Unstake</button>
                                    </div>
                                    {
                                        wantTOStake ?
                                            <div>
                                                <div className="flex justify-between mb-1 pr-1">
                                                    <span>Balance</span>
                                                    <span>{tokenBalance > 0 ? Math.floor(tokenBalance * 100) / 100 : 0}</span>
                                                </div>
                                                <div className="flex text-gray-900 relative">
                                                    <input type="text" onChange={(e) => { setstakeNow(e.target.value) }} value={stakeNow} className="w-full px-5 py-3 rounded-xl bg-gray-100 border-2 border-indigo-500 outline-none dark:bg-black dark:text-white" min="0" placeholder="0.0" />
                                                    <div className="absolute right-4 top-3.5">
                                                        <span onClick={() => { setstakeNow(Math.floor(tokenBalance * 100) / 100) }} className="cursor-pointer px-3 py-1 bg-indigo-200 border-indigo-500 rounded-2xl dark:bg-indigo-900 dark:text-white">
                                                            MAX
                                                        </span>
                                                        <span className="mx-2 text-indigo-500">|</span>
                                                        <span className="font-bold dark:text-white">{pool.stake}</span>
                                                    </div>
                                                </div>

                                                <div className="flex my-5">
                                                    <button className="btn w-full rounded-xl h-12" onClick={stake}>Stake</button>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <div className="flex justify-between mb-1 pr-1">
                                                    <span>Staked</span>
                                                    <span>{Math.floor(stakedBalance * 100) / 100}</span>
                                                </div>
                                                <div className="flex relative">
                                                    <input type="text" onChange={(e) => { setunStakeNow(e.target.value) }} value={unStakeNow} className="w-full px-5 py-3 rounded-xl bg-gray-100 border-2 border-indigo-500 outline-none dark:bg-black dark:text-white" min="0" placeholder="0.0" />
                                                    <div className="absolute right-4 top-3.5 ">
                                                        <span onClick={() => { setunStakeNow(stakedBalance) }} className="cursor-pointer px-3 py-1 bg-indigo-200 border-indigo-500 rounded-2xl dark:bg-indigo-900 dark:text-white">
                                                            MAX
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex my-5">
                                                    <button className="btn w-full rounded-xl h-12" onClick={unStake}>Unstake</button>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                            :
                            <button className="btn w-full rounded-xl h-12" onClick={upprove}>Approve {pool.stake}</button>
                    }
                </div >
            }
        </div>
    )
}

export default Pool
