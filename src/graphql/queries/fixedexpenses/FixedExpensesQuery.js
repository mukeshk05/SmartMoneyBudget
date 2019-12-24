import gql from "graphql-tag";
export const USER_FIXED_EXPENSES_QUERY = gql`
    query getAllfixedExpenseses {
        fixedExpenseses {
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
        }
    }
`;

export const USER_MONTEHLY_FIXED_EXPENSESG=gql`
    query getAllfixedExpenseses($user_id:String!,$tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
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
        }
    }
`;