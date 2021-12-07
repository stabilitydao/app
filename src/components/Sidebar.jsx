import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BsFillPeopleFill, BsGithub, BsTelegram, BsTwitter, BsDiscord } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { networks } from '@/src/wallet'
import { buyLinks, lpv3 } from '@/src/wallet/swaps'
import { RiGovernmentFill } from 'react-icons/ri'
import { BiServer, BiCoin, BiGroup } from 'react-icons/bi'
import { MdEditRoad } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { updateSidebar } from '@/redux/slices/sidebarSlice'
import { GiRegeneration } from "react-icons/gi";
import { useWeb3React } from '@web3-react/core'
import { updateProfitPrice } from "@/redux/slices/priceSlice";
import univ3prices from '@thanpolas/univ3prices';
import uniV3PoolAbi from '@/src/abis/uniV3PoolAbi'
import WEB3 from '@/src/functions/web3'
function Sidebar() {
    const web3 = WEB3()
    const [ethPrice, setethPrice] = useState()
    const profitPrice = useSelector(state => state.price.value)
    const priceIn = useSelector(state => state.price.in)
    const currentNetwork = useSelector(state => state.network.value)
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.sidebar.value)
    const { library, active, chainId, } = useWeb3React()
    const network = chainId ? chainId : currentNetwork

    useEffect(() => {
        if (lpv3[network] !== null) {
            let token1 = null;
            if (lpv3[network] instanceof Object) {
                if (lpv3[network].DAI) {
                    token1 = 'DAI'
                } else if (lpv3[network].ETH) {
                    token1 = 'ETH'
                }
            }
            if (token1) {
                let contract = new web3.eth.Contract(uniV3PoolAbi, lpv3[network][token1]);
                contract.methods.slot0().call().then((slot0) => {
                    dispatch(updateProfitPrice([
                        univ3prices([18, 18], slot0[0]).toAuto({ reverse: true, decimalPlaces: 2, }),
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
                const ethPriceContract = new web3.eth.Contract(uniV3PoolAbi, lpv3[network].DAIETH);
                ethPriceContract.methods.slot0().call().then((price) => {
                    setethPrice(2 ** 192 / price[0] ** 2)
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                setethPrice(null)
            }
        } else {
            dispatch(updateProfitPrice([
                0, ''
            ]))
            setethPrice(null)
        }
    }, [network])

    return (
        <aside className={`fixed z-20 top-0 bottom-0 h-screen text-black bg-white shadow dark:bg-gray-900 dark:text-white w-72 xl:w-80 lg:static  duration-300  ${sidebar ? "left-0" : " -left-96"}`}>
            <Link href="/">
                <div style={{ height: 72, paddingLeft: 18 }} className="flex items-center py-2 cursor-pointer" onClick={() => { dispatch(updateSidebar(false)) }}>
                    <img src="/logo_nolines_256.png" alt="Stability" className="h-10" />
                    <span className="ml-3.5 text-xl font-bold">STABILITY</span>
                </div>
            </Link>
            <ul className="mt-1 overflow-y-auto" style={{ height: "calc(100vh - 220px)" }}>
                <li><Link href="/"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><AiFillHome className="mr-2" />Home</a></Link></li>
                <li><Link href="/roadmap"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><MdEditRoad className="mr-2" />Roadmap</a></Link></li>
                <li><Link href="/tokens"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><BiCoin className="mr-2" />Tokens</a></Link></li>
                <li><Link href="/pools"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><BiServer className="mr-2" />Pools</a></Link></li>
                <li><Link href="/governance"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><RiGovernmentFill className="mr-2" />Governance</a></Link></li>
                <li><Link href="/team"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><BiGroup className="mr-2" />Team</a></Link></li>
                <li><Link href="/generation"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><GiRegeneration className="mr-2" />Generation</a></Link></li>
            </ul>
            <div className="absolute flex flex-col items-center w-72 md:w-56 xl:w-60 bottom-2 gap-y-1">
                <table className="w-50 mb-6">
                    <body>
                    <tr>
                        <td className="w-20">
                            {ethPrice ? 'ETH' : null}
                        </td>
                        <td className="text-right">
                            {ethPrice ? `$${Math.floor(ethPrice * 1000) / 1000}` : null}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {profitPrice && ethPrice ? 'PROFIT' : null}
                        </td>
                        <td className="text-right">
                            {profitPrice && ethPrice ? `$${Math.floor(profitPrice * ethPrice * 1000) / 1000}` : null}
                        </td>
                    </tr>
                    </body>
                </table>
                <ul className="flex justify-center text-center gap-x-5 mb-4">
                    <li><a href="https://github.com/stabilitydao" target="_blank" rel="noopener noreferrer"><BsGithub className="text-3xl cursor-pointer" /></a></li>
                    <li><a href="https://twitter.com/stabilitydao" target="_blank" rel="noopener noreferrer"><BsTwitter className="text-3xl cursor-pointer" /></a></li>
                    <li><a href="https://t.me/stabilitydao" target="_blank" rel="noopener noreferrer" ><BsTelegram className="text-3xl " /></a></li>
                    <li><a href="https://discord.gg/R3nnetWzC9" target="_blank" rel="noopener noreferrer" ><BsDiscord className="text-3xl " /></a></li>
                </ul>
                <div className="my-1 text-sm mb-4 dark:text-gray-300">
                    © 2021 Stability
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
