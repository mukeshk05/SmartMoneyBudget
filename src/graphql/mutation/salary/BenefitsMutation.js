import gql from "graphql-tag";
export const CREATE_BENEFITS = gql`
    mutation createBenefits($user_id: String!, $benfeit_type: String!,$transactionDate:DateTime!) {
        createBenefits(
            data: {
                user_id: $user_id
                benefit_type: {
                    create: { benefit_type: $benfeit_type, status: ACTIVE }
                }
                duration: 0
                salary_amount: 0
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


export const UPDATE_BENEFITS = gql`
    mutation updateBenefits(
        $id: ID!
        $user_id: String!
        $duration: Int
        $salary_amount: Float
        $benefit_type: ID!
        $spouse_amount: Float
        $spouse_duration: Int
    ) {
        updateBenefits(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                salary_amount: $salary_amount
                benefit_type: $benefit_type
                spouse_amount: $spouse_amount
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_BENEFIT = gql`
    mutation deleteBenefit($id: ID!) {
        deleteBenefits(where: { id: $id }) {
            id
        }
    }
`;