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