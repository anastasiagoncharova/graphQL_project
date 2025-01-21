import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER_QUERY } from '../../graphql/queries/auth/CurrentUser';

export default (WrappedComponent: any) => {
  return (props: any) => {
    const navigate = useNavigate();
    const { loading, data } = useQuery(CURRENT_USER_QUERY);

    if (loading) return <div>Loading...</div>;

    if (!data.user) {
      navigate('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
