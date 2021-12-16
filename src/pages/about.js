import { Team } from '../components/view'

function about({membersName}) {
    return <Team membersName={membersName}/>
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