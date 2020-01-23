import gql from "graphql-tag";
export const ALL_CATEGORIES = gql`
    query getAllCategories {
        fixedExpensesCategories{
            id,
            fixed_expense_type
        },
        billsCategories{
            id,bills_type
        },
        variableExpensesCategories{
            id,
            variable_expense_type
        },
        savingCategories{
            id,
            saving_type
        },
        extraRetirementSavingsCategories{
            id,
            extra_retirement_saving_type
        }
    }
`;

export const USER_MONTEHLY_TRACKING=gql`
    query getAllMonthelyTrackings($user_id:String!){
        trackers(where: {user_id:$user_id}){
            id,
            user_id,
            tracker_date,
            description,
            Amount,
            duration,
            Category{
                user_id,
                tracker_type
            }
        }
    }
`;


/*export const USER_MONTEHLY_TRACKING=gql`
    query getAllMonthelyTrackings($user_id:String!,$tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
        trackers(where: {user_id:$user_id,transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
            id,
            user_id,
            tracker_date,
            description,
            Amount,
            Category{
                user_id,
                tracker_type
            }
        }
    }
`;*/
