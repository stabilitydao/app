import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ethers } from 'ethers'
import { BsStopwatch } from 'react-icons/bs'
import addresses from '@stabilitydao/addresses'
import WEB3 from '@/src/functions/web3'
import { networks } from '../../wallet'
import pmAbi from '@/src/abis/pmAbi'
import tokenAbi from '@/src/abis/tokenAbi'
import { useDispatch, useSelector } from "react-redux";
import { pmtotalSupply, mintStart, mintEnd, toMint } from "@/redux/slices/pmSlice";
import { useWeb3React } from '@web3-react/core'
import { txConfirmedByNetwork, updateIsTxSubmitted, updateIsWaitingForWalletTxConfirm, updateIsWalletOption } from "@/redux/slices/modalsSlice";
import { showAlert } from '@/src/components/alert'

function ProfitMaker() {
    const [Choose, setChoose] = useState(false)
    const [SelectedNft, setSelectedNft] = useState(null)
    const [leftNfts, setleftNfts] = useState(null)
    const [UserNfts, setUserNfts] = useState(null)
    const [isApproved, setisApproved] = useState(null)
    const tokenBalance = useSelector(state => state.tokenBalance.value)
    const web3 = WEB3()
    const currentNetwork = useSelector(state => state.network.value)
    const { library, active, chainId, account } = useWeb3React()
    const network = chainId && networks[chainId] ? chainId : currentNetwork
    const rpcLib = chainId ? library : web3
    const pm = useSelector(state => state.pm)
    const dispatch = useDispatch();
    async function remainingNft() {
        const res = await fetch('/api/maker-testnet/available-colors')
        const inJson = await res.json()
        setleftNfts(inJson)
    }
    async function handleIsApproved() {
        if (active && addresses[network].pm !== undefined) {
            const tokenContract = new rpcLib.eth.Contract(tokenAbi, addresses[network].token)
            const allowedTokens = await tokenContract.methods.allowance(account, addresses[network].pm).call()
            if (allowedTokens.toString() === '10000000000000000000000') {
                setisApproved(true)
            } else {
                setisApproved(false)
            }
        }
    }
    async function handleUserHaveNft() {
        if (active && addresses[network].pm !== undefined) {
            try {
                const nftContract = new rpcLib.eth.Contract(pmAbi, addresses[network].pm)
                const haveNft = await nftContract.methods.ownerTokenIds(account).call()
                Promise.all(
                    haveNft.map(async (id) => {
                        try {
                            const userNft = await fetch('/api/maker-testnet/' + id)
                            const nftJson = await userNft.json()
                            return nftJson
                        } catch (error) {
                            console.log(error)
                        }
                    })
                ).then((nfts) => {
                    setUserNfts(nfts)
                }).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            setUserNfts(null)
        }
    }
    async function handleApprove() {
        if (!isApproved && active) {
            dispatch(updateIsWaitingForWalletTxConfirm(true))
            try {
                const profitContract = new rpcLib.eth.Contract(tokenAbi, addresses[network].token)
                profitContract.methods.approve(addresses[network].pm, ethers.BigNumber.from('10000000000000000000000')).send({ from: account }).on('transactionHash', txhash => {
                    dispatch(updateIsWaitingForWalletTxConfirm(false))
                    dispatch(updateIsTxSubmitted(txhash))
                }).on('receipt', r => {
                    dispatch(txConfirmedByNetwork())
                    handleIsApproved()
                })
            } catch (err) {
                console.log(err)
                dispatch(updateIsWaitingForWalletTxConfirm(false))
            }
        } else {
            showAlert("Failed")
        }
    }
    async function handleMint() {
        if (active && (Math.floor(tokenBalance * 1000) / 1000 >= 10000)) {
            dispatch(updateIsWaitingForWalletTxConfirm(true))
            try {
                const pmContract = new rpcLib.eth.Contract(pmAbi, addresses[network].pm)
                pmContract.methods.safeMint(account, SelectedNft).send({ from: account }).on('transactionHash', txhash => {
                    dispatch(updateIsWaitingForWalletTxConfirm(false))
                    dispatch(updateIsTxSubmitted(txhash))
                }).on('receipt', r => {
                    getPm()
                    remainingNft()
                    handleIsApproved()
                    setSelectedNft(Object.entries(leftNfts)[0][0])
                    dispatch(txConfirmedByNetwork())
                })
            } catch (error) {
                console.log(err)
                dispatch(updateIsWaitingForWalletTxConfirm(false))
            }
        } else {
            showAlert("Failed")
        }
    }
    function getPm() {
        if (addresses[network].pm) {
            // ABI is ERC-721
            let contract;
            contract = new rpcLib.eth.Contract(pmAbi, addresses[network].pm);
            contract.methods.totalSupply().call().then((r) => {
                dispatch(pmtotalSupply(r))
            })
            contract.methods.mintingStart().call().then((r) => {
                dispatch(mintStart(r))
            })
            contract.methods.mintingEnd().call().then((r) => {
                dispatch(mintEnd(r))
            })
            contract.methods.toMint().call().then((r) => {
                dispatch(toMint(r))
            })
        };
    }
    useEffect(() => {
        getPm()
        remainingNft()
        handleIsApproved()
        handleUserHaveNft()
    }, [network, isApproved, pm, active,])
    useEffect(() => {
        if (leftNfts !== null && Object.keys(leftNfts).length !== 0) {
            setSelectedNft(Object.entries(leftNfts)[0][0])
        }
    }, [leftNfts])

    const isMintAvailable = pm && pm.mintStart * 1000 < new Date().getTime() && pm.mintEnd * 1000 > new Date().getTime() && pm.toMint > 0
    const allMinted = pm && pm.mintStart * 1000 < new Date().getTime() && pm.mintEnd * 1000 > new Date().getTime() && pm.toMint == 0

    return (
        <section className=" h-calc">
            <div className="flex flex-col justify-center text-center h-80 bg-makerbanner" id="parallex" >
            </div>
            <div className="container p-4 pt-24 lg:pt-4">
                {pm && pm.mintStart == 0 &&
                <div className="text-xl text-center text-indigo-500">
                    Minting is not yet available
                </div>
                }
                {allMinted &&
                    <div className="text-xl text-center text-indigo-500">
                        All available NFTs in this epoch have already been minted
                    </div>
                }
                {
                    addresses[network].pm !== undefined && pm.mintStart > 0 && !allMinted &&
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="flex-1 p-4">
                                {
                                    leftNfts && SelectedNft &&
                                    <img className='w-full' src={`/maker/${leftNfts[SelectedNft]?.name.replace(' ', '-').toLowerCase()}.png`} alt="" height='200' width='200' />
                                }
                            </div>
                            <div className="flex-1 p-4 font-Roboto">
                                <div className='flex flex-col '>
                                    {
                                        pm &&
                                        <h1 className='text-2xl leading-normal border-2 border-indigo-800 p-4  rounded-t-xl'>
                                            <BsStopwatch className='inline mr-2' />
                                            <>
                                                Minting starts {network && addresses[network].pm && pm && pm.mintStart > 0 ? (new Date(pm.mintStart * 1000)).toString() : '-'}
                                            </>
                                        </h1>
                                    }
                                    {
                                        pm &&
                                        <h1 className='text-2xl leading-normal border-2 border-indigo-800 p-4  rounded-t-xl'>
                                            <BsStopwatch className='inline mr-2'/>
                                            <>
                                                Minting ends {network && addresses[network].pm && pm && pm.mintEnd > 0 ? (new Date(pm.mintEnd * 1000)).toString() : '-'}
                                            </>
                                        </h1>
                                    }
                                    <div className='border-indigo-800 border-2 rounded-b-xl p-4 '>
                                        <p className='text-xl leading-normal mb-4'>
                                            {network && addresses[network].pm && pm && pm.toMint > 0 ? pm.toMint : '0'} left
                                        </p>
                                        <p className='text-xl leading-normal '>
                                            Mint cost
                                        </p>
                                        <div className='flex flex-row items-center gap-x-2 text-2xl mb-8'>
                                            <Image src='/profit.png' width='25' height='25' alt="Not present" className='' />
                                            <p className=''>
                                                10,000
                                            </p>
                                        </div>
                                        {
                                            !active ?
                                                <button
                                                    type="button"
                                                    className=" h-10 btn rounded-2xl w-full"
                                                    id="options-menu"
                                                    onClick={() => dispatch(updateIsWalletOption(true))}
                                                >
                                                    Connect Wallet
                                                </button>
                                                :
                                                <>
                                                    {
                                                        isMintAvailable &&
                                                        <div className="relative inline-block z-0 mb-8">
                                                            <button onClick={() => { setChoose(!Choose) }} className="relative btn z-10 block p-2   border border-transparent rounded-md   focus:outline-none">
                                                                {leftNfts && SelectedNft ? leftNfts[SelectedNft]?.name : ""}
                                                            </button>
                                                            <div className={`absolute z-0 right-0  w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800 ${Choose ? 'block' : 'hidden'}`}>
                                                                {
                                                                    Object.entries(leftNfts).map((nft, index) => {
                                                                        return (
                                                                            <div onClick={() => { setChoose(false); setSelectedNft(nft[0]) }} key={index} className=" flex flex-row justify-between cursor-pointer px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                                                                {nft[1].name}
                                                                                <div className={`h-4 w-8`} style={{ backgroundColor: nft[1].rgb }}>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        isMintAvailable &&
                                                        <div className="h-16 space-y-4">
                                                            {
                                                                isApproved ?
                                                                    <button className='btn w-full text-2xl rounded-md' onClick={() => { handleMint() }}>MINT</button>
                                                                    :
                                                                    <button className='btn w-full text-2xl rounded-md' onClick={() => { handleApprove() }}>APPROVE</button>
                                                            }
                                                        </div>
                                                    }
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                {!pm || !addresses[network].pm &&
                <h1 className="mb-10 text-3xl  font-semibold  tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">{'PM not deployed to this network'}</h1>
                }
                {
                    pm && pm.mintStart > 0 && UserNfts !== null &&
                    <div className="mt-16" >
                        <h1 className="mb-10 text-2xl  font-semibold  tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Your owned NFT&apos;s</h1>
                        <div className='flex flex-row flex-wrap justify-center gap-4'>
                            {UserNfts.length == 0 &&
                                <div className="text-center">
                                    You dont have PM NFTs
                                </div>
                            }
                            {UserNfts.map((nft, index) => {
                                // console.log(nft)
                                if (nft) {
                                    return (
                                        <div key={index} className="max-w-xs  overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 p-2">
                                            <img className="object-cover w-full h-56" src={nft.image} alt="avatar" />
                                            <div className="py-5 text-center">
                                                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{nft.name}</h1>
                                                <span className="text-sm text-gray-700 dark:text-gray-200">{nft.description}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>

                }
            </div>
        </section >
    )
}

export default ProfitMaker