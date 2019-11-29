import gql from "graphql-tag";
export const CREATE_PRETAXDEUCTION = gql`
    mutation createPreTaxAmount($user_id: String!, $pre_tax_type: String!) {
        createPreTaxAmount(
            data: {
                user_id: $user_id
                pre_tax_type: {
                    create: { pre_tax_type: $pre_tax_type, status: ACTIVE }
                }
                duration: 0
                pre_tax_amount: 0
                spouse_amount: 0
                spouse_duration:0
            }
        ) {
            id
            user_id
        }
    }
`;


export const UPDATE_PRETAXDEUCTIO = gql`
    mutation updatePreTaxAmount(
        $id: ID!
        $user_id: String!
        $duration: Int
        $pre_tax_amount: Float
        $pre_tax_type: ID!
        $spouse_amount: Float
        $spouse_duration: Int
    ) {
        updatePreTaxAmount(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                pre_tax_amount: $pre_tax_amount
                pre_tax_type: $pre_tax_type
                spouse_amount: $spouse_amount
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_PRETAXDEUCTIO = gql`
    mutation deletePreTaxAmount($id: ID!) {
        deletePreTaxAmount(where: { id: $id }) {
            id
        }
    }
`;