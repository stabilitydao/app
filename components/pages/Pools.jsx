import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import poolAbi from '@/components/abis/poolAbi'
import tokenAbi from '@/components/abis/tokenAbi'
import addresses, {MAINNET, ROPSTEN, RINKEBY} from 'addresses'
import { showAlert } from '@/components/common/alert'
import {useSelector} from "react-redux";
import {updateIsWalletOption} from "@/redux/slices/modalsSlice";
import { useDispatch } from 'react-redux'

function Pools() {
    const dispatch = useDispatch()
    const { account, chainId, library } = useWeb3React()
    const [stakedBalance, setstakedBalance] = useState(0)
    const [Reward, setReward] = useState(0)
    const [stakeNow, setstakeNow] = useState("")
    const [unStakeNow, setunStakeNow] = useState("")
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId ? chainId : currentNetwork

    const pools = {
        [ROPSTEN]: {
            PoolV0: {
                stake: 'PROFIT',
                earn: 'WETH',
                contract: "0xF88f5591beE2C9F05b2D894FC86e86c37F7e869f",
            },
        },
    };

    const poolAddress = pools[network] ? pools[network][Object.keys(pools[network])[0]].contract : null

    useEffect(() => {
        if (account && poolAddress) {
            const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(poolAddress));
            poolContract.methods.userInfo(account).call().then((staked) => {
                console.log(staked)
                console.log(library.utils.fromWei(staked[0], 'ether'))
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

    async function stake() {
        if (stakeNow !== '') {
            try {
                const tokenContract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
                await tokenContract.methods.approve(poolAddress, library.utils.toWei(`${1 / 2.32925 * stakeNow}`, 'ether')).send({ from: account })
                const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(poolAddress));
                await poolContract.methods.stake(library.utils.toWei(`${1 / 2.32925 * stakeNow}`, 'ether')).send({ from: account })
                const staked = await poolContract.methods.userInfo(account).call()
                setstakedBalance(library.utils.fromWei(staked[0], 'ether'))
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
                const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(poolAddress));
                await poolContract.methods.unstake(library.utils.toWei(`${1 / 2.32925 * unStakeNow}`, 'ether')).send({ from: account })
                const staked = await poolContract.methods.userInfo(account).call()
                setstakedBalance(library.utils.fromWei(staked[0], 'ether'))
            } catch (err) {
                console.log(err)
            }
        } else {
            showAlert("Nothing")
        }
    }
    async function harvest() {
        try {
            const poolContract = new library.eth.Contract(poolAbi, library.utils.toChecksumAddress(poolAddress));
            await poolContract.methods.harvest().send({ from: account })
            const value = await poolContract.methods.pendingWETH(account).call()
            const reward = library.utils.fromWei(value, 'ether')
            setReward(reward)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className="dark:bg-black dark:text-white h-calc">
            <div className="container p-4">
                <h1 className="mb-10 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Pools</h1>
                <div>
                    {pools[network] ? (
                        <div>
                            {Object.keys(pools[network]).map(name => {
                                const pool = pools[network][name]
                                return (
                                    <div key={name} className="flex justify-center">
                                        <div className="flex flex-col bg-white shadow-2xl w-full md:w-2/3 lg:w-1/2 xl:w-2/5 rounded-3xl overflow-hidden dark:bg-gray-900">
                                            <div className="dark:bg-gray-800 text-3xl p-3 text-center">{name}</div>
                                            <div className="p-5">Stake {pool.stake} to earn {pool.earn}</div>
                                            {!account ? (
                                                <div className="text-center p-5">
                                                    <button
                                                        type="button"
                                                        className="w-40 h-10 btn rounded-2xl"
                                                        id="options-menu"
                                                        onClick={() => dispatch(updateIsWalletOption(true))}
                                                    >
                                                        Connect Wallet
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="p-5">
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
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) :(
                        <div className="text-2xl text-center m-6">We currently have no pools on this network</div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Pools
