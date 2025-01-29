import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { PetDetails } from '../components/features/PetDetails/PetDetails';
import { PetForm } from '../components/features/PetForm/PetForm';
import { PetList } from '../components/features/PetList/PetList';

export const AdminPanelPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="" element={<PetList />} />
      <Route path="form" element={<PetForm onSave={() => navigate('/admin')} />} />
      <Route path="form/:id" element={<PetForm onSave={() => navigate('/admin')} />} />
      <Route path="view/:id" element={<PetDetails />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default AdminPanelPage;
