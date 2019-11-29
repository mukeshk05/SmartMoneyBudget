import gql from "graphql-tag";
export const USER_SAVNGS = gql`
    query getAllSavings {
        savings {
            id
            user_id
            duration
            saving_amount
            saving_type {
                id
                saving_type
                status
            }
            spouse_amount
            spouse_duration
        }
    }
`;