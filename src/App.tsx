import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Route, Routes } from'react-router-dom';
import './App.css';
import { LogTime } from './pages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/log-time" element={<LogTime/>}/>
          <Route path="/counter" element={<Counter/>}/>
        </Routes> 
      </header>
    </div>
  );
}

export default App;
