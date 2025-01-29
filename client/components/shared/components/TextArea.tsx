import React, { forwardRef } from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: { message?: string };
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, error, ...props }, ref) => (
    <div className='input-field'>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className='materialize-textarea'
        ref={ref}
        {...props}
      ></textarea>
      {error && <span className='error-text'>{error.message}</span>}
    </div>
  )
);
