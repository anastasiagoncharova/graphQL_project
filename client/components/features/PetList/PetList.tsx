import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PETS } from '../../../graphql/mutations/features/GetPets';
import { DELETE_PET } from '../../../graphql/mutations/features/DeletePet';
import { Pet } from '../../../models/Pet';

export const PetList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PETS);
  const [deletePet] = useMutation(DELETE_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>Error fetching pets: {error.message}</p>;

  const handleDelete = (id: string) => {
    deletePet({ variables: { id } });
  };

  return (
    <div className='container'>
      <h1 className='center-align'>Pet List</h1>
      <Link to="/admin/form" className='btn green lighten-1' style={{ marginBottom: '20px' }}>
        Add Pet
      </Link>
      {data.pets.length === 0 ? (
        <p className='center-align'>Pets not found</p>
      ) : (
        <table className='striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.pets.map((pet: Pet) => (
              <tr key={pet.id}>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>{pet.gender}</td>
                <td>{pet.age}</td>
                <td>
                  <Link to={`/admin/view/${pet.id}`} className='btn blue lighten-1'>
                    View
                  </Link>
                  <Link to={`/admin/form/${pet.id}`} className='btn green lighten-1' style={{ marginLeft: '10px' }}>
                    Edit
                  </Link>
                  <button
                    className='btn red lighten-1'
                    onClick={() => handleDelete(pet.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
