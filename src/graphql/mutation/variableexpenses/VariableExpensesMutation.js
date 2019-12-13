import gql from "graphql-tag";
export const CREATE_VARIABLE_EXPENSES = gql`
    mutation createVariableExpenses($user_id: String!, $variable_expense_type: String!,$transactionDate:DateTime!) {
        createVariableExpenses(
            data: {
                user_id: $user_id
                variable_expense_type: {
                    create: { variable_expense_type: $variable_expense_type, status: ACTIVE }
                }
                duration: 0
                variable_expense_amount: 0
                spouse_amount: 0
                spouse_duration:0
                transactionDate:$transactionDate
            }
        ) {
            id
            user_id
        }
    }
`;


export const UPDATE_VARIABLE_EXPENSES = gql`
    mutation updateVariableExpenses(
        $id: ID!
        $user_id: String!
        $duration: Int
        $variable_expense_amount: Float
        $variable_expense_type: ID!
        $spouse_amount: Float
        $spouse_duration: Int
    ) {
        updateVariableExpenses(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                variable_expense_amount: $variable_expense_amount
                variable_expense_type: $variable_expense_type
                spouse_amount: $spouse_amount
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_VARIABLE_EXPENSES = gql`
    mutation deleteVariableExpenses($id: ID!) {
        deleteVariableExpenses(where: { id: $id }) {
            id
        }
    }
`;