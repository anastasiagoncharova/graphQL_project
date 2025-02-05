import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PETS } from '../../../graphql/mutations/features/GetPets';
import { DELETE_PET } from '../../../graphql/mutations/features/DeletePet';
import { Pet } from '../../../models/Pet';
import { Table } from '../../shared/components/Table';

export const PetList: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_PETS);
  const [deletePet] = useMutation(DELETE_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>Error fetching pets: {error.message}</p>;

  const handleDelete = (pet: Pet) => {
    deletePet({
      variables: { input: { id: pet.id } },
    });
  };

  const columns = {
    Name: (pet: Pet) => pet.name,
    Type: (pet: Pet) => pet.type,
    Gender: (pet: Pet) => pet.gender,
    Age: (pet: Pet) => pet.age,
  };

  const actions = {
    View: (pet: Pet) => navigate(`/admin/view/${pet.id}`),
    Edit: (pet: Pet) => navigate(`/admin/form/${pet.id}`),
    Delete: handleDelete,
  };

  return (
    <div className='container'>
      <h1 className='center-align'>Pet List</h1>
      <Link
        to='/admin/form'
        className='btn green lighten-1'
        style={{ marginBottom: '20px' }}
      >
        Add Pet
      </Link>
      {data.pets.length === 0 ? (
        <p className='center-align'>Pets not found</p>
      ) : (
        <Table columns={columns} data={data.pets} actions={actions} />
      )}
    </div>
  );
};
