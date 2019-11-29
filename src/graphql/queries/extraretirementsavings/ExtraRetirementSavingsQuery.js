import gql from "graphql-tag";
export const USER_EXTRA_RETIREMENT_SAVING = gql`
    query getAllExtraRetirementSavings {
        extraRetirementSavingses {
            id
            user_id
            duration
            extra_retirement_saving_amount
            extra_retirement_saving_type {
                id
                extra_retirement_saving_type
                status
            }
            spouse_amount
            spouse_duration
        }
    }
`;