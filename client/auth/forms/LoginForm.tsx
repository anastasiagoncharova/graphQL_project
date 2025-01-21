import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import {
  LOGIN_MUTATION,
  LoginMutationResponse,
} from '../../graphql/mutations/auth/Login';
import {
  CURRENT_USER_QUERY,
  CurrentUserQuery,
} from '../../graphql/queries/auth/CurrentUser';

interface AuthFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const { data: userData } = useQuery<CurrentUserQuery>(CURRENT_USER_QUERY);

  const [login] = useMutation<LoginMutationResponse>(LOGIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((err) => err.message);
      setErrors(errorMessages);
    },
  });

  useEffect(() => {
    if (userData?.user) {
      navigate('/dashboard');
    }
  }, [userData?.user, history]);

  const onSubmit = async (formData: AuthFormData) => {
    try {
      await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <AuthForm errors={errors} onSubmit={onSubmit} />
    </div>
  );
};

export default LoginForm;
