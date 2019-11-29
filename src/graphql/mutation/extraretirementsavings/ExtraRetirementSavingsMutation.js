import gql from "graphql-tag";
export const CREATE_EXTRA_RET_SAVING = gql`
    mutation createExtraRetirementSavings($user_id: String!, $extra_retirement_saving_type: String!) {
        createExtraRetirementSavings(
            data: {
                user_id: $user_id
                extra_retirement_saving_type: {
                    create: { extra_retirement_saving_type: $extra_retirement_saving_type, status: ACTIVE }
                }
                duration: 0
                extra_retirement_saving_amount: 0
                spouse_amount: 0
                spouse_duration:0
            }
        ) {
            id
            user_id
        }
    }
`;


export const UPDATE_EXTRA_RET_SAVING = gql`
    mutation updateExtraRetirementSavings(
        $id: ID!
        $user_id: String!
        $duration: Int
        $extra_retirement_saving_amount: Float
        $extra_retirement_saving_type: ID!
        $spouse_amount: Float
        $spouse_duration: Int
    ) {
        updateExtraRetirementSavings(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                extra_retirement_saving_amount: $extra_retirement_saving_amount
                extra_retirement_saving_type: $extra_retirement_saving_type
                spouse_amount: $spouse_amount
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_EXTRA_RET_SAVING = gql`
    mutation deleteExtraRetirementSavings($id: ID!) {
        deleteExtraRetirementSavings(where: { id: $id }) {
            id
        }
    }
`;