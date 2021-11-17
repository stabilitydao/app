import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { injected, walletconnect } from '@/components/wallet/connectors'
import walletConnectError, { networks, switchNetwork } from '@/components/wallet/'
import Modal from '@/components/common/modal/Modal'
import { WalletOption, Profile, NetworkOption } from '@/components/common/modal/submodals/'
import { BsFillPeopleFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillHome } from 'react-icons/ai'
import { MdEditRoad } from 'react-icons/md'
import { WiDaySunny, WiNightClear } from 'react-icons/wi'
import { User, AlertTriangle } from 'react-feather'

function Navbar({ Mode }) {
    const
        dispatch = useDispatch(),
        { account, chainId, library, activate } = useWeb3React(),
        currentNetwork = useSelector(state => state.network.value),
        [NoSwitch, setNoSwitch] = useState(false),
        [Ismode, setIsmode] = useState(null),
        [Isside, setIsside] = useState(false),
        [IsModalOptionOpened, setIsModalOptionOpened] = useState(false),
        [IsProfile, setIsProfile] = useState(false),
        [IsNetworkOption, setIsNetworkOption] = useState(false)
        ;

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
        const auth = JSON.parse(localStorage.getItem("auth"))

        if (auth) {
            setTimeout(() => {
                setNoSwitch(true)
                activate(injected || walletconnect, undefined, true)
                    .then(() => { })
                    .catch((error) => {
                        walletConnectError(error)
                    })
            });
        }
    }, [])
    useEffect(() => {
        if (currentNetwork === chainId) {
            setNoSwitch(true)
        }
        if (chainId == null) {
            setNoSwitch(false)
        }
    }, [chainId])

    const Mode_Icon = () => {
        if (Ismode) {
            return <WiDaySunny className="p-1 text-4xl text-white border border-gray-500 rounded-full cursor-pointer" onClick={handleMode} />
        } else {
            return <WiNightClear className="p-1 text-4xl text-black border border-gray-500 rounded-full cursor-pointer" onClick={handleMode} />
        }
    }
    console.log(Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString()))
    return (
        <nav className="sticky top-0 z-10 bg-white shadow-xl dark:text-white dark:bg-gray-900">
            {
                (Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString()) ? !NoSwitch : true)
                && account && (chainId != currentNetwork) &&
                <div className="text-white bg-red-500 ">
                    <div className="container flex flex-col justify-between px-2 py-2 text-white gap-y-2 sm:items-center sm:flex-row sm:px-6">
                        <h1 className="flex flex-row items-center font-semibold font-Roboto gap-x-1"> <AlertTriangle size={20} strokeWidth={1.5} />Please switch to {Object.entries(networks).map((network) => { if (network[1].chainid === currentNetwork) { return network[1].name } })} networks</h1>
                        {
                            Object.entries(networks).map((network, index) => {
                                if (network[1].chainid === currentNetwork) {
                                    return <button key={index} onClick={() => { switchNetwork(network[1], dispatch, library) }} className="bg-black border-0 btn hover:bg-black">
                                        Switch Network
                                    </button>
                                }
                            })
                        }
                    </div>
                </div>
            }
            <div className="container flex flex-row h-16 px-6 py-2.5">
                <div className="flex flex-row items-center mr-6 lg:hidden">
                    <GiHamburgerMenu className="text-2xl cursor-pointer" onClick={() => { setIsside(!Isside) }} />
                </div>
                <Link href="/">
                    <div className="flex cursor-pointer">
                        <img src="/logo_256.png" alt="logo_256" className="hidden mr-auto md:flex justify-self-start " />
                        <span className="self-center hidden ml-3 text-xl font-bold md:flex">STABILITY</span>
                    </div>
                </Link>
                <ul className="flex-row items-center hidden mx-auto text-xl font-medium lg:flex">
                    <li className="px-3"><Link href="/"><a>Home</a></Link></li>
                    <li className="px-3"><Link href="/roadmap"><a>Roadmap</a></Link></li>
                    <li className="px-3"><Link href="/ecosystem"><a>Ecosystem</a></Link></li>
                </ul>
                <div className="mx-auto lg:hidden" />
                <div className="flex flex-row items-center gap-x-2">
                    {
                        account ?
                            Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString()) &&
                            <div className="flex flex-row items-center gap-x-2 md:mx-2">
                                <button
                                    onClick={() => { setIsProfile(true) }}
                                    type="button"
                                    className="flex flex-row items-center h-10 btn dark:bg-indigo-600 rounded-2xl"
                                >
                                    <User
                                        size={20}
                                        strokeWidth={1.5}
                                        className="hidden mr-2 md:flex"
                                    />
                                    {account.slice(0, -36)}
                                    ...
                                    {account.substring(38)}
                                </button>
                            </div>
                            :
                            <div className="flex flex-row items-center gap-x-2 md:mx-2">
                                <button
                                    type="button"
                                    className="w-40 h-10 btn rounded-2xl"
                                    id="options-menu"
                                    onClick={() => setIsModalOptionOpened(true)}
                                >
                                    Connect Wallet
                                </button>
                            </div>
                    }
                    {
                        Object.entries(networks).map((network, index) => {
                            if (network[1].chainid == (NoSwitch ? (chainId ? chainId : currentNetwork) : currentNetwork)) {
                                return <button key={index} onClick={() => { setIsNetworkOption(true) }} className="flex items-center w-32 h-10 pl-4 font-semibold text-gray-800 bg-indigo-200 border-indigo-300 btn dark:text-gray-100 hover:bg-indigo-300 dark:bg-indigo-900 dark:border-indigo-900 rounded-2xl gap-x-1">
                                    <span style={{ backgroundColor: network[1].color, }} className="w-3 h-3 mr-1 rounded-full" />
                                    <span>{network[1].name}</span>
                                </button >
                            }
                        })
                    }

                </div>
                <div className="fixed bg-white rounded-full shadow-lg md:shadow-none md:static md:mt-1 md:ml-5 left-5 bottom-7 md:block dark:text-white dark:bg-gray-900">
                    <Mode_Icon />
                </div>
            </div>
            {
                Isside
                &&
                <div className={`fixed inset-0 w-screen h-screen bg-black opacity-20 `} onClick={() => { setIsside(!Isside) }} />
            }
            <div className={`fixed bottom-0 shadow-2xl left-0 w-64 transition-inset dark:bg-gray-800 top-16 bg-white duration-300 py-4 lg:-left-72 ${Isside ? "left-0" : "-left-72"}`}>
                <ul>
                    <li><Link href="/"><a className="flex items-center p-4 mb-px text-xl gap-x-2" onClick={() => { setIsside(!Isside) }} ><AiFillHome />Home</a></Link></li>
                    <li><Link href="/roadmap"><a className="flex items-center p-4 mb-px text-xl gap-x-2 " onClick={() => { setIsside(!Isside) }} ><MdEditRoad />Roadmap</a></Link></li>
                    <li><Link href="/ecosystem"><a className="flex items-center p-4 text-xl gap-x-2 " onClick={() => { setIsside(!Isside) }} ><BsFillPeopleFill />Ecosystem</a></Link></li>
                </ul>
            </div>
            {
                IsNetworkOption &&
                <Modal title="Select a Network" onClose={() => setIsNetworkOption(false)} showCloseBtn>
                    <NetworkOption onClose={() => setIsNetworkOption(false)} />
                </Modal>
            }
            {
                IsProfile &&
                <Modal title="Account" onClose={() => setIsProfile(false)} showCloseBtn>
                    <Profile onClose={() => setIsProfile(false)} />
                </Modal>
            }
            {
                IsModalOptionOpened &&
                <Modal title="Select a Wallet" onClose={() => setIsModalOptionOpened(false)} showCloseBtn>
                    <WalletOption onClose={() => setIsModalOptionOpened(false)} />
                </Modal>
            }
        </nav>
    )
}

export default Navbar
