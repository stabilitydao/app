import { gql } from '@apollo/client'
const GET_GOV_QUERY = gql`
    query governor($id:ID!){
        governor(id:$id){
            id
            proposals{
                id
                description
                startBlock
                endBlock
                canceled
                executed
                supports {
                    support
                    votes{
                    weight
                }
              }
            }
        }
    }  
`
export { GET_GOV_QUERY }