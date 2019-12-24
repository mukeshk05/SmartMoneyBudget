import gql from "graphql-tag";

export const USER_MONTEHLY_SPENDING=gql`
    query getAllSpending($user_id:String!,$tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
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
            transactionDate
        },
        variableExpenseses(where: {user_id:$user_id,transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
            id
            user_id
            duration
            variable_expense_amount
            variable_expense_type {
                id
                variable_expense_type
                status
            }
            spouse_amount
            spouse_duration
            transactionDate
        },
        fixedExpenseses(where: {user_id:$user_id,transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
            id
            user_id
            duration
            fixed_expense_amount
            fixed_expense_type {
                id
                fixed_expense_type
                status
            }
            spouse_amount
            spouse_duration
            transactionDate
        }

    }
`;