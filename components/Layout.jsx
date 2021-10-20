import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'

function Layout({ children }) {
    const [Mode, setMode] = useState(null)
    useEffect(() => {
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
    return (
        <main className={Mode ? "dark" : ""} >
            <Head>
                <title>Stability</title>
                <meta name="description" content="Self-developing DAO" />
                <link rel="icon" href="/logo_256.png" />
                <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css'
                    rel='stylesheet' />
            </Head>
            <Navbar Mode={mode => setMode(mode)} />
            {children}
            <Footer />
        </main>
    )
}

export default Layout
