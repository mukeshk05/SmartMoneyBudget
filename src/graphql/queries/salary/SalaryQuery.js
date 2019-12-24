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

export const USER_MONTEHLY_SALARY=gql`
    query getAllSalary($user_id:String!,$tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
        salaries(where: {user_id:$user_id,transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
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