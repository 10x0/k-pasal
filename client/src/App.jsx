import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import { SessionProvider } from './components/Session/Provider';
import PageContainer from './pages';

function App() {
  return (
    <main className="w-screen h-screen flex flex-col bg-blue-100 overflow-auto">
      <BrowserRouter>
        <SessionProvider>
          <Header />
          <PageContainer />
        </SessionProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
