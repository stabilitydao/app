import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta property="og:image" content="https://stabilitydao.org/ogimage.jpg" />
                    <meta property="og:image:alt" content="Profit generating decentralized organization" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="600" />
                    <meta property="og:site_name" content="Stability" />
                    <meta property="og:type" content="object" />
                    <meta property="og:title" content="Stability DAO" />
                    <meta property="og:url" content="https://stabilitydao.org" />
                    <meta property="og:description" content="Profit generating decentralized organization" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument