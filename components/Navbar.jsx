import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { BsFillPeopleFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillHome } from 'react-icons/ai'
import { MdEditRoad } from 'react-icons/md'
import { WiDaySunny, WiNightClear } from 'react-icons/wi'
function Navbar({ Mode }) {
    const [Ismode, setIsmode] = useState(null)
    const [Isside, setIsside] = useState(false)
    function handleMode() {
        setIsmode(!Ismode)
        Mode(!Ismode)
    }
    useEffect(() => {
        const mode = localStorage.getItem("mode")
        if (!mode) {
            setIsmode(true)
        } else {
            setIsmode(JSON.parse(mode))
        }
    }, [])
    const Mode_Icon = () => {
        if (Ismode) {
            return <WiDaySunny className="p-1 text-4xl text-white border border-gray-500 rounded-full cursor-pointer" onClick={handleMode} />
        } else {
            return <WiNightClear className="p-1 text-4xl text-black border border-gray-500 rounded-full cursor-pointer" onClick={handleMode} />
        }
    }
    return (
        <nav className="sticky top-0 z-10 bg-white shadow-xl dark:text-white dark:bg-gray-900">
            <div className="container flex flex-row h-16 px-6 py-2">
                <div className="flex flex-row items-center mr-6 md:hidden">
                    <GiHamburgerMenu className="text-2xl cursor-pointer" onClick={() => { setIsside(!Isside) }} />
                </div>
                <Link href="/"><img src="/logo_256.png" alt="logo_256" className="cursor-pointer mr-auto justify-self-start " /></Link>
                <ul className="flex-row items-center hidden mx-auto text-xl font-medium md:flex">
                    <li className="px-3"><Link href="/"><a>Home</a></Link></li>
                    <li className="px-3"><Link href="/roadmap"><a>Roadmap</a></Link></li>
                    <li className="px-3"><Link href="/ecosystem"><a>Ecosystem</a></Link></li>
                </ul>
                <div className="fixed z-50 bg-white rounded-full shadow-lg md:static left-5 bottom-7 md:block dark:text-white dark:bg-gray-900">
                    <Mode_Icon />
                </div>
            </div>
            {
                Isside
                &&
                <div className={`fixed inset-0 w-screen h-screen bg-black opacity-20 `} onClick={() => { setIsside(!Isside) }} />
            }
            <div className={`fixed bottom-0 shadow-2xl left-0 w-64 transition-inset dark:bg-gray-800 top-16 bg-white duration-300 py-4 md:-left-72 ${Isside ? "left-0" : "-left-72"}`}>
                <ul>
                    <li><Link href="/"><a className="flex items-center p-4 mb-px text-xl gap-x-2" onClick={() => { setIsside(!Isside) }} ><AiFillHome />Home</a></Link></li>
                    <li><Link href="/roadmap"><a className="flex items-center p-4 mb-px text-xl gap-x-2 " onClick={() => { setIsside(!Isside) }} ><MdEditRoad />Roadmap</a></Link></li>
                    <li><Link href="/ecosystem"><a className="flex items-center p-4 text-xl gap-x-2 " onClick={() => { setIsside(!Isside) }} ><BsFillPeopleFill />Ecosystem</a></Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
