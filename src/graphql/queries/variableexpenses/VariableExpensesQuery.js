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