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
                    <meta property="og:title" content="Stability" />
                    <meta property="og:description" content="Profit generating decentralized organization" />
                    <meta property="og:url" content="https://stabilitydao.org" />
                    <meta property="og:image" content="https://stabilitydao.org/logo.png" />
                    <meta property="og:image:width" content="968" />
                    <meta property="og:image:height" content="504" />
                    <meta property="og:image:type" content="image/png" />
                    <meta property="og:type" content="website" />
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