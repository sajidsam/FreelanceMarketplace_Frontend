import React from 'react';
import { BrowserRouter } from 'react-router';
import AllRoutes from './Routes/AllRoutes';

const App = () => {
  return (
    
      <BrowserRouter>
          <AllRoutes></AllRoutes>
      </BrowserRouter>

  );
};

export default App;