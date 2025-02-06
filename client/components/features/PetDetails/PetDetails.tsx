import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_PETS } from '../../../graphql/queries/features/GetPets';
import { Pet } from '../../../models/Pet';
import { Button } from '../../shared/components/Button';

export const PetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_PETS);
  const navigate = useNavigate();

  if (loading) return <p>Loading pet details...</p>;
  if (error) return <p>Error loading pet details: {error.message}</p>;

  const pet = data.pets.find((p: Pet) => p.id === id);

  if (!pet) return <p>Pet not found</p>;

  return (
    <div className='container'>
      <h1 className='center-align'>{pet.name}</h1>
      <div className='card'>
        <div className='card-image'>
          <img src={pet.image} alt={pet.name} />
        </div>
        <div className='card-content'>
          <p>{pet.description}</p>
          <p>Gender: {pet.gender}</p>
          <p>Type: {pet.type}</p>
          <p>Age: {pet.age}</p>
          <p>Vaccinated: {pet.vaccinated ? 'Yes' : 'No'}</p>
          <p>Sterilized: {pet.sterilized ? 'Yes' : 'No'}</p>
        </div>
        <div className='card-action'>
          <Button
            label='Back'
            onClick={() => navigate('/admin')}
            className='blue lighten-1'
          />
          <Button
            label='Edit'
            onClick={() => navigate(`/admin/form/${pet.id}`)}
            className='btn green lighten-1'
          />
        </div>
      </div>
    </div>
  );
};
