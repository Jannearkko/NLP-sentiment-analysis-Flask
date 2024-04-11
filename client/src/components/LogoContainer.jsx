import React from 'react';
import logo from '../icons/logo.png'; // Make sure the path matches your project structure
import '../App.css';

function LogoContainer() {
  return (
    <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="Company Logo" className='App-logo' style={{ width: '60px', height: 'auto' }} />
      <span className="company-name" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>PhrAIse</span>
    </div>
  );
}

export default LogoContainer;