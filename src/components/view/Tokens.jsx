import React, { useEffect } from 'react'
import Link from 'next/link'
import addresses from 'addresses'
import { networks } from '../../wallet'
import { buyLinks, lpv3 } from '../../wallet/swaps'
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from '@web3-react/core'
import { updateProfitPrice } from "@/redux/slices/priceSlice";
import univ3prices from '@thanpolas/univ3prices';
import uniV3PoolAbi from '@/src/abis/uniV3PoolAbi'
import tokenAbi from '@/src/abis/tokenAbi'
import { showAlert } from '@/src/components/alert';
import WEB3 from '@/src/functions/web3'
import { symbol, name, totalSupply } from "@/redux/slices/tokenSlice";
import { dsymbol, dname, dtotalSupply } from "@/redux/slices/dTokenSlice";

function Tokens() {
    const web3 = WEB3()
    const dispatch = useDispatch()
    const { library, active, chainId, } = useWeb3React()
    const profitPrice = useSelector(state => state.price.value)
    const priceIn = useSelector(state => state.price.in)
    const currentNetwork = useSelector(state => state.network.value)
    const token = useSelector(state => state.token)
    const dToken = useSelector(state => state.dToken)
    const network = chainId ? chainId : currentNetwork

    addresses[3].dToken = '0x424E1eAe04a2580EcD4d5f19Ad5285cC2b05a05C';

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
            }
        } else {
            dispatch(updateProfitPrice([
                0, ''
            ]))
        }

        if (web3.eth.net.isListening()) {
            if(addresses[network].token) {
                // ABI is ERC-20 API as a JSON
                let contract;
                contract = new web3.eth.Contract(tokenAbi, addresses[network].token);
                contract.methods.symbol().call().then((r) => {
                    dispatch(symbol(r))
                })
                contract = new web3.eth.Contract(tokenAbi, addresses[network].token);
                contract.methods.name().call().then((r) => {
                    dispatch(name(r))
                })
                contract = new web3.eth.Contract(tokenAbi, addresses[network].token);
                contract.methods.totalSupply().call().then((r) => {
                    dispatch(totalSupply(web3.utils.fromWei(r, "ether")))
                })
            }

            if(addresses[network].dToken) {
                // ABI is ERC-20 API as a JSON
                let contract;
                contract = new web3.eth.Contract(tokenAbi, addresses[network].dToken);
                contract.methods.symbol().call().then((r) => {
                    dispatch(dsymbol(r))
                })
                contract = new web3.eth.Contract(tokenAbi, addresses[network].dToken);
                contract.methods.name().call().then((r) => {
                    dispatch(dname(r))
                })
                contract = new web3.eth.Contract(tokenAbi, addresses[network].dToken);
                contract.methods.totalSupply().call().then((r) => {
                    dispatch(dtotalSupply(web3.utils.fromWei(r, "ether")))
                })
            }
        }
    }, [network])

    function addPROFITToWallet() {
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
            showAlert("Failed")
        });
    }

    function addSDIVToWallet() {
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
        }).catch((err) => {
            showAlert("Failed")
        });
    }

    return (
        <section className="dark:bg-black dark:text-white h-calc">
            <div className="container p-4">
                <h1 className="mb-4 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-6xl font-Roboto">Tokens</h1>
                <article className="mb-10">
                    <div>
                        <h1 className="mb-8 text-4xl sm:text-5xl font-Roboto ">PROFIT</h1>
                        <div className="flex flex-wrap">
                            <div className="w-full mb-4 lg:w-1/3 lg:mb-3">
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
                                <p className="p-0 text-lg">
                                    The native token PROFIT&apos;s primary purpose is to represent ownership shares of the Stability protocol. Given PROFIT holders are effectively owners of Stability. Holding the token also allows investors to manage the Stability protocol collectively. Token entire supply was minted in Phase 0 and will be distributed in Phase 1.
                                </p>
                            </div>
                            <div className="flex-row w-full lg:w-2/3">
                                <div className="flex justify-center">
                                    <table className="w-full text-sm table-auto bg-blend-darken md:text-xl" style={{ maxWidth: '540px' }}>
                                        <tbody>
                                        <tr>
                                            <td className="py-1">Contract</td>
                                            <td className="py-1 text-xs text-right">{network ? (
                                                <a title="View Asset on Etherscan" target="_blank" href={networks[network].explorerurl.concat(addresses[network].token)} rel="noopener noreferrer"><span style={{ color: networks[network].color }}>{networks[network].name}</span> {addresses[network].token}</a>
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
                                            <td className="py-1 text-right">{lpv3[network] !== null && profitPrice > 0 ? (
                                                <span>{profitPrice} {priceIn}</span>
                                            ) : (
                                                <span>-</span>
                                            )}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Market cap</td>
                                            <td className="py-1 text-right">{lpv3[network] !== null && profitPrice > 0 ? (
                                                <span>{(profitPrice * (token ? token.totalSupply : 0)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ')} {priceIn}</span>
                                            ) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 whitespace-nowrap">Total supply</td>
                                            <td className="py-1 text-right">{token ? (token.totalSupply * 1).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ') : ''}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Type</td>
                                            <td className="py-1 text-right">security</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Model</td>
                                            <td className="py-1 text-right">deflationary</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Distribution</td>
                                            <td className="py-1 text-right">
                                                liquidity bootstrapping<br/>
                                                full supply available at IDO
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
                <article className="mb-10">
                    <div>
                        <h1 className="mb-8 text-4xl sm:text-5xl font-Roboto ">SDIV</h1>
                        <div className="flex flex-wrap">
                            <div className="w-full mb-4 lg:w-1/3 lg:mb-3">
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
                                <p className="p-0 text-lg">
                                    The SDIV token is intended to distribute the externally generated profit of the organization in the form of dividends.
                                </p>
                            </div>
                            <div className="flex-row w-full lg:w-2/3">
                                <div className="flex justify-center">
                                    <table className="w-full text-sm table-auto bg-blend-darken md:text-xl" style={{ maxWidth: '540px' }}>
                                        <tbody>
                                        <tr>
                                            <td className="py-1">Contract</td>
                                            <td className="py-1 text-xs text-right">{network && addresses[network].dToken ? (
                                                <a title="View Asset on Etherscan" target="_blank" href={networks[network].explorerurl.concat(addresses[network].dToken)} rel="noopener noreferrer"><span style={{ color: networks[network].color }}>{networks[network].name}</span> {addresses[network].dToken}</a>
                                            ) : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Token name</td>
                                            <td className="py-1 text-right">{network && addresses[network].dToken && dToken ? dToken.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Symbol</td>
                                            <td className="py-1 text-right">{network && addresses[network].dToken && dToken ? dToken.symbol : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 whitespace-nowrap">Total supply</td>
                                            <td className="py-1 text-right">{network && addresses[network].dToken && dToken ? dToken.totalSupply : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Type</td>
                                            <td className="py-1 text-right">dividend</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Model</td>
                                            <td className="py-1 text-right">inflationary</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Distribution</td>
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
            </div>
        </section>
    )
}

export default Tokens