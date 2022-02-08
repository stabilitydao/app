import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { injected, walletconnect, walletlinkconnector } from '@/src/wallet/connectors'
import walletConnectError, { networks, switchNetwork } from '@/src/wallet'
import { GiHamburgerMenu } from 'react-icons/gi'
import { WiDaySunny, WiNightClear } from 'react-icons/wi'
import { FaFaucet } from 'react-icons/fa'
import { User, AlertTriangle } from 'react-feather'
import { updateIsNetworkOption, updateIsProfile, updateIsWalletOption } from '@/redux/slices/modalsSlice'
import { updateSync } from '@/redux/slices/syncSlice'
import { updateSidebar } from '@/redux/slices/sidebarSlice'
import { updateTokenbalance } from '@/redux/slices/tokenbalanceSlice'
import tokenAbi from '@/src/abis/tokenAbi'
import addresses from '@stabilitydao/addresses'
import { updateBalance } from '@/redux/slices/balanceSlice'
function Navbar({ Mode }) {
    const
        dispatch = useDispatch(),
        Sync = useSelector(state => state.sync.value),
        sidebar = useSelector(state => state.sidebar.value),
        { account, chainId, library, activate } = useWeb3React(),
        currentNetwork = useSelector(state => state.network.value),
        [Ismode, setIsmode] = useState(true)
        ;

    function handleMode() {
        setIsmode(!Ismode)
        Mode(!Ismode)
    }

    useEffect(() => {
        setTimeout(() => {
            const mode = JSON.parse(localStorage.getItem("mode"))
            if (mode == null) {
                setIsmode(true)
            }
            else {
                setIsmode(mode)
            }
        });
        const auth = JSON.parse(localStorage.getItem("auth"))
        if (auth) {
            setTimeout(() => {
                activate(injected || walletconnect || walletlinkconnector, undefined, true)
                    .then(() => {
                        dispatch(updateSync(true))
                    })
                    .catch((error) => {
                        walletConnectError(error)
                    })
            });
        }
    }, [])
    useEffect(() => {
        if (account && Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString())) {
            library.eth.getBalance(account).then((balance) => {
                return library.utils.fromWei(balance, "ether")
            }).then((eths) => {
                dispatch(updateBalance(eths))
            })
            const contract = new library.eth.Contract(tokenAbi, addresses[chainId].token);
            contract.methods.balanceOf(account).call().then((result) => {
                return library.utils.fromWei(result);
            }).then((tokenBalance) => {
                dispatch(updateTokenbalance(tokenBalance))
            })
        }
    }, [account, chainId])
    useEffect(() => {
        if (currentNetwork === chainId) {
            dispatch(updateSync(true))
        }
        if (chainId === null) {
            dispatch(updateSync(false))
        }
    }, [chainId])

    const Mode_Icon = () => {
        if (Ismode === true) {
            return <WiDaySunny className="p-1 text-4xl text-white border border-gray-500 rounded-full cursor-pointer" onClick={handleMode} />
        } else {
            return <WiNightClear className="p-1 text-4xl text-black border border-gray-500 rounded-full cursor-pointer" onClick={handleMode} />
        }
    }
    return (
        <nav style={{ backgroundColor: Ismode ? '#160024' : 'rgba(255,255,255,1)' }} className="lg:sticky fixed top-0 z-10 left-0 right-0 shadow dark:text-white dark:bg-[#160024]">
            {
                (Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString()) ? !Sync : true)
                && account && (chainId != currentNetwork) &&
                <div className="text-white bg-red-500 dark:bg-red-900 ">
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
            <div className="container flex flex-row h-full px-6 py-2.5 items-center" style={{ height: 72 }}>
                <div className="flex flex-row items-center mr-6 lg:hidden">
                    <GiHamburgerMenu className="text-2xl cursor-pointer" onClick={() => { dispatch(updateSidebar(!sidebar)) }} />
                </div>
                {
                    currentNetwork == 3 &&
                    <a className='btn' href='https://faucet.ropsten.be/' target='_blank' rel="noopener noreferrer"> <FaFaucet className='sm:hidden' /> <span className='hidden sm:inline'>Faucet</span></a>
                }
                <div className="flex flex-row items-center ml-auto gap-x-2">
                    {
                        account ?
                            Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString()) &&
                            <div className="flex flex-row items-center gap-x-2 md:mx-2">
                                <button
                                    onClick={() => { dispatch(updateIsProfile(true)) }}
                                    type="button"
                                    className="flex flex-row items-center h-10 btn dark:bg-indigo-600 rounded-2xl"
                                >
                                    <User
                                        size={20}
                                        strokeWidth={1.5}
                                        className="hidden mr-2 md:flex"
                                    />
                                    {account.slice(0, -36)}...{account.substring(38)}
                                </button>
                            </div>
                            :
                            <div className="flex flex-row items-center gap-x-2 md:mx-2">
                                <button
                                    type="button"
                                    className="w-40 h-10 btn rounded-2xl"
                                    id="options-menu"
                                    onClick={() => dispatch(updateIsWalletOption(true))}
                                >
                                    Connect Wallet
                                </button>
                            </div>
                    }
                    {
                        Object.entries(networks).map((network, index) => {
                            if (Object.keys(networks).includes(chainId ? chainId.toString() : currentNetwork.toString())) {
                                if (network[1].chainid == (Sync ? (chainId ? chainId : currentNetwork) : currentNetwork)) {
                                    return <button key={index} onClick={() => { dispatch(updateIsNetworkOption(true)) }} className="flex items-center w-32 h-10 pl-4 font-semibold text-gray-800 bg-indigo-200 border-indigo-300 btn dark:text-gray-100 hover:bg-indigo-300 dark:bg-indigo-900 dark:border-indigo-900 rounded-2xl gap-x-1">
                                        <span style={{ backgroundColor: network[1].color, }} className="w-3 h-3 mr-1 rounded-full" />
                                        <span>{network[1].name}</span>
                                    </button >
                                }
                            } else {
                                if (network[1].chainid === currentNetwork) {
                                    return <button key={index} onClick={() => { dispatch(updateIsNetworkOption(true)) }} className="flex items-center w-32 h-10 pl-4 font-semibold text-gray-800 bg-indigo-200 border-indigo-300 btn dark:text-gray-100 hover:bg-indigo-300 dark:bg-indigo-900 dark:border-indigo-900 rounded-2xl gap-x-1">
                                        <span style={{ backgroundColor: network[1].color, }} className="w-3 h-3 mr-1 rounded-full" />
                                        <span>{network[1].name}</span>
                                    </button >
                                }
                            }

                        })
                    }
                </div>
                <div className="fixed bg-white rounded-full shadow-lg md:shadow-none md:static md:ml-5 right-5 bottom-7 md:block dark:text-white dark:bg-gray-900">
                    <Mode_Icon />
                </div>
            </div>
            {sidebar && <div className={`fixed inset-0 bg-black opacity-20 `} onClick={() => { dispatch(updateSidebar(false)) }} />}
        </nav>
    )
}

export default Navbar
