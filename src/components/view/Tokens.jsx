import React, { useEffect } from 'react'
import Link from 'next/link'
import addresses from '@stabilitydao/addresses'
import { networks } from '../../wallet'
import { buyLinks, lpv3 } from '../../wallet/swaps'
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from '@web3-react/core'
import tokenAbi from '@/src/abis/tokenAbi'
import pmAbi from '@/src/abis/pmAbi'
import { showAlert } from '@/src/components/alert';
import WEB3 from '@/src/functions/web3'
import { symbol, name, totalSupply } from "@/redux/slices/tokenSlice";
import { dsymbol, dname, dtotalSupply } from "@/redux/slices/dTokenSlice";
import { pmtotalSupply, mintStart, mintEnd, toMint } from "@/redux/slices/pmSlice";

function Tokens() {
    const web3 = WEB3()
    const dispatch = useDispatch()
    const { library, active, chainId, } = useWeb3React()
    const profitpriceIn$ = useSelector(state => state.profitpriceIn$.value)
    const currentNetwork = useSelector(state => state.network.value)
    const mode = useSelector(state => state.mode.value)
    const token = useSelector(state => state.token)
    const dToken = useSelector(state => state.dToken)
    const pm = useSelector(state => state.pm)
    const network = chainId && networks[chainId] ? chainId : currentNetwork
    const rpcLib = chainId ? library : web3

    // todo get theme
    const isDark = mode

    useEffect(() => {
        if (rpcLib) {
            if (addresses[network].token) {
                // ABI is ERC-20 API as a JSON
                let contract;
                contract = new rpcLib.eth.Contract(tokenAbi, addresses[network].token);
                contract.methods.symbol().call().then((r) => {
                    dispatch(symbol(r))
                })
                contract.methods.name().call().then((r) => {
                    dispatch(name(r))
                })
                contract.methods.totalSupply().call().then((r) => {
                    dispatch(totalSupply(web3.utils.fromWei(r, "ether")))
                })
            }

            if (addresses[network].dToken) {
                // ABI is ERC-20 API as a JSON
                let contract;
                contract = new rpcLib.eth.Contract(tokenAbi, addresses[network].dToken);
                contract.methods.symbol().call().then((r) => {
                    dispatch(dsymbol(r))
                })
                contract.methods.name().call().then((r) => {
                    dispatch(dname(r))
                })
                contract.methods.totalSupply().call().then((r) => {
                    dispatch(dtotalSupply(web3.utils.fromWei(r, "ether")))
                })
            }

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
            }
        }
    }, [network])

    function addPROFITToWallet() {
        // dispatch(updateIsPending(true))
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
            // dispatch(updateIsPending(false))
        }).catch((err) => {
            // dispatch(updateIsPending(false))
            showAlert("Failed")
        });
    }

    function addSDIVToWallet() {
        // dispatch(updateIsPending(true))
        library.currentProvider.request({
            method: "wallet_watchAsset",
            params: {
                type: 'ERC20',
                options: {
                    address: addresses[chainId].dToken,
                    symbol: "SDIV",
                    decimals: 18,
                    image: "https://dev.stabilitydao.org/SDIV.svg",
                },
            }
        }).then(() => {
            // dispatch(updateIsPending(false))
        }).catch((err) => {
            showAlert("Failed")
            // dispatch(updateIsPending(false))
        });
    }

    return (
        <section className=" h-calc">
            <div className="container p-4 pt-24 lg:pt-4">
                <h1 className="mb:d-none mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-5xl font-Roboto">PROFIT</h1>
                <article className="mb-10">
                    <div className="mb-10">
                        <div dangerouslySetInnerHTML={{ __html: isDark ? "<style>#dexscreener-embed{position:relative;width:100%;padding-bottom:125%;}@media(min-width:1400px){#dexscreener-embed{padding-bottom:45%;}}#dexscreener-embed iframe{position:absolute;width:100%;height:100%;top:0;left:0;border:0;}</style><div id=\"dexscreener-embed\"><iframe src=\"https://dexscreener.com/polygon/0xd3B1f11f0ff29Add929941095C696D464D6961FC?embed=1&theme=dark&trades=0&info=0\"></iframe></div>" : "<style>#dexscreener-embed{position:relative;width:100%;padding-bottom:125%;}@media(min-width:1400px){#dexscreener-embed{padding-bottom:45%;}}#dexscreener-embed iframe{position:absolute;width:100%;height:100%;top:0;left:0;border:0;}</style><div id=\"dexscreener-embed\"><iframe src=\"https://dexscreener.com/polygon/0xd3B1f11f0ff29Add929941095C696D464D6961FC?embed=1&trades=0&info=0\"></iframe></div>" }} />
                    </div>
                    <div className="lg:w-3/5 xl:w-4/5 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full mb-4 xl:w-1/2 lg:mb-3">
                                <div className="flex justify-center mb-5 text-center">
                                    <img src="/profit.svg" alt="profit" width="150" className="float-left my-2 ml-3 mr-7" />
                                    <div className="flex flex-col justify-between mt-1.5 pb-4">
                                        <div>
                                            {buyLinks && buyLinks[network] ? (
                                                <a className="mt-2" href={buyLinks[network]} target="_blank" rel="noopener noreferrer">
                                                    <button title="Buy PROFIT token" className="w-24 py-1 text-xl rounded-md btn">
                                                        Buy
                                                    </button>
                                                </a>
                                            ) : (
                                                <div className="mt-1">
                                                    <button disabled={true} title="Buy PROFIT token" className="w-24 py-1 text-xl rounded-md disabled:bg-gray-500 disabled:border-0 disabled:cursor-default btn">
                                                        Buy
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-center">
                                        </div>
                                        <div className="flex justify-center w-28">
                                            {active &&
                                                <button title="Add to wallet" className="flex text-xs text-black border-0 btn bg-cool-gray-300 dark:text-white dark:bg-true-gray-700 hover:bg-indigo-300 rounded-xl dark:hover:bg-true-gray-800" onClick={addPROFITToWallet}>
                                                    <img src="/wallets/metamask.png" className="h-4 mr-2" alt="Metamask" />
                                                    Add
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg my-8">
                                    The native token PROFIT&apos;s primary purpose is to represent ownership shares of the Stability protocol. Given PROFIT holders are effectively owners of Stability. Holding the token also allows investors to manage the Stability protocol collectively.
                                </p>
                            </div>
                            <div className="flex-row w-full lg:w-4/5 xl:w-2/5 mx-auto">
                                <div className="flex justify-center">
                                    <table className="w-full text-sm table-auto bg-blend-darken md:text-xl" style={{ maxWidth: '540px' }}>
                                        <tbody>
                                        <tr>
                                            <td className="py-1 pr-10">Standard</td>
                                            <td className="py-1 text-right">ERC20</td>
                                        </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Contract</td>
                                                <td className="py-1 text-right">{network ? (
                                                    <a title="View Asset on Etherscan" target="_blank" href={`${networks[network].explorerurl}token/${addresses[network].token}`} rel="noopener noreferrer"><span style={{ color: networks[network].color }} className="text-sm">{networks[network].name}</span> {addresses[network].token.slice(0, -36)}...{addresses[network].token.substring(38)}</a>
                                                ) : null}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1">Token name</td>
                                                <td className="py-1 text-right">{token ? token.name : ''}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1">Symbol</td>
                                                <td className="py-1 text-right">{token ? token.symbol : ''}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1">Price</td>
                                                <td className="py-1 text-right">{lpv3[network] !== null && profitpriceIn$ > 0 ? (
                                                    <span>${profitpriceIn$}</span>
                                                ) : (
                                                    <span>-</span>
                                                )}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1">Market cap</td>
                                                <td className="py-1 text-right">{lpv3[network] !== null && profitpriceIn$ > 0 ? (
                                                    <span>${(profitpriceIn$ * (token ? token.totalSupply : 0)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ')}</span>
                                                ) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 whitespace-nowrap">Total supply</td>
                                                <td className="py-1 text-right">{token ? (token.totalSupply * 1).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ') : ''}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Type</td>
                                                <td className="py-1 text-right">governance</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Model</td>
                                                <td className="py-1 text-right">deflationary</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Distribution</td>
                                                <td className="py-1 text-right">
                                                    liquidity bootstrapping<br />
                                                    100% in circulation
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div />
                            </div>
                        </div>
                    </div>
                </article>
                <br/>
                <br/>
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">SDIV</h1>
                <article className="mb-10">
                    <div className="lg:w-3/5 xl:w-4/5 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full mb-4 xl:w-1/2 lg:mb-3">
                                <div className="flex justify-center mb-5 text-center">
                                    <img src="/SDIV.svg" alt="profit" width="150" className="float-left my-2 ml-3 mr-7" />
                                    <div className="flex flex-col justify-between mt-1.5 pb-4">
                                        <div>
                                            <Link href="/pools">
                                                <button title="Earn PROFIT token" className="w-24 py-1 text-xl rounded-md btn dark:bg-teal-700 dark:border-teal-600">
                                                    Earn
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="flex justify-center">
                                        </div>
                                        <div className="flex justify-center w-28">
                                            {active && addresses[network].dToken &&
                                                <button title="Add to wallet" className="flex text-xs text-black border-0 btn bg-cool-gray-300 dark:text-white dark:bg-true-gray-700 hover:bg-indigo-300 rounded-xl dark:hover:bg-true-gray-800" onClick={addSDIVToWallet}>
                                                    <img src="/wallets/metamask.png" className="h-4 mr-2" alt="Metamask" />
                                                    Add
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <p className="p-0 text-lg my-8">
                                    The SDIV token is intended to distribute the externally generated profit of the organization in the form of dividends.
                                </p>
                            </div>
                            <div className="flex-row w-full lg:w-4/5 xl:w-2/5 mx-auto">
                                <div className="flex justify-center">
                                    <table className="w-full text-sm table-auto bg-blend-darken md:text-xl" style={{ maxWidth: '540px' }}>
                                        <tbody>
                                        <tr>
                                            <td className="py-1 pr-10">Standard</td>
                                            <td className="py-1 text-right">ERC20</td>
                                        </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Contract</td>
                                                <td className="py-1 text-right">{network && addresses[network].dToken ? (
                                                    <a title="View Asset on Etherscan" target="_blank" href={`${networks[network].explorerurl}token/${addresses[network].dToken}`} rel="noopener noreferrer"><span style={{ color: networks[network].color }} className="text-sm">{networks[network].name}</span> {addresses[network].dToken.slice(0, -36)}...{addresses[network].dToken.substring(38)}</a>
                                                ) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Token name</td>
                                                <td className="py-1 text-right">{network && addresses[network].dToken && dToken ? dToken.name : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Symbol</td>
                                                <td className="py-1 text-right">{network && addresses[network].dToken && dToken ? dToken.symbol : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 whitespace-nowrap pr-10">Total supply</td>
                                                <td className="py-1 text-right">{network && addresses[network].dToken && dToken ? (dToken.totalSupply * 1).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ') : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Type</td>
                                                <td className="py-1 text-right">dividend</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Model</td>
                                                <td className="py-1 text-right">inflationary</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 pr-10">Distribution</td>
                                                <td className="py-1 text-right">
                                                    <Link href="/pools">Minting pool</Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div />
                            </div>
                        </div>
                    </div>
                </article>
                <br/>
                <br/>
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">PM</h1>
                <article className="mb-10">
                    <div className="lg:w-3/5 xl:w-4/5 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full mb-4 xl:w-1/2 lg:mb-3">
                                <div className="flex justify-center mb-5 text-center">
                                    <img src="/pm.png" alt="PM" width="400" className="float-left my-2 ml-3 mr-7" />
                                    <div className="flex flex-col justify-between mt-1.5 pb-4">
                                        <div />
                                        <div className="flex justify-center">
                                        </div>
                                        <div />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-row w-full lg:w-4/5 xl:w-2/5 mx-auto">
                                <div className="flex-row justify-center">
                                    <table className="w-full text-sm table-auto bg-blend-darken md:text-xl" style={{ maxWidth: '540px' }}>
                                        <tbody>
                                        <tr>
                                            <td className="py-1 pr-10">Standard</td>
                                            <td className="py-1 text-right">ERC721</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-10">Contract</td>
                                            <td className="py-1 text-right">{network && addresses[network].pm ? (
                                                <a title="View Asset on Etherscan" target="_blank" href={`${networks[network].explorerurl}token/${addresses[network].pm}`} rel="noopener noreferrer"><span style={{ color: networks[network].color }} className="text-sm">{networks[network].name}</span> {addresses[network].pm.slice(0, -36)}...{addresses[network].pm.substring(38)}</a>
                                            ) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-10">Token name</td>
                                            <td className="py-1 text-right">Profit Maker</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-10">Symbol</td>
                                            <td className="py-1 text-right">PM</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 whitespace-nowrap pr-10">Total supply</td>
                                            <td className="py-1 text-right">{network && addresses[network].pm && pm ? pm.totalSupply : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 whitespace-nowrap pr-10">Max supply</td>
                                            <td className="py-1 text-right">80</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-10">Type</td>
                                            <td className="py-1 text-right">utility</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-10">Mint price</td>
                                            <td className="py-1 text-right">10 000 PROFIT</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-10">Mint start</td>
                                            <td className="py-1 text-right">{network && addresses[network].pm && pm && pm.mintStart > 0 ? (new Date(pm.mintStart * 1000)).toString() : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-10">Mint end</td>
                                            <td className="py-1 text-right">{network && addresses[network].pm && pm && pm.mintEnd > 0 ? (new Date(pm.mintEnd * 1000)).toString() : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-10">To mint</td>
                                            <td className="py-1 text-right">{network && addresses[network].pm && pm && pm.toMint > 0 ? pm.toMint : '-'}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="xl:w-1/2">
                                <p className="p-0 text-lg my-8">
                                    Collection of unique Stability DAO Governance tokens. The owner of the Profit Maker token is the owner of 1% of the total voting power in the genesis DAO governance, has the ability to receive unit tokens from the initial supply and has privileges in the ecosystem. <br />
                                    <br />
                                </p>
                            </div>
                            <div className="w-full lg:w-4/5 xl:w-2/5 mx-auto">
                                <p className="p-0 text-lg xl:my-8">
                                    <span className="text-xl font-bold">Features</span>
                                    <ul className="text-left">
                                        <li>Voting power: 10 000 votes</li>
                                        <li>Ecosystem tokens vesting</li>
                                        <li>Units whitelist</li>
                                        <li>Dividend limit: 1 000 000 SDIV</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Tokens