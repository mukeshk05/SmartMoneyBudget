import gql from "graphql-tag";
export const USER_TAXES = gql`
    query getAllTaxAmounts {
        taxesAmounts {
            id
            user_id
            duration
            tax_amount
            tax_type {
                id
                tax_type
                status
            }
            spouse_amount
            spouse_duration
        }
    }
`;