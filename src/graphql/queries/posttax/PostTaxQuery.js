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

export const USER_MONTEHLY_POSTTAXDEDUCTION=gql`
    query getAllPostTaxAmounts($user_id:String!,$tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
        postTaxAmounts(where: {user_id:$user_id,transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
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