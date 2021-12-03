import React from 'react'
import Link from 'next/link'
import { BsFillPeopleFill, BsGithub, BsTelegram, BsTwitter, BsDiscord } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import {RiGovernmentFill} from 'react-icons/ri'
import { BiServer ,BiCoin,BiGroup} from 'react-icons/bi'
import { MdEditRoad } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { updateSidebar } from '@/redux/slices/sidebarSlice'
import {GiRegeneration} from "react-icons/gi";
function Sidebar() {
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.sidebar.value)
    return (
        <aside className={`fixed z-20 top-0 bottom-0 h-screen text-black bg-white shadow dark:bg-gray-900 dark:text-white w-72 xl:w-80 lg:static  duration-300  ${sidebar ? "left-0" : " -left-96"}`}>
            <Link href="/">
                <div className="flex items-center px-4 py-2 cursor-pointer" onClick={() => { dispatch(updateSidebar(false)) }}>
                    <img src="/logo_nolines_256.png" alt="Stability" className="h-12" />
                    <span className="ml-4 text-2xl font-bold">STABILITY</span>
                </div>
            </Link>
            <ul className="mt-3 overflow-y-auto"  style={{height:"calc(100vh - 160px)"}}>
                <li><Link href="/"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><AiFillHome className="mr-2" />Home</a></Link></li>
                <li><Link href="/roadmap"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><MdEditRoad className="mr-2" />Roadmap</a></Link></li>
                <li><Link href="/pools"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><BiServer className="mr-2" />Pools</a></Link></li>
                <li><Link href="/tokens"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><BiCoin className="mr-2" />Tokens</a></Link></li>
                <li><Link href="/governance"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><RiGovernmentFill className="mr-2" />Governance</a></Link></li>
                <li><Link href="/team"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><BiGroup className="mr-2" />Team</a></Link></li>
                <li><Link href="/generation"><a className="flex items-center py-4 text-xl pl-7 gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><GiRegeneration className="mr-2" />Generation</a></Link></li>
            </ul>
            <div className="absolute flex flex-col items-center w-72 md:w-56 xl:w-60 bottom-2 gap-y-2">
                <ul className="flex justify-center text-center gap-x-5">
                    <li><a href="https://github.com/stabilitydao" target="_blank" rel="noopener noreferrer"><BsGithub className="text-3xl cursor-pointer" /></a></li>
                    <li><a href="https://twitter.com/stabilitydao" target="_blank" rel="noopener noreferrer"><BsTwitter className="text-3xl cursor-pointer" /></a></li>
                    <li><a href="https://t.me/stabilitydao" target="_blank" rel="noopener noreferrer" ><BsTelegram className="text-3xl " /></a></li>
                    <li><a href="https://discord.gg/R3nnetWzC9" target="_blank" rel="noopener noreferrer" ><BsDiscord className="text-3xl " /></a></li>
                </ul>
                <div className="my-1 text-sm">
                    © 2021 Stability
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
