import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import AuthForm from './AuthForm';
import { SIGNUP_MUTATION } from '../../graphql/mutations/auth/Signup';
import { CURRENT_USER_QUERY } from '../../graphql/queries/auth/CurrentUser';
import { useNavigate } from 'react-router-dom';

interface AuthFormData {
  email: string;
  password: string;
}

interface SignupMutationResponse {
  signup: {
    id: string;
    email: string;
  };
}

const SignupForm: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const [signup] = useMutation<SignupMutationResponse>(SIGNUP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => {
      navigate('/admin');
    },
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((err) => err.message);
      setErrors(errorMessages);
    },
  });

  const onSubmit = async (formData: AuthFormData) => {
    try {
      await signup({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    } catch (error: any) {
      const errorMessages = error.graphQLErrors.map((err: any) => err.message);
      setErrors(errorMessages);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <AuthForm errors={errors} onSubmit={onSubmit} />
    </div>
  );
};

export default SignupForm;
