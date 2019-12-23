import gql from "graphql-tag";
export const CREATE_USER = gql`
  mutation createUser($user_id: String!, $screen_user_name: String!) {
    createuserAccount(
      data: { user_id: $user_id, screen_user_name: $screen_user_name }
    ) {
      id
      user_id
    }
  }
`;