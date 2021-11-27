import React from 'react'
import Link from 'next/link'
import { BsFillPeopleFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { MdEditRoad } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { updateSidebar } from '@/redux/slices/sidebarSlice'
function Sidebar() {
    const dispatch = useDispatch()
    const sidebar = useSelector(state => state.sidebar.value)
    return (
        <aside className={`fixed z-20 top-0 bottom-0 h-screen text-black bg-white shadow dark:bg-gray-900 dark:text-white  w-72 xl:w-80 lg:static  duration-300  ${sidebar ? "left-0" : " -left-96"}`}>
            <Link href="/">
                <div className="flex items-center p-4 py-2 cursor-pointer" onClick={() => { dispatch(updateSidebar(false)) }}>
                    <img src="/logo_nolines_256.png" alt="Stability" className="h-12" />
                    <span className="ml-4 text-2xl font-bold">STABILITY</span>
                </div>
            </Link>
            <ul className="">
                <li><Link href="/"><a className="flex items-center p-4 text-xl gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><AiFillHome />Home</a></Link></li>
                <li><Link href="/roadmap"><a className="flex items-center p-4 text-xl gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><MdEditRoad />Roadmap</a></Link></li>
                <li><Link href="/ecosystem"><a className="flex items-center p-4 text-xl gap-x-2 " onClick={() => { dispatch(updateSidebar(false)) }} ><BsFillPeopleFill />Ecosystem</a></Link></li>
            </ul>
        </aside>
    )
}

export default Sidebar
