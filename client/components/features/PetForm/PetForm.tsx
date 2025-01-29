import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { GET_PETS } from '../../../graphql/mutations/features/GetPets';
import { ADD_PET } from '../../../graphql/mutations/features/AddPet';
import { EDIT_PET } from '../../../graphql/mutations/features/EditPet';
import { Pet } from '../../../models/Pet';
import { Input } from '../../shared/components/Input';
import { TextArea } from '../../shared/components/TextArea';
import { Checkbox } from '../../shared/components/Checkbox';
import { Button } from '../../shared/components/Button';
import { Select } from '../../shared/components/Select';

interface PetFormProps {
  onSave: () => void;
}

export const PetForm: React.FC<PetFormProps> = ({ onSave }) => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data, loading } = useQuery(GET_PETS);

  const methods = useForm<Partial<Pet>>({
    defaultValues: {
      name: '',
      description: '',
      gender: 'male',
      type: 'dog',
      age: 1,
      vaccinated: false,
      sterilized: false,
      image: '',
    },
    mode: 'onBlur',
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isEditMode && data) {
      const petToEdit = data.pets.find((p: Pet) => p.id === id);
      if (petToEdit) {
        Object.keys(petToEdit).forEach((key) => {
          setValue(key as keyof Pet, petToEdit[key]);
        });
      }
    }
  }, [isEditMode, data, id, setValue]);

  const [addPet] = useMutation(ADD_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  const [editPet] = useMutation(EDIT_PET, {
    refetchQueries: [{ query: GET_PETS }],
  });

  const onSubmit = (formData: Partial<Pet>) => {
    if (isEditMode) {
      const { id: _, ...input } = formData;
      editPet({ variables: { id, input } });
    } else {
      addPet({ variables: { input: formData } });
    }
    onSave();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <FormProvider {...methods}>
      <form className='container' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='center-align'>
          {isEditMode ? 'Edit Pet' : 'Add New Pet'}
        </h1>
        <Controller
          name='name'
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <Input label='Name *' id='name' {...field} error={errors.name} />
          )}
        />
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextArea label='Description' id='description' {...field} />
          )}
        />
        <Controller
          name='gender'
          control={control}
          rules={{ required: 'Gender is required' }}
          render={({ field }) => (
            <Select
              label='Gender *'
              id='gender'
              options={['male', 'female']}
              {...field}
              error={errors.gender}
            />
          )}
        />
        <Controller
          name='type'
          control={control}
          rules={{ required: 'Type is required' }}
          render={({ field }) => (
            <Select
              label='Type *'
              id='type'
              options={['dog', 'cat']}
              {...field}
              error={errors.type}
            />
          )}
        />
        <Controller
          name='age'
          control={control}
          rules={{
            required: 'Age is required',
            min: { value: 1, message: 'Age must be greater than 0' },
          }}
          render={({ field }) => (
            <Input
              label='Age *'
              id='age'
              type='number'
              {...field}
              onChange={(e) => {
                field.onChange(e);
                methods.trigger('age');
              }}
              error={errors.age}
            />
          )}
        />
        <Controller
          name='vaccinated'
          control={control}
          render={({ field }) => (
            <Checkbox
              label='Vaccinated'
              id='vaccinated'
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <Controller
          name='sterilized'
          control={control}
          render={({ field }) => (
            <Checkbox
              label='Sterilized'
              id='sterilized'
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <Button label={isEditMode ? 'Save Changes' : 'Add Pet'} type='submit' />
      </form>
    </FormProvider>
  );
};
