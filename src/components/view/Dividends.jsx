import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import dividendAbi from '@/src/abis/dividendAbi'
import { useSelector } from "react-redux";
import { showAlert } from '@/src/components/alert';
function Dividends() {
    const [pendingPayment, setpendingPayment] = useState(null)
    const [totalPaid, settotalPaid] = useState(null)
    const currentNetwork = useSelector(state => state.network.value)
    const { library, chainId, active, account } = useWeb3React()
    const network = chainId ? chainId : currentNetwork
    const dividendAddress = '0x6BaF629618551Cb7454013F67f5d4A9119A61627'
    useEffect(() => {
        if (active) {
            const contract = new library.eth.Contract(dividendAbi, dividendAddress)
            contract.methods.paymentPending(account).call().then((pending) => {
                setpendingPayment(pending / 10 ** 18)
            })
            contract.methods.totalPaid().call().then((paid) => {
                settotalPaid(paid / 10 ** 18)
            })
        }
    }, [network])

    async function releasePayment() {
        if (pendingPayment !== null) {
            try {
                const contract = new library.eth.Contract(dividendAbi, dividendAddress)
                await contract.methods.releasePayment().send({ from: account })
                const pending = await contract.methods.paymentPending(account).call()
                setpendingPayment(pending / 10 ** 18)
                const paid = await contract.methods.totalPaid().call()
                settotalPaid(paid / 10 ** 18)
            } catch (err) {
                console.log(err)
            }
        }else{
            showAlert("Failed")
        }
    }

    return (
        <section className="dark:bg-black dark:text-white h-calc">
            <div className="container p-4">
                <div className="">
                    <table className="table-auto ">
                        <tbody>
                            <tr>
                                <td className="p-2">
                                    Total not paid:
                                </td>
                                <td className="p-2">
                                    {pendingPayment ? Math.floor(pendingPayment * 10000) / 10000 : "-"}ETH
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2">
                                    Total amount paid:
                                </td>
                                <td className="p-2">
                                    {totalPaid ? Math.floor(totalPaid * 10000) / 10000 : "-"}ETH
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>
                    <button className='btn' onClick={releasePayment}>Release</button>
                </div>
            </div>
        </section>
    )
}

export default Dividends