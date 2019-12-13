import gql from "graphql-tag";
export const CREATE_POSTTAXDEUCTION = gql`
    mutation createPostTaxAmount($user_id: String!, $post_tax_type: String!,$transactionDate:DateTime!) {
        createPostTaxAmount(
            data: {
                user_id: $user_id
                post_tax_type: {
                    create: { post_tax_type: $post_tax_type, status: ACTIVE }
                }
                duration: 0
                post_tax_amount: 0
                spouse_amount: 0
                spouse_duration:0
                transactionDate:$transactionDate
            }
        ) {
            id
            user_id
        }
    }
`;


export const UPDATE_POSTTAXDEUCTIO = gql`
    mutation updatePostTaxAmount(
        $id: ID!
        $user_id: String!
        $duration: Int
        $post_tax_amount: Float
        $post_tax_type: ID!
        $spouse_amount: Float
        $spouse_duration: Int
    ) {
        updatePostTaxAmount(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                post_tax_amount: $post_tax_amount
                post_tax_type: $post_tax_type
                spouse_amount: $spouse_amount
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_POSTTAXDEUCTIO = gql`
    mutation deletePostTaxAmount($id: ID!) {
        deletePostTaxAmount(where: { id: $id }) {
            id
        }
    }
`;