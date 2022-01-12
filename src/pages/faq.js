import { Faq } from '../components/view'
import Head from 'next/head'
function faq() {
    return (
        <>
            <Head>
                <meta property="og:title" content="Stability" />
                <meta property="og:description" content="Profit generating decentralized organization" />
                <meta property="og:url" content="https://stabilitydao.org" />
                <meta property="og:image" content="https://stabilitydao.org/logo.png" />
            </Head>
            <Faq />
        </>
    )
}

export default faq