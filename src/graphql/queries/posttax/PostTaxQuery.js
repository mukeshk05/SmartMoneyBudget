import gql from "graphql-tag";
export const USER_POSTTAXDEDUCTION = gql`
    query getAllPostTaxAmounts {
        postTaxAmounts {
            id
            user_id
            duration
            post_tax_amount
            post_tax_type {
                id
                post_tax_type
                status
            }
            spouse_amount
            spouse_duration
        }
    }
`;