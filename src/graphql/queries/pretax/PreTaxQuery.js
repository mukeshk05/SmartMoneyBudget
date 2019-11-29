import gql from "graphql-tag";
export const USER_PRETAXDEDUCTION = gql`
    query getAllPreTaxAmount {
        preTaxAmounts {
            id
            user_id
            duration
            pre_tax_amount
            pre_tax_type {
                id
                pre_tax_type
                status
            }
            spouse_amount
            spouse_duration
        }
    }
`;