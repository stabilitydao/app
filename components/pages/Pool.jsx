import React, { useState, useEffect } from 'react'
import poolAbi from '@/components/abis/poolAbi'
import { useWeb3React } from '@web3-react/core'
import tokenAbi from '@/components/abis/tokenAbi'
import addresses from 'addresses'
import { networks } from "../wallet/networks";
import { updateIsWalletOption } from "@/redux/slices/modalsSlice";
import { useDispatch } from 'react-redux'
function Pool({ name, pool, network }) {
    const dispatch = useDispatch()
    const { account, chainId, library } = useWeb3React()
    const [stakedBalance, setstakedBalance] = useState(0)
    const [Reward, setReward] = useState(0)
    const [stakeNow, setstakeNow] = useState("")
    const [unStakeNow, setunStakeNow] = useState("")
    const [TVL, setTVL] = useState("")
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
            const value = await poolContract.methods.pendingWETH(account).call()
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
            poolContract.methods.pendingWETH(account).call().then((value) => {
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
                    <h1 className=" font-Roboto">TVL: {Math.floor(TVL * 100000) / 100000} PROFIT</h1>
                    <h1 className=" font-Roboto">Staking: {Math.floor(stakedBalance * 100000) / 100000} PROFIT</h1>
                    <div className="flex flex-row items-center justify-between mb-2">
                        <h1 className=" font-Roboto">Earned: {Math.floor(Reward * 100000) / 100000} ETH</h1>
                        <button className="btn" onClick={harvest}>Harvest</button>
                    </div>
                    <div className="flex flex-row items-center justify-between mb-2">
                        <input type="number" onChange={(e) => { setstakeNow(e.target.value) }} value={stakeNow} className="px-4 py-1 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" min="0" />
                        <button className="btn" onClick={stake}>Stake</button>
                    </div>
                    <div className="flex flex-row items-center justify-between mb-2">
                        <input type="number" onChange={(e) => { setunStakeNow(e.target.value) }} value={unStakeNow} className="px-4 py-1 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" min="0" />
                        <button className="btn" onClick={unStake}>UnStake</button>
                    </div>
                </div >
            }
        </div>
    )
}

export default Pool
