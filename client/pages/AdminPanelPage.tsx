import React, { useState } from 'react';
import { PetDetails } from '../components/features/PetDetails/PetDetails';
import { PetForm } from '../components/features/PetForm/PetForm';
import { PetList } from '../components/features/PetList/PetList';
import { Pet } from '../models/Pet';

export const AdminPanelPage: React.FC = () => {
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [viewingPetId, setViewingPetId] = useState<number | null>(null);
  const [addingPet, setAddingPet] = useState<boolean>(false);

  return (
    <div>
      {viewingPetId ? (
        <PetDetails petId={viewingPetId} />
      ) : editingPet ? (
        <PetForm pet={editingPet} onSave={() => setEditingPet(null)} />
      ) : addingPet ? (
        <PetForm onSave={() => setAddingPet(false)} />
      ) : (
        <PetList
          onEdit={(pet) => setEditingPet(pet)}
          onView={(id) => setViewingPetId(id)}
          onAdd={() => setAddingPet(true)}
        />
      )}
    </div>
  );
};
