import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './shared/layout/Header';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
