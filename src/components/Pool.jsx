import React, { useState, useEffect } from 'react'
import poolAbi from '@/src/abis/poolAbi'
import { useWeb3React } from '@web3-react/core'
import tokenAbi from '@/src/abis/tokenAbi'
import addresses from 'addresses'
import { networks } from "../wallet/networks";
import { updateIsWalletOption } from "@/redux/slices/modalsSlice";
import { useDispatch, useSelector } from 'react-redux'
import {showAlert} from '@/src/components/alert'

function Pool({ name, pool, network }) {
    const dispatch = useDispatch()
    const { account, chainId, library } = useWeb3React()
    const [stakedBalance, setstakedBalance] = useState(0)
    const [Reward, setReward] = useState(0)
    const [stakeNow, setstakeNow] = useState("")
    const [unStakeNow, setunStakeNow] = useState("")
    const [TVL, setTVL] = useState("")
    const tokenBalance = useSelector(state => state.tokenBalance.value)
    async function stake() {
        if (stakeNow !== '') {
            try {
                const tokenContract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
                await tokenContract.methods.approve(pool.contract, library.utils.toWei(`${stakeNow}`, 'ether')).send({ from: account })
                const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(pool.contract));
                await poolContract.methods.stake(library.utils.toWei(`${stakeNow}`, 'ether')).send({ from: account })
                const staked = await poolContract.methods.userInfo(account).call()
                setstakedBalance(library.utils.fromWei(staked[0], 'ether'))
                tokenContract.methods.balanceOf(pool.contract).call().then((TVL) => {
                    setTVL(library.utils.fromWei(TVL, 'ether'))
                })
                setstakeNow('')
            } catch (err) {
                console.log(err)
            }
        } else {
            showAlert("Nothing")
        }
    }
    async function unStake() {
        if (unStakeNow !== '') {
            try {
                const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(pool.contract));
                await poolContract.methods.unstake(library.utils.toWei(`${unStakeNow}`, 'ether')).send({ from: account })
                const staked = await poolContract.methods.userInfo(account).call()
                setstakedBalance(library.utils.fromWei(staked[0], 'ether'))
                const tokenContract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
                tokenContract.methods.balanceOf(pool.contract).call().then((TVL) => {
                    setTVL(library.utils.fromWei(TVL, 'ether'))
                })
                setunStakeNow('')
            } catch (err) {
                console.log(err)
            }
        } else {
            showAlert("Nothing")
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
        if (account && pool.contract) {
            const tokenContract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
            tokenContract.methods.balanceOf(pool.contract).call().then((TVL) => {
                setTVL(library.utils.fromWei(TVL, 'ether'))
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
    }, [chainId])
    return (
        <div className="flex flex-col flex-1 w-full m-5 overflow-hidden bg-white shadow-2xl md:w-2/3 lg:w-1/2 rounded-3xl dark:bg-gray-900">
            <div className="p-3 text-3xl text-center dark:bg-gray-800">{name}</div>
            <div className="p-5">Stake {pool.stake} to earn {pool.earn}</div>
            <div className="px-5">
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
                    <div className="mt-5 flex flex-row items-center justify-between mb-2">
                        <div className="flex border border-indigo-400 rounded-sm">
                            <input type="number" onChange={(e) => { setstakeNow(e.target.value) }} value={stakeNow} className="py-1 pl-2 text-base text-gray-700 placeholder-gray-400 bg-white rounded-lg appearance-none focus:outline-none focus:border-transparent" min="0" />
                            <h1 className="px-2 font-semibold cursor-pointer" onClick={() => { setstakeNow(Math.floor(tokenBalance * 100) / 100) }}>{Math.floor(tokenBalance * 100) / 100}</h1>
                        </div>
                        <button className="btn" onClick={stake}>Stake</button>
                    </div>
                    <div className="flex flex-row items-center justify-between mb-2">
                        <div className="flex border border-indigo-400 rounded-sm">
                            <input type="number" onChange={(e) => { setunStakeNow(e.target.value) }} value={unStakeNow} className="py-1 pl-2 text-base text-gray-700 placeholder-gray-400 bg-white rounded-lg appearance-none focus:outline-none focus:border-transparent" min="0" />
                            <h1 className="px-2 font-semibold cursor-pointer" onClick={() => { setunStakeNow(Math.floor(stakedBalance * 100) / 100) }}>{Math.floor(stakedBalance * 100) / 100}</h1>
                        </div>
                        <button className="btn" onClick={unStake}>UnStake</button>
                    </div>
                </div >
            }
        </div>
    )
}

export default Pool
