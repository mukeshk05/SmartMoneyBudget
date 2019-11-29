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