import { gql } from 'apollo-boost';

export default gql`
    query uploads {
        uploads {
            id  
            filename
            mimetype
            path
        }
    }
`;
