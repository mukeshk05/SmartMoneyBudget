import gql from "graphql-tag";
export const CREATE_TAX = gql`
    mutation createTaxesAmount($user_id: String!, $tax_type: String!,$transactionDate:DateTime!) {
        createTaxesAmount(
            data: {
                user_id: $user_id
                tax_type: {
                    create: { tax_type: $tax_type, status: ACTIVE }
                }
                duration: 0
                tax_amount: 0
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


export const UPDATE_TAX = gql`
    mutation updateTaxesAmount(
        $id: ID!
        $user_id: String!
        $duration: Int
        $tax_amount: Float
        $tax_type: ID!
        $spouse_amount: Float
        $spouse_duration: Int
    ) {
        updateTaxesAmount(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                tax_amount: $tax_amount
                tax_type: $tax_type
                spouse_amount: $spouse_amount
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_TAX = gql`
    mutation deleteTaxesAmount($id: ID!) {
        deleteTaxesAmount(where: { id: $id }) {
            id
        }
    }
`;