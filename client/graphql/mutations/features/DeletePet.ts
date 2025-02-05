import { gql } from '@apollo/client';

export const DELETE_PET = gql`
  mutation DeletePet($input: DeletePetInput!) {
    deletePet(input: $input) {
      id
      name
    }
  }
`;
