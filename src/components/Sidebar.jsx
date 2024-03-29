import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BsGithub, BsTelegram, BsTwitter, BsDiscord, BsPatchPlusFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { lpv3 } from '@/src/wallet/swaps'
import { RiGovernmentFill } from 'react-icons/ri'
import { BiServer, BiCoin, BiGroup } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { updateSidebar } from '@/redux/slices/sidebarSlice'
import { GiRegeneration } from "react-icons/gi";
import { GiProfit } from "react-icons/gi";
import { useWeb3React } from '@web3-react/core'
import { updateProfitPrice, updateEthPrice } from "@/redux/slices/priceSlice";
import univ3prices from '@thanpolas/univ3prices';
import uniV3PoolAbi from '@/src/abis/uniV3PoolAbi'
import WEB3 from '@/src/functions/web3'
import { updateProfitPriceIn$ } from '@/redux/slices/profitPriceSlice'
import { useRouter } from 'next/router'
function Sidebar({ Mode }) {
    const { pathname } = useRouter();
    const [activeRoute, setactiveRoute] = useState(null)
    const web3 = WEB3()
    const ethPrice = useSelector(state => state.price.ethPrice)
    const [btcethPrice, setbtcethPrice] = useState()
    const [btcPrice, setbtcPrice] = useState()
    const [maticPrice, setmaticPrice] = useState()
    const profitPrice = useSelector(state => state.price.value)
    const currentNetwork = useSelector(state => state.network.value)
    const profitpriceIn$ = useSelector(state => state.profitpriceIn$.value)
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.sidebar.value)
    const { chainId, library, } = useWeb3React()
    const network = chainId ? chainId : currentNetwork
    const rpcLib = chainId ? library : web3

    useEffect(() => {
        setactiveRoute(pathname)
    }, [pathname])
    useEffect(() => {
        if (lpv3[network] !== null && web3) {
            let token1 = null;
            if (lpv3[network] instanceof Object) {
                if (lpv3[network].DAI) {
                    token1 = 'DAI'
                } else if (lpv3[network].ETH) {
                    token1 = 'ETH'
                }
            }
            if (token1) {
                let contract = new rpcLib.eth.Contract(uniV3PoolAbi, lpv3[network][token1]);
                contract.methods.slot0().call().then((slot0) => {
                    dispatch(updateProfitPrice([
                        univ3prices([18, 18], slot0[0]).toAuto({ reverse: true, decimalPlaces: 8, }),
                        token1
                    ]))
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                dispatch(updateProfitPrice([
                    0, ''
                ]))
            }

            if (lpv3[network].DAIETH) {
                const ethPriceContract = new rpcLib.eth.Contract(uniV3PoolAbi, lpv3[network].DAIETH);
                ethPriceContract.methods.slot0().call().then((price) => {
                    dispatch(updateEthPrice(2 ** 192 / price[0] ** 2))
                }).catch((err) => {
                    console.log(err)
                })
            } else if (lpv3[network].USDCETH) {
                const ethPriceContract = new rpcLib.eth.Contract(uniV3PoolAbi, lpv3[network].USDCETH);
                ethPriceContract.methods.slot0().call().then((price) => {
                    dispatch(updateEthPrice(univ3prices([6, 18], price[0]).toAuto({ reverse: false, decimalPlaces: 8, })))
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                dispatch(updateEthPrice(null))
            }

            if (lpv3[network].MATICUSDC) {
                const v3pool = new rpcLib.eth.Contract(uniV3PoolAbi, lpv3[network].MATICUSDC);
                v3pool.methods.slot0().call().then((price) => {
                    setmaticPrice(univ3prices([18, 6], price[0]).toAuto({ reverse: true, decimalPlaces: 8, }))
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                setmaticPrice(null)
            }

            if (lpv3[network].BTCETH) {
                const v3pool = new rpcLib.eth.Contract(uniV3PoolAbi, lpv3[network].BTCETH);
                v3pool.methods.slot0().call().then((price) => {
                    setbtcethPrice(univ3prices([8, 18], price[0]).toAuto({ reverse: true, decimalPlaces: 8, }))
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                setbtcethPrice(null)
            }
        } else {
            dispatch(updateProfitPrice([
                0, ''
            ]))
            dispatch(updateEthPrice(null))
        }

        if (profitPrice && ethPrice) {
            dispatch(updateProfitPriceIn$(Math.floor(profitPrice * ethPrice * 10000000) / 10000000))
        } else {
            dispatch(updateProfitPriceIn$(null))
        }

        if (btcethPrice && ethPrice) {
            setbtcPrice(ethPrice * btcethPrice)
        } else {
            setbtcPrice(null)
        }

    }, [network, web3])

    return (
        <aside style={{ backgroundColor: Mode ? '#160024' : 'rgba(255,255,255,1)' }} className={`flex flex-col lg:h-screen justify-between overflow-y-auto fixed z-20 top-0 bottom-0 text-black bg-white shadow-900 dark:text-white w-72 xl:w-80 lg:static  duration-300  ${sidebar ? "left-0" : " -left-96"}`}>
            <div className="flex flex-col mb-8">
                <Link href="/">
                    <div style={{ height: 72, paddingLeft: 18 }} className="flex items-center py-2 cursor-pointer" onClick={() => { dispatch(updateSidebar(false)) }}>
                        {/*<img src="/logo40z.png" alt="Stability" className="h-10" />*/}
                        <span className="ml-3.5 text-xl font-bold">STABILITY DAO</span>
                    </div>
                </Link>
                <ul className="mt-1">
                    <li><Link href="/"><a className={`${activeRoute === "/" ? "bg-indigo-600  text-white " : "text-black dark:text-white"} flex items-center py-2.5 text-xl pl-7 gap-x-2 `} onClick={() => { dispatch(updateSidebar(false)) }} ><AiFillHome className="mr-2" />Home</a></Link></li>
                    <li><Link href="/dividends"><a className={`${activeRoute === "/dividends" ? "bg-indigo-600 text-white " : "text-black dark:text-white"} flex items-center py-2.5 text-xl pl-7 gap-x-2 `} onClick={() => { dispatch(updateSidebar(false)) }} ><GiProfit className="mr-2" />Dividends</a></Link></li>
                    <li><Link href="/governance"><a className={`${activeRoute === "/governance" ? "bg-indigo-600  text-white " : "text-black dark:text-white"} flex items-center py-2.5 text-xl pl-7 gap-x-2 `} onClick={() => { dispatch(updateSidebar(false)) }} ><RiGovernmentFill className="mr-2" />Governance</a></Link></li>
                    {/*<li><Link href="/profitmaker"><a className={`${activeRoute === "/profitmaker" ? "bg-indigo-600  text-white " : "text-black dark:text-white"} flex items-center py-2.5 text-xl pl-7 gap-x-2 `} onClick={() => { dispatch(updateSidebar(false)) }} ><BsPatchPlusFill className="mr-2" />Profit Maker</a></Link></li>*/}
                </ul>
                <ul className="mt-5">
                    <li><Link href="/tokens"><a className={`${activeRoute === "/tokens" ? "bg-indigo-600  text-white " : "text-black dark:text-white"} flex items-center py-2.5 text-xl pl-7 gap-x-2 `} onClick={() => { dispatch(updateSidebar(false)) }} ><BiCoin className="mr-2" />Tokens</a></Link></li>
                    <li><Link href="/team"><a className={`${activeRoute === "/team" ? "bg-indigo-600 text-white " : "text-black dark:text-white"} flex items-center py-2.5 text-xl pl-7 gap-x-2 `} onClick={() => { dispatch(updateSidebar(false)) }} ><BiGroup className="mr-2" />Team</a></Link></li>
                    {/* <li><Link href="/faq"><a className={`${activeRoute === "/faq" ? "bg-indigo-600 text-white " : "text-black dark:text-white"} flex items-center py-2.5 text-xl pl-7 gap-x-2 `} onClick={() => { dispatch(updateSidebar(false)) }} ><BiGroup className="mr-2" />Faq</a></Link></li> */}
                </ul>
            </div>
            <div className="flex flex-col items-center w-72 md:w-56 xl:w-60 bottom-2 gap-y-1">
                <table className="w-50 mb-6">
                    <tbody>
                        <tr>
                            <td className="w-16">
                                {btcPrice ? 'BTC' : null}
                            </td>
                            <td className="text-right">
                                {btcPrice ? `${(Math.floor(btcPrice * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+(.\d+)$)/g, '$& ')}` : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="w-16">
                                {ethPrice ? 'ETH' : null}
                            </td>
                            <td className="text-right">
                                {ethPrice ? `${(Math.floor(ethPrice * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+(.\d+)$)/g, '$& ')}` : null}
                            </td>
                        </tr>
                        <tr>
                            <td className="w-16">
                                {maticPrice ? 'MATIC' : null}
                            </td>
                            <td className="text-right">
                                {maticPrice ? `${Math.floor(maticPrice * 100) / 100}` : null}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {profitPrice && ethPrice ? 'PROFIT' : null}
                            </td>
                            <td className="text-right">
                                {profitPrice && ethPrice ? `${Math.floor(profitpriceIn$ * 100) / 100}` : null}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ul className="flex justify-center text-center gap-x-5 mb-4">
                    <li><a href="https://github.com/stabilitydao" target="_blank" rel="noopener noreferrer"><BsGithub className="text-3xl cursor-pointer dark:text-white text-black" /></a></li>
                    <li><a href="https://twitter.com/stabilitydao" target="_blank" rel="noopener noreferrer"><BsTwitter className="text-3xl cursor-pointer dark:text-white text-black" /></a></li>
                    <li><a href="https://t.me/stabilitydao" target="_blank" rel="noopener noreferrer" ><BsTelegram className="text-3xl cursor-pointer dark:text-white text-black" /></a></li>
                    <li><a href="https://discord.gg/R3nnetWzC9" target="_blank" rel="noopener noreferrer" ><BsDiscord className="text-3xl cursor-pointer dark:text-white text-black" /></a></li>
                </ul>
                <div className="my-1 text-sm mb-4 dark:text-gray-300">
                    © 2023 Stability DAO
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
