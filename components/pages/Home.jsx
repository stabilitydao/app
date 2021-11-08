import React from 'react'
import Link from 'next/link'
function Home() {
    return (
        <section className="dark:bg-black dark:text-white h-calc">
            <div className="container w-11/12 pb-10">
                <div className="max-w-lg mx-auto">
                    <img src="/logo.svg" alt="logo" />
                    <div className="text-center">
                        <div className="mt-0 mb-2 text-3xl font-medium leading-normal sm:text-4xl font-Roboto">
                            <h1 className="text-4xl sm:text-6xl">
                                Stability
                            </h1>
                                Profit generating DeFi protocol
                        </div>
                        <p className="mt-0 mb-4 text-sm font-medium leading-normal">
                            Decentralized organization
                        </p>
                        <Link href="/roadmap"><a className="mt-0 mb-2 text-3xl font-normal leading-normal text-indigo-700 sm:text-4xl font-Roboto">
                            Phase 0: Inception
                        </a></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
