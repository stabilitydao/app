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
const GET_PROPOSAL_QUERY = gql`
    query proposal($id:ID!){
        proposal(id:$id){
            id
      startBlock
      endBlock
      description
      votecast {
        timestamp
        transaction {
          id
        }
        support {
          support
        }
        receipt {
          weight
        }
      }
      proposer {
        id
      }
      executed
      canceled
      queued
      calls {
        index
        target {
          id
        }
        calldata
        signature
      }
        }
    }  
`
export { GET_GOV_QUERY ,GET_PROPOSAL_QUERY}