import gql from "graphql-tag";
export const USER_VARIABLE_EXPENSES = gql`
    query getAllVariableExpenses {
        variableExpenseses {
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
        }
    }
`;

export const USER_MONTEHLY_VARIABLE_EXPENSES=gql`
    query getAllVariableExpenses($tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
        variableExpenseses(where: {transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
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
        }
    }
`;