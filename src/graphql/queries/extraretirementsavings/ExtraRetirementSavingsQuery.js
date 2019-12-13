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

export const USER_MONTEHLY_EXTRA_RETIREMENT_SAVING=gql`
    query getAllExtraRetirementSavings($tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
        extraRetirementSavingses(where: {transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
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