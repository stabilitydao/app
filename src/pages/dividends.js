import { Dividends } from '../components/view'
import Head from 'next/head'
function dividends() {
    return (
        <>
            <Head>
                <meta property="og:title" content="Stability" />
                <meta property="og:description" content="Profit generating decentralized organization" />
                <meta property="og:url" content="https://stabilitydao.org" />
                <meta property="og:image" content="https://stabilitydao.org/logo.png" />
            </Head>
            <Dividends />
        </>)
}

export default dividends
