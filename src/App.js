// App.js
import React from 'react';
import ContextProvider from './Context/Context';
import RoutesContainer from './Routes';

function App() {
  return (
    <ContextProvider>
      <RoutesContainer />
    </ContextProvider>
  );
}

export default App;
