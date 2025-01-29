import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.scss';
import App from './components/App';
import LoginForm from './auth/forms/LoginForm';
import SignupForm from './auth/forms/SignupForm';
import { AdminPanelPage } from './pages/AdminPanelPage';
import requireAuth from './auth/hoc/requireAuth';

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          user: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

const Root: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route
              path="admin/*"
              element={
                <RequiredAuth>
                  <AdminPanelPage />
                </RequiredAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

interface RequiredAuthProps {
  children: ReactNode;
}

const RequiredAuth: React.FC<RequiredAuthProps> = ({ children }) => {
  const WrappedComponent = requireAuth(() => <>{children}</>);
  return <WrappedComponent />;
};

const container = document.querySelector('#root');
if (!container) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(container);
root.render(<Root />);
