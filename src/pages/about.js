import { Team } from '../components/view'
import Head from 'next/head'
function about({ membersName }) {
    return (
        <>
            <Head>
                <meta property="og:title" content="Stability" />
                <meta property="og:description" content="Profit generating decentralized organization" />
                <meta property="og:url" content="https://stabilitydao.org" />
                <meta property="og:image" content="https://stabilitydao.org/logo.png" />
            </Head>
            <Team membersName={membersName} />
        </>
    )
}

export async function getServerSideProps() {
    let membersName
    try {
        const membersData = await fetch("https://api.github.com/orgs/stabilitydao/public_members")
        const dataJson = await membersData.json()
        membersName = dataJson.map((user) => {
            return user.login
        })
    } catch (error) {
        console.log(error)
    }
    return {
        props: { membersName }, // will be passed to the page component as props
    }
}


export default about