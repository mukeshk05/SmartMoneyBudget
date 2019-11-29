import gql from "graphql-tag";
export const USER_SALARY = gql`
    query getAllSalary {
        salaries {
            id
            user_id
            duration
            salary_amount
            salary_category_id {
                id
                salary_type_name
                status
            }
            spouse_salary
            spouse_duration
        }
    }
`;