import gql from "graphql-tag";
export const CREATE_SALARY = gql`
    mutation createSalary($user_id: String!, $salary_type_name: String!) {
        createSalary(
            data: {
                user_id: $user_id
                salary_category_id: {
                    create: { salary_type_name: $salary_type_name, status: ACTIVE }
                }
                duration: 0
                salary_amount: 0
                spouse_salary: 0
                spouse_duration:0
            }
        ) {
            id
            user_id
        }
    }
`;

export const UPDATE_SALARY = gql`
    mutation updateSalary(
        $id: ID!
        $user_id: String!
        $duration: Int
        $salary_amount: Float
        $salary_category_id: ID!
        $spouse_salary: Float
        $spouse_duration: Int
    ) {
        updateSalary(
            where: { id: $id }
            data: {
                user_id: $user_id
                duration: $duration
                salary_amount: $salary_amount
                salary_category_id: $salary_category_id
                spouse_salary: $spouse_salary
                spouse_duration: $spouse_duration
            }
        ) {
            id
        }
    }
`;


export const DELETE_SALARY = gql`
    mutation deleteSalary($id: ID!) {
        deleteSalary(where: { id: $id }) {
            id
        }
    }
`;
