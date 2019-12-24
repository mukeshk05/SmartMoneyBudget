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


export const USER_MONTEHLY_PRETAXDEDUCTION=gql`
    query getAllPreTaxAmount($user_id:String!,$tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
        preTaxAmounts(where: {user_id:$user_id,transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
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