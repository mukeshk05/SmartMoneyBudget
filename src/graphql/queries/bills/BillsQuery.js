import gql from "graphql-tag";
export const USER_BILLS_QUERY = gql`
    query getAllBills {
        billsAmounts {
            id
            user_id
            duration
            bill_amount
            bill_type {
                id
                bills_type
                status
            }
            spouse_amount
            spouse_duration
        }
    }
`;


export const USER_MONTEHLY_BILLS=gql`
    query getAllBills($user_id:String!,$tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
        billsAmounts(where: {user_id:$user_id,transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
            id
            user_id
            duration
            bill_amount
            bill_type {
                id
                bills_type
                status
            }
            spouse_amount
            spouse_duration
        }
    }
`;