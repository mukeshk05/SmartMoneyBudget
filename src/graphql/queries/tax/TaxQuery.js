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

export const USER_MONTEHLY_TAXES=gql`
    query getAllTaxAmounts($user_id:String!,$tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
        taxesAmounts(where: {user_id:$user_id,transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
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