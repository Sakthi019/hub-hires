import React from 'react';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import CandidateList from './Components/usestatelist';

function App() {
  return (
    <>
      <PrimeReactProvider>
        <div className='outer-card' style={{ padding: '30px' }}>
          <CandidateList />
        </div>
      </PrimeReactProvider>
    </>
  );
}

export default App;
