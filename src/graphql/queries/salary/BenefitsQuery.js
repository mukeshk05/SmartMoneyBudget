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