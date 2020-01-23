import gql from "graphql-tag";
export const CREATE_TRACKER = gql`
    mutation createTracker($user_id: String!,$Amount:Float,$description:String!, $tracker_type: String!,$transactionDate:DateTime!,$tracker_date:DateTime!,$duration:Int! ) {
        createTracker(
            data: {
                user_id: $user_id
                Category: {
                    create: { tracker_type: $tracker_type,
                        user_id: $user_id
                            }
                },
                tracker_date:$tracker_date
                duration:$duration
                description: $description
                Amount: $Amount
                transactionDate:$transactionDate
            }
        ) {
            id
            user_id
        }
    }
`;