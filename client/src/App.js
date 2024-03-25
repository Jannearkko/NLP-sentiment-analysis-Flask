import './App.css';
import React, { useState, useEffect } from 'react';
import TextInputComponent from './components/InputComponent';
import ErrorBoundary from './components/ErrorBoundary';
import Button from './components/Button';


function App() {

  return (
    <ErrorBoundary>
        <div className="App">

          <Button 
            className="mt-5"
            color='green'
          >
            Login
          </Button>
          <TextInputComponent />
        </div>
    </ErrorBoundary>
  );
}

export default App;
