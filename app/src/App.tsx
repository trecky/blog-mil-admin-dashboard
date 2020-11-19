import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';

import AppProvider from './context';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
