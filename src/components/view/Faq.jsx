import React from 'react'
import Link from 'next/link'
function Faq() {
    return (
        <section className="h-calc">
            <div className="container p-4 pt-24 lg:pt-0">
                <h1 className="mb-6 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-5xl font-Roboto">
                    Frequently Asked Questions
                </h1>
                <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200 pb-10  ">
                    <div className="mt-6 space-y-6 divide-y divide-gray-200">
                        {
                            [
                                {
                                    question: "Is Stability a native token?",
                                    answer: "Yes, Stability (PROFIT) token is a native token."
                                },
                                {

                                    question: "Will LP be locked? If not why?",
                                    answer: "The team will decide in due course."
                                },
                                {

                                    question: "When will PROFIT be listed in CMC and CG? Have we applied?",
                                    answer: "We are still working on it, but we would not know when they will list us."
                                },
                                {
                                    question: "When will the token/pool contract be audited?",
                                    answer: "We are currently working for audit."
                                },
                                {

                                    question: "When will the white paper be ready?",
                                    answer: "It will take a while as our focus is to iron some bugs in our dapps now."
                                },
                                {

                                    question: "What is SDIV?",
                                    answer: "The SDIV token is intended to distribute the externally generated profit of the organization in the form of dividends."
                                },
                                {

                                    question: "If I press harvest SDIV, my PROFIT tokens will be gone?",
                                    answer: "NO. It will transfer back to your wallet."
                                }
                            ].map((faq, index) => {
                                return (
                                    <details open="" key={index} className="font-Roboto">
                                        <summary className="py-2 outline-none cursor-pointer   text-xl">{faq.question}</summary>
                                        <div className="px-4 pb-4 text-gray-800 dark:text-gray-200">
                                            <p className="text-lg">{faq.answer}</p>
                                        </div>
                                    </details>
                                )
                            })
                        }
                        <details open="" className="font-Roboto">
                            <summary className="py-2 outline-none cursor-pointer   text-xl">How does staking work?</summary>
                            <div className="px-4 pb-4 text-gray-800 dark:text-gray-200">
                                <p className="text-lg">Stake PROFIT @<Link href='/dividends'><a className="underline">https://stabilitydao.org/dividends</a></Link> to Harvest SDIV</p>
                            </div>
                        </details>
                        <details open="" className="font-Roboto">
                            <summary className="py-2 outline-none cursor-pointer   text-xl">Where can I see SDIV pending payout?</summary>
                            <div className="px-4 pb-4 text-gray-800 dark:text-gray-200">
                                <p className="text-lg"><Link href='/dividends'><a className="underline">https://stabilitydao.org/dividends</a></Link></p>
                            </div>
                        </details>
                        <details open="" className="font-Roboto">
                            <summary className="py-2 outline-none cursor-pointer   text-xl">Do I have to &quot;Harvest&quot; @<Link href='/dividends'><a className="underline">https://stabilitydao.org/dividends</a></Link> to Harvest SDIV into my wallet in order to get the dividends?</summary>
                            <div className="px-4 pb-4 text-gray-800 dark:text-gray-200">
                                <p className="text-lg">Yes</p>
                            </div>
                        </details>
                        <details open="" className="font-Roboto">
                            <summary className="py-2 outline-none cursor-pointer   text-xl">I harvested SDIV into my wallet but I still didn&apos;t get any WETH! Why?</summary>
                            <div className="px-4 pb-4 text-gray-800 dark:text-gray-200">
                                <p className="text-lg">You will only get the payout when Team release it to all holders. You can view the pending payout at @<Link href='/dividends'><a className="underline">https://stabilitydao.org/dividends</a></Link></p>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq
