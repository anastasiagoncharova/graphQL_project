import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  CURRENT_USER_QUERY,
  CurrentUserQuery,
} from '../../../graphql/queries/auth/CurrentUser';
import {
  LOGOUT_MUTATION,
  LogoutMutationResponse,
} from '../../../graphql/mutations/auth/Logout';

const Header: React.FC = () => {
  const { loading, data } = useQuery<CurrentUserQuery>(CURRENT_USER_QUERY);

  const [logout] = useMutation<LogoutMutationResponse>(LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  const onLogoutClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderButtons = () => {
    if (loading) {
      return null;
    }

    if (data?.user) {
      return (
        <li>
          <a href='#' onClick={onLogoutClick} style={{ cursor: 'pointer' }}>
            Logout
          </a>
        </li>
      );
    }

    return (
      <>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </>
    );
  };

  return (
    <nav>
      <div className='nav-wrapper blue lighten-1'>
        <div className='container'>
          <ul>
            <li>
              <Link
                to='/'
                className='btn white blue-text text-darken-2 waves-effect waves-light'
                style={{ marginRight: '10px' }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/admin'
                className='btn white blue-text text-darken-2 waves-effect waves-light'
              >
                Admin
              </Link>
            </li>
          </ul>
          <ul className='right'>{renderButtons()}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
