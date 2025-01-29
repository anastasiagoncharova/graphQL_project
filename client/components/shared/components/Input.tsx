import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: { message?: string };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, type = 'text', error, ...props }, ref) => (
    <div className='input-field'>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} ref={ref} {...props} />
      {error && <span className='error-text'>{error.message}</span>}
    </div>
  )
);
