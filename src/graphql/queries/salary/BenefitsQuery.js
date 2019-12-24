import gql from "graphql-tag";
export const USER_BENEFITS = gql`
    query getAllBenefits {
        benefitses {
            id
            user_id
            duration
            salary_amount
            benefit_type {
                id
                benefit_type
                status
            }
            spouse_amount
            spouse_duration
        }
    }
`;


export const USER_MONTEHLY_BENEFITS=gql`
    query getAllBenefits($user_id:String!,$tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
        benefitses(where: {user_id:$user_id,transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
            id
            user_id
            duration
            salary_amount
            benefit_type {
                id
                benefit_type
                status
            }
            spouse_amount
            spouse_duration
        }
    }
`;