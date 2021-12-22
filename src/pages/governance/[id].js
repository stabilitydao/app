import React from 'react'
import { Proposal } from '@/src/components/view'
function proposal({id}) {
    return <Proposal id={id} />
}

export async function getServerSideProps(context) {
    const id = context.query.id.replace('_','/')
    return {
        props: { id },
    }

}

export default proposal
