import { gql } from '@apollo/client';

export interface User {
  id: string;
  email: string;
}

export interface CurrentUserQuery {
  user: User | null;
}

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    user {
      id
      email
    }
  }
`;
