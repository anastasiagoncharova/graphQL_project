import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PETS } from '../../../graphql/mutations/features/GetPets';
import { ADD_PET } from '../../../graphql/mutations/features/AddPet';
import { EDIT_PET } from '../../../graphql/mutations/features/EditPet'; 
import { Pet } from '../../../models/Pet';

export const PetForm: React.FC<{ pet?: Pet; onSave: () => void }> = ({
  pet,
  onSave,
}) => {
  const [formState, setFormState] = useState<Partial<Pet>>(
    pet || {
      name: '',
      description: '',
      gender: 'male',
      type: 'dog',
      age: 0,
      vaccinated: false,
      sterilized: false,
      image: '',
    }
  );

  const [addPet] = useMutation(ADD_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  const [editPet] = useMutation(EDIT_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pet) {
      const { id, ...input } = formState;
      editPet({ variables: { id: pet.id, input } });
    } else {
      addPet({ variables: { input: formState } });
    }
    onSave();
  };

  return (
    <form className='container' onSubmit={handleSubmit}>
      <h1 className='center-align'>{pet ? 'Edit Pet' : 'Add New Pet'}</h1>
      <div className='input-field'>
        <input
          type='text'
          id='name'
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
        <label htmlFor='name' className={pet ? 'active' : ''}>
          Name
        </label>
      </div>
      <div className='input-field'>
        <textarea
          id='description'
          className='materialize-textarea'
          value={formState.description}
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
        />
        <label htmlFor='description' className={pet ? 'active' : ''}>
          Description
        </label>
      </div>
      <div className='input-field'>
        <select
          className='browser-default'
          value={formState.gender}
          onChange={(e) =>
            setFormState({
              ...formState,
              gender: e.target.value as 'male' | 'female',
            })
          }
        >
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </div>
      <div className='input-field'>
        <select
          className='browser-default'
          value={formState.type}
          onChange={(e) =>
            setFormState({
              ...formState,
              type: e.target.value as 'dog' | 'cat',
            })
          }
        >
          <option value='dog'>Dog</option>
          <option value='cat'>Cat</option>
        </select>
      </div>
      <div className='input-field'>
        <input
          type='number'
          id='age'
          value={formState.age}
          onChange={(e) =>
            setFormState({ ...formState, age: parseInt(e.target.value, 10) })
          }
        />
        <label htmlFor='age' className={pet ? 'active' : ''}>
          Age
        </label>
      </div>
      <p>
        <label>
          <input
            type='checkbox'
            checked={formState.vaccinated}
            onChange={(e) =>
              setFormState({ ...formState, vaccinated: e.target.checked })
            }
          />
          <span>Vaccinated</span>
        </label>
      </p>
      <p>
        <label>
          <input
            type='checkbox'
            checked={formState.sterilized}
            onChange={(e) =>
              setFormState({ ...formState, sterilized: e.target.checked })
            }
          />
          <span>Sterilized</span>
        </label>
      </p>
      <div className='input-field'>
        <input
          type='text'
          id='image'
          value={formState.image}
          onChange={(e) =>
            setFormState({ ...formState, image: e.target.value })
          }
        />
        <label htmlFor='image' className={pet ? 'active' : ''}>
          Image URL
        </label>
      </div>
      <button className='btn waves-effect waves-light' type='submit'>
        {pet ? 'Save Changes' : 'Add Pet'}
      </button>
    </form>
  );
};
