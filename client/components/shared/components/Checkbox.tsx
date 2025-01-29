import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, ...props }, ref) => (
    <p>
      <label>
        <input type='checkbox' id={id} ref={ref} {...props} />
        <span>{label}</span>
      </label>
    </p>
  )
);
