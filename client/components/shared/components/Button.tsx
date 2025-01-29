import React from 'react';
import { useFormContext } from 'react-hook-form';

export const Button: React.FC<{
  label: string;
  type?: 'button' | 'submit';
}> = ({ label, type = 'button' }) => {
  const { formState } = useFormContext();
  return (
    <button
      className='btn waves-effect waves-light'
      type={type}
      disabled={!formState.isValid}
    >
      {label}
    </button>
  );
};
