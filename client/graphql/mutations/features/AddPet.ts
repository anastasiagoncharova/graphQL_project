import { gql } from '@apollo/client';

export const ADD_PET = gql`
  mutation AddPet($input: AddPetInput!) {
    addPet(input: $input) {
      id
      name
    }
  }
`;
