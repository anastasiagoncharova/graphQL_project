import React, { useState } from 'react';

interface AuthFormProps {
  errors: string[];
  onSubmit: (formData: { email: string; password: string }) => void;
}

interface FormState {
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ errors, onSubmit }) => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='row'>
      <form onSubmit={handleSubmit} className='col s6'>
        <div className='input-field'>
          <input
            name='email'
            placeholder='Email'
            type='email'
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className='input-field'>
          <input
            name='password'
            placeholder='Password'
            type='password'
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <div className='errors'>
          {errors.map((error) => (
            <div key={error} className='error-message'>
              {error}
            </div>
          ))}
        </div>
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
