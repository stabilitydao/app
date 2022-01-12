import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import Navbar from './Navbar'
import { ToastContainer } from 'react-toastify';
import Sidebar from './Sidebar'
import Modals from '@/src/components/modal/modals'
import { useRouter } from 'next/router'
function Main({ child }) {
    const [mounted, setMounted] = useState(true);
    const router = useRouter()
    useEffect(() => {
        function sett() {
            setMounted(false)
        }
        function setf() {
            setMounted(true)
        }
        router.events.on('routeChangeStart', sett)
        router.events.on('routeChangeError', setf)
        router.events.on('routeChangeComplete', setf)
        return () => {
            router.events.off('routeChangeStart', sett)
            router.events.off('routeChangeError', setf)
            router.events.off('routeChangeComplete', setf)
        }
    }, [router.pathname])
    if (!mounted) return (
        <div className='flex fixed top-16 left-0 lg:left-60  right-0 bottom-0 justify-center items-center  dark:bg-[#160024] bg-white' >
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 dark:border-white border-indigo-900'>
            </div>
        </div>
    );
    return (<>
        <main className="dark:bg-gradient-to-br dark:from-black dark:via-space dark:to-black dark:text-white">
            {child}
        </main>
    </>)
}
function Layout({ children }) {
    const [Mode, setMode] = useState(null)
    const [mounted, setMounted] = useState(false);
    const [Title, setTitle] = useState('')
    const router = useRouter();
    useEffect(() => {
        const scroolTOP = document.getElementById('scroolTOP')
        if (scroolTOP) {
            scroolTOP.scrollTop = 0;
        }
    }, [router.pathname])
    useEffect(() => {
        let route = router.pathname.replace('/', '')
        setTitle(route ? route[0].toUpperCase() + route.slice(1) : '')
    }, [router.pathname])
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
    if (!mounted) return (
        <div className='flex fixed inset-0 justify-center items-center bg-indigo-900'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-white'>
            </div>
        </div>
    );
    return (
        <Web3ReactProvider getLibrary={getLibrary} >
            <style>
                {`
                body{
                    background-color:${Mode ? "#160024" : " rgba(255,255,255,1))"};
                }
                `}
            </style>
            <main className={Mode ? "dark" : ""} >
                <Head>
                    <title>{Title ? `${Title} - ` : ""}Stability</title>
                    <link rel="icon" href="/logo_nolines_256.png" />
                    <meta name="description" content="Profit generating DeFi protocol" />
                    <meta property="og:title" content="Stability" />
                    <meta property="og:description" content="Profit generating decentralized organization" />
                    <meta property="og:url" content="https://stabilitydao.org" />
                    <meta property="og:image" content="https://stabilitydao.org/logo.png" />
                </Head>
                <div className="flex flex-row">
                    <Sidebar Mode={Mode} />
                    <div id="scroolTOP" className="w-full lg:h-screen overflow-y-auto">
                        <Navbar Mode={mode => setMode(mode)} />
                        <Main child={children} />
                    </div>
                </div>
                <Modals />
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme={"colored"} icon={false} />
            </main>
        </Web3ReactProvider>
    )
}

export default Layout
