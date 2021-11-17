import React from 'react'
import addresses from 'addresses'
import networks from '../wallet/networks'
import {buyLinks, lpv3} from '../wallet/swaps'
import {useDispatch, useSelector} from "react-redux";
import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toastify';
import {updateProfitPrice} from "@/redux/slices/priceSlice";
import univ3prices from '@thanpolas/univ3prices';

function Ecosystem() {
    const dispatch = useDispatch()
    const { library, active, chainId, } = useWeb3React()
    const profitPrice = useSelector(state => state.price.value)
    const priceIn = useSelector(state => state.price.in)
    const currentNetwork = useSelector(state => state.network.value)
    const network = chainId ? chainId : currentNetwork

    async function handleProfitPrice() {
        if (lpv3[network] !== null) {
            try {
                const uniV3PoolAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"CollectProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid1","type":"uint256"}],"name":"Flash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextOld","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextNew","type":"uint16"}],"name":"IncreaseObservationCardinalityNext","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Initialize","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"feeProtocol0Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol0New","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1New","type":"uint8"}],"name":"SetFeeProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"int256","name":"amount0","type":"int256"},{"indexed":false,"internalType":"int256","name":"amount1","type":"int256"},{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Swap","type":"event"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"}],"name":"collect","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"}],"name":"collectProtocol","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal0X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal1X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"}],"name":"increaseObservationCardinalityNext","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"liquidity","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLiquidityPerTick","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mint","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint32","name":"blockTimestamp","type":"uint32"},{"internalType":"int56","name":"tickCumulative","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityCumulativeX128","type":"uint160"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"secondsAgos","type":"uint32[]"}],"name":"observe","outputs":[{"internalType":"int56[]","name":"tickCumulatives","type":"int56[]"},{"internalType":"uint160[]","name":"secondsPerLiquidityCumulativeX128s","type":"uint160[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"positions","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolFees","outputs":[{"internalType":"uint128","name":"token0","type":"uint128"},{"internalType":"uint128","name":"token1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"feeProtocol0","type":"uint8"},{"internalType":"uint8","name":"feeProtocol1","type":"uint8"}],"name":"setFeeProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"internalType":"int24","name":"tick","type":"int24"},{"internalType":"uint16","name":"observationIndex","type":"uint16"},{"internalType":"uint16","name":"observationCardinality","type":"uint16"},{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"},{"internalType":"uint8","name":"feeProtocol","type":"uint8"},{"internalType":"bool","name":"unlocked","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"snapshotCumulativesInside","outputs":[{"internalType":"int56","name":"tickCumulativeInside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityInsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsInside","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"zeroForOne","type":"bool"},{"internalType":"int256","name":"amountSpecified","type":"int256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[{"internalType":"int256","name":"amount0","type":"int256"},{"internalType":"int256","name":"amount1","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int16","name":"","type":"int16"}],"name":"tickBitmap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"","type":"int24"}],"name":"ticks","outputs":[{"internalType":"uint128","name":"liquidityGross","type":"uint128"},{"internalType":"int128","name":"liquidityNet","type":"int128"},{"internalType":"uint256","name":"feeGrowthOutside0X128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthOutside1X128","type":"uint256"},{"internalType":"int56","name":"tickCumulativeOutside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityOutsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsOutside","type":"uint32"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
                let contract = new library.eth.Contract(uniV3PoolAbi, lpv3[network]);
                const slot0 = await contract.methods.slot0().call();
                // const token1 = await contract.methods.token1().call();
                // console.log(slot0[0])
                dispatch(updateProfitPrice([
                    univ3prices([18, 18], slot0[0]).toAuto({reverse: true}),
                    'ETH' // token1
                ]))
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (chainId && lpv3[chainId]) {
        handleProfitPrice()
    }

    function handleConnect() {
        library.currentProvider.request({
            method: "wallet_watchAsset",
            params: {
                type: 'ERC20',
                options: {
                    address: addresses[chainId].token,
                    symbol: "PROFIT",
                    decimals: 18,
                    image: "https://stabilitydao.org/profit.svg",
                },
            }
        }).then(() => {
        }).catch((err) => {
            toast.error('Failed', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

    return (
        <section className="dark:bg-black dark:text-white h-calc">
            <div className="container w-11/12 py-8">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Ecosystem</h1>
                <ul className="p-4 lg:p-8 ">
                    <li>
                        <article className="mb-4">
                            <a className="p-4 lg:p-6 ">
                                <h1 className="mb-4 text-4xl sm:text-5xl font-Roboto ">Token</h1>
                                <div className="flex flex-wrap">
                                    <div className="w-full mb-4 lg:w-1/2 lg:mb-0">
                                        <div className="flex justify-center mb-2 text-center">
                                            <img src="/profit.svg" alt="profit" width="200" className="float-left my-2 ml-3 mr-7" />
                                            <div className="flex flex-col justify-between mt-1.5 pb-4">
                                                <div>
                                                    {buyLinks && buyLinks[network] ? (
                                                        <a className="mt-2" href={buyLinks[network]} target="_blank" rel="noopener noreferrer">
                                                            <button title="Buy PROFIT token" className="px-6 py-1 mr-2 text-xl rounded-md btn">
                                                                Buy
                                                            </button>
                                                        </a>
                                                    ) : null}
                                                </div>
                                                <div className="flex justify-center">
                                                    Price: {profitPrice} {priceIn}
                                                </div>
                                                <div className="flex justify-center">
                                                    {active &&
                                                    <button title="Add to wallet" className="flex text-xs text-black border-0 btn bg-cool-gray-300 dark:text-white dark:bg-true-gray-700 hover:bg-indigo-300 rounded-xl dark:hover:bg-true-gray-800" onClick={handleConnect}>
                                                        <img src="/wallets/metamask.png" className="h-4 mr-2" alt="Metamask"/>
                                                        Add
                                                    </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-center text-cool-gray-500">
                                            {networks && networks[network] ? (
                                                <a title="View Asset on Etherscan" target="_blank" href={networks[currentNetwork].explorerurl.concat(addresses[currentNetwork].token)} rel="noopener noreferrer">{addresses[currentNetwork].token}</a>
                                            ) : null}
                                        </p>
                                    </div>
                                    <div className="sm:w-full lg:w-1/2">
                                        <p className="p-0 text-lg">
                                            The native token PROFIT&apos;s primary purpose is to represent ownership shares of the Stability protocol. Given PROFIT holders are effectively owners of Stability, they will be entitled to a share of any additional profits generated by the protocol. Holding the token also allows investors to manage the Stability protocol collectively. Token entire supply was minted in Phase 0 and will be distributed in Phase 1.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </article>
                    </li>
                    <li>
                        <article className="mb-2">
                            <a className="p-4 overflow-hidden rounded-xl lg:p-6 ">
                                <h1 className="mb-4 text-4xl sm:text-5xl font-Roboto ">Governance</h1>
                                <p className="text-lg">
                                    PROFIT token holders with sufficient voting power can directly participate in the governance of the Stability protocol. These will be the only investors who can collectively change the organization’s resource distribution (mentioned below) and participate in critical decision-making processes involving the direction of the entire ecosystem.
                                </p>
                            </a>
                        </article>
                    </li>
                    <li>
                        <article className="mb-2">
                            <a className="p-4 overflow-hidden rounded-xl lg:p-6 ">
                                <h1 className="mb-4 text-4xl sm:text-5xl font-Roboto ">Builders</h1>
                                <p className="text-lg">
                                    <i>Stability Builders</i> are skilled individuals who directly contribute to the advancement of the entire ecosystem. These include github contributors (open-source developers), expert researchers from a variety of fields, top public relations & marketing personnel, and cybersecurity specialists.<br/>
                                    Governance will be tasked with creating the optimal conditions that allow these highly qualified contributors to build and improve upon the protocol at maximum efficiency.
                                </p>
                            </a>
                        </article>
                    </li>
                    <li>
                        <article className="mb-2">
                            <a className="p-4 overflow-hidden rounded-xl lg:p-6 ">
                                <h1 className="mb-4 text-4xl sm:text-5xl font-Roboto ">Generation</h1>
                                <p className="text-lg">
                                    <i>Profit Generation</i> is a broad term that encapsulates the process of delivering through developments a high level of value that’s necessary to earn profits. The process involves <i>Stability Builders</i> creating work units (smart contracts and decentralized applications) that become property of the Stability protocol and will essentially work for it. Clusters of work units (e.g. yield farms with a variety of features, AMMs, NFTs, etc.) being utilized in the same area are called <i>Profit Generators</i>.
                                </p>
                            </a>
                        </article>
                    </li>
                    <li>
                        <article>
                            <a className="p-4 overflow-hidden rounded-xl lg:p-6 ">
                                <h1 className="mb-4 text-4xl sm:text-5xl font-Roboto ">Resource distribution</h1>
                                <p className="text-lg">
                                    All profits generated by the organization through <i>Profit Generation</i> are divided between the token stakers, the development fund, and non-profit activities. Governance can change this allocation by following the criteria below:
                                </p>
                            </a>
                            <table className="text-sm table-auto bg-blend-darken lg:mx-8 md:text-xl">
                                <thead>
                                <tr>
                                    <th className="w-1/4">Profit Earner</th>
                                    <th className="w-1/4">Contract</th>
                                    <th className="w-1/4 text-center">Current share</th>
                                    <th className="w-1/4 text-right">Limits</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="py-1">Stakers</td>
                                    <td className="py-1">Pool</td>
                                    <td className="py-1 font-bold text-center">97%</td>
                                    <td className="py-1 text-right whitespace-nowrap">50% - 99%</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Builders</td>
                                    <td className="py-1">Development Fund</td>
                                    <td className="py-1 font-bold text-center">2.5%</td>
                                    <td className="py-1 text-right whitespace-nowrap">1% - 50%</td>
                                </tr>
                                <tr>
                                    <td className="py-1">People in need</td>
                                    <td className="py-1">Non-profit Fund</td>
                                    <td className="py-1 font-bold text-center">0.5%</td>
                                    <td className="py-1 text-right whitespace-nowrap">0.5% - 25%</td>
                                </tr>
                                </tbody>
                            </table>
                        </article>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Ecosystem
