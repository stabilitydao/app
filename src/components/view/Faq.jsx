import React from 'react'
function Faq() {
    return (
        <section className="h-calc">
            <div className="container p-4">
                <h1 className="mb-6 text-4xl font-semibold leading-10 tracking-wide text-center text-indigo-500 sm:text-5xl font-Roboto">
                    Frequently Asked Questions
                </h1>
                <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200 pb-10  ">
                    <div className="mt-6 space-y-6 divide-y divide-gray-200">
                        {
                            [
                                {

                                    question: "Stability is a native token?",
                                    answer: "Yes, PROFIT token is a native token."
                                },
                                {

                                    question: "LP will be locked? If not why?",
                                    answer: "The team will decide in due course."
                                },
                                {

                                    question: "When will PROFIT be listed in CMC and CG? Have we applied?",
                                    answer: "We are still working on it, but we would not know when they will list us."
                                },
                                {

                                    question: "Will polyscan update our social?",
                                    answer: "Had verification. Hope Polyscan will add our social there real soon."
                                },
                                {

                                    question: "When token/pool contract will be audited?",
                                    answer: "We are currently working for audit."
                                },
                                {

                                    question: "White paper when will be ready?",
                                    answer: "It will take awhile as our focus is to iron some bugs in our dapps now."
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
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq
