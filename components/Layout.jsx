import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import Modals from '@/components/common/modal/modals'
function Layout({ children }) {
    const [Mode, setMode] = useState(null)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
        const mode = localStorage.getItem("mode")
        if (!mode) {
            setMode(true)
        }
        else {
            setMode(JSON.parse(mode))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("mode", JSON.stringify(Mode))
    }, [Mode])

    function getLibrary(provider) {
        return new Web3(provider);
    }

    if (!mounted) return null;

    return (
        <Web3ReactProvider getLibrary={getLibrary} >
            <main className={Mode ? "dark" : ""} >
                <Head>
                    <title>Stability</title>
                    <meta name="description" content="Profit generating DeFi protocol" />
                    <link rel="icon" href="/logo_nolines_256.png" />
                </Head>
                <Navbar Mode={mode => setMode(mode)} />
                {children}
                <Footer />
                <Modals />
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme={"colored"} icon={false} />
            </main>
        </Web3ReactProvider>
    )
}

export default Layout
