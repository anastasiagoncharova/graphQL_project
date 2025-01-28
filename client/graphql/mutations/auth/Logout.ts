import { gql } from '@apollo/client';

export interface LogoutMutationResponse {
  logout: {
    success: boolean;
  };
}

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      user {
        id
        email
      }
    }
  }
`;
