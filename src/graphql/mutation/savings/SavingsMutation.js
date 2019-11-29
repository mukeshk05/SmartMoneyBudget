import gql from "graphql-tag";
export const CREATE_SAVING = gql`
    mutation createSaving($user_id: String!, $saving_type: String!) {
        createSaving(
            data: {
                user_id: $user_id
                saving_type: {
                    create: { saving_type: $saving_type, status: ACTIVE }
                }
                duration: 0
                saving_amount: 0
                spouse_amount: 0
                spouse_duration:0
            }
        ) {
            id
            user_id
        }
    }
`;


export const UPDATE_SAVING = gql`
    mutation updateSaving(
        $id: ID!
        $user_id: String!
        $duration: Int
        $saving_amount: Float
        $saving_type: ID!
        $spouse_amount: Float
        $spouse_duration: Int
    ) {
        updateSaving(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                saving_amount: $saving_amount
                saving_type: $saving_type
                spouse_amount: $spouse_amount
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_SAVING = gql`
    mutation deleteSaving($id: ID!) {
        deleteSaving(where: { id: $id }) {
            id
        }
    }
`;