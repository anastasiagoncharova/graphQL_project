import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: string[];
  error?: { message?: string };
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options, error, ...props }, ref) => (
    <div className='input-field'>
      <label htmlFor={id}>{label}</label>
      <select className='browser-default' id={id} ref={ref} {...props}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className='error-text'>{error.message}</span>}
    </div>
  )
);
