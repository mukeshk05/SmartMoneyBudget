import gql from "graphql-tag";
export const CREATE_FIXED_EXPENSES = gql`
    mutation createFixedExpenses($user_id: String!, $fixed_expense_type: String!) {
        createFixedExpenses(
            data: {
                user_id: $user_id
                fixed_expense_type: {
                    create: { fixed_expense_type: $fixed_expense_type, status: ACTIVE }
                }
                duration: 0
                fixed_expense_amount: 0
                spouse_amount: 0
                spouse_duration:0
            }
        ) {
            id
            user_id
        }
    }
`;


export const UPDATE_FIXED_EXPENSES = gql`
    mutation updateFixedExpenses(
        $id: ID!
        $user_id: String!
        $duration: Int
        $fixed_expense_amount: Float
        $fixed_expense_type: ID!
        $spouse_amount: Float
        $spouse_duration: Int
    ) {
        updateFixedExpenses(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                fixed_expense_amount: $fixed_expense_amount
                fixed_expense_type: $fixed_expense_type
                spouse_amount: $spouse_amount
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_FIXED_EXPENSES = gql`
    mutation deleteFixedExpenses($id: ID!) {
        deleteFixedExpenses(where: { id: $id }) {
            id
        }
    }
`;