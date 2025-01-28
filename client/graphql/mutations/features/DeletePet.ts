import { gql } from '@apollo/client';

export const DELETE_PET = gql`
  mutation DeletePet($id: ID!) {
    deletePet(id: $id)
  }
`;
