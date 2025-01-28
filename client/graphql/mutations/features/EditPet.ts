import { gql } from '@apollo/client';

export const EDIT_PET = gql`
  mutation EditPet($id: ID!, $input: EditPetInput!) {
    editPet(id: $id, input: $input) {
      id
      name
    }
  }
`;
