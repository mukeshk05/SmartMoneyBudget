import gql from "graphql-tag";
export const CREATE_BILLS = gql`
    mutation createBillsAmount($user_id: String!, $bills_type: String!) {
        createBillsAmount(
            data: {
                user_id: $user_id
                bill_type: {
                    create: { bills_type: $bills_type, status: ACTIVE }
                }
                duration: 0
                bill_amount: 0
                spouse_amount: 0
                spouse_duration:0
            }
        ) {
            id
            user_id
        }
    }
`;


export const UPDATE_BILL = gql`
    mutation updateBillsAmount(
        $id: ID!
        $user_id: String!
        $duration: Int
        $bill_amount: Float
        $bill_type: ID!
        $spouse_amount: Float
        $spouse_duration: Int
    ) {
        updateBillsAmount(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                bill_amount: $bill_amount
                bill_type: $bill_type
                spouse_amount: $spouse_amount
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_BILL = gql`
    mutation deleteBillsAmount($id: ID!) {
        deleteBillsAmount(where: { id: $id }) {
            id
        }
    }
`;