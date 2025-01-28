import { gql } from '@apollo/client';
import { User } from '../../queries/auth/CurrentUser';

export interface LoginMutationResponse {
  login: {
    user: User;
    token?: string;
  };
}

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;
