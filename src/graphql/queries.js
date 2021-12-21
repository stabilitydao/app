import { gql } from '@apollo/client'
const GET_GOV_QUERY = gql`
    query governor($id:Id!){
        governor(id:$id){
            id
            proposals{
            id
            description
            eta
            canceled
            executed
            startBlock
            endBlock
            }
        }
    }  
`
export { GET_GOV_QUERY }