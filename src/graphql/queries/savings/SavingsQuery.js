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

export const USER_MONTEHLY_SAVING=gql`
query getAllMonthelySavings($tranaction_start_date:DateTime!,$transaction_end_date:DateTime!){
    savings(where: {transactionDate_gte: $tranaction_start_date, transactionDate_lte:$transaction_end_date}){
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