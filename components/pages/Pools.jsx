import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import poolAbi from '@/components/abis/poolAbi'
import tokenAbi from '@/components/abis/tokenAbi'
import addresses from 'addresses'
import { showAlert } from '@/components/common/alert'
function Pools() {
    const { account, chainId, library } = useWeb3React()
    const [stakedBalance, setstakedBalance] = useState(0)
    const [Reward, setReward] = useState(0)
    const [stakeNow, setstakeNow] = useState("")
    const [unStakeNow, setunStakeNow] = useState("")
    const poolAddress = "0xF88f5591beE2C9F05b2D894FC86e86c37F7e869f"

    useEffect(() => {
        if (account) {
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
                <div className="max-w-sm p-5 bg-white shadow-2xl w-96 rounded-3xl dark:bg-gray-900">
                    <div className="flex items-center justify-between mb-2 text-center dark:text-white">
                        <h2 className="text-2xl font-Roboto">POOL</h2>
                        <h2 className="text-2xl font-Roboto">PROFIT/WETH</h2>
                    </div>
                    <div className="p-2 bg-gray-100 rounded-lg dark:bg-gray-800" >
                        <h1 className=" font-Roboto">Staking: {Math.floor((stakedBalance * 2.32925) * 1000) / 1000} PROFIT</h1>
                        <div className="flex flex-row items-center justify-between mb-2">
                            <h1 className=" font-Roboto">Earned: {Math.floor(Reward * 1000) / 1000} ETH</h1>
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
                </div>
            </div >
        </section>
    )
}

export default Pools
