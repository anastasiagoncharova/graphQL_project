import { gql } from '@apollo/client';

export const GET_PETS = gql`
  query GetPets {
    pets {
      id
      name
      description
      gender
      type
      age
      vaccinated
      sterilized
      image
    }
  }
`;
