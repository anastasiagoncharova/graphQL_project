import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_PETS } from '../../../graphql/mutations/features/GetPets';
import { ADD_PET } from '../../../graphql/mutations/features/AddPet';
import { EDIT_PET } from '../../../graphql/mutations/features/EditPet';
import { Pet } from '../../../models/Pet';

interface PetFormProps {
  onSave: () => void;
}

export const PetForm: React.FC<PetFormProps> = ({ onSave }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const { data, loading } = useQuery(GET_PETS);

  const [formState, setFormState] = useState<Partial<Pet>>({
    name: '',
    description: '',
    gender: 'male',
    type: 'dog',
    age: 0,
    vaccinated: false,
    sterilized: false,
    image: '',
  });

  useEffect(() => {
    if (isEditMode && data) {
      const petToEdit = data.pets.find((p: Pet) => p.id === id);
      if (petToEdit) {
        setFormState(petToEdit);
      }
    }
  }, [isEditMode, data, id]);

  const [addPet] = useMutation(ADD_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  const [editPet] = useMutation(EDIT_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  const isFormValid =
    !!formState.name?.trim() &&
    !!formState.gender?.trim() &&
    !!formState.type?.trim() &&
    (formState.age ?? 0) > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    if (isEditMode) {
      const { id: _, ...input } = formState;
      editPet({ variables: { id, input } });
    } else {
      addPet({ variables: { input: formState } });
    }
    onSave();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form className='container' onSubmit={handleSubmit}>
      <h1 className='center-align'>
        {isEditMode ? 'Edit Pet' : 'Add New Pet'}
      </h1>
      <div className='input-field'>
        <label htmlFor='name'>Name *</label>
        <input
          type='text'
          id='name'
          value={formState.name || ''}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
      </div>
      <div className='input-field'>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          className='materialize-textarea'
          value={formState.description || ''}
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
        />
      </div>
      <div className='input-field'>
        <label htmlFor='gender'>Gender *</label>
        <select
          className='browser-default'
          value={formState.gender || ''}
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
        <label htmlFor='type'>Type *</label>
        <select
          className='browser-default'
          value={formState.type || ''}
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
        <label htmlFor='age'>Age *</label>
        <input
          type='number'
          id='age'
          value={formState.age || ''}
          onChange={(e) =>
            setFormState({
              ...formState,
              age: parseInt(e.target.value, 10) || 0,
            })
          }
        />
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
      <button
        className='btn waves-effect waves-light'
        type='submit'
        disabled={!isFormValid}
      >
        {isEditMode ? 'Save Changes' : 'Add Pet'}
      </button>
    </form>
  );
};
