import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PETS } from '../../../graphql/mutations/features/GetPets';
import { DELETE_PET } from '../../../graphql/mutations/features/DeletePet';
import { Pet } from '../../../models/Pet';

export const PetList: React.FC<{
  onEdit: (pet: Pet) => void;
  onView: (petId: number) => void;
  onAdd: () => void;
}> = ({ onEdit, onView, onAdd }) => {
  const { data, loading, error } = useQuery(GET_PETS);
  console.log(data);
  const [deletePet] = useMutation(DELETE_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>Error fetching pets: {error.message}</p>;

  const handleDelete = (id: number) => {
    deletePet({ variables: { id } });
  };

  return (
    <div className='container'>
      <h1 className='center-align'>Pet List</h1>
      <button
        className='btn green lighten-1'
        onClick={onAdd}
        style={{ marginBottom: '20px' }}
      >
        Add Pet
      </button>
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
                  <button
                    className='btn blue lighten-1'
                    onClick={() => onView(pet.id)}
                  >
                    View
                  </button>
                  <button
                    className='btn green lighten-1'
                    onClick={() => onEdit(pet)}
                    style={{ marginLeft: '10px' }}
                  >
                    Edit
                  </button>
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
