import React from 'react';
import './App.css';

import LoginForm from './Components/LoginForm'

function App() {
  return (
    <div className="App">
      <div className="jumbotron jumbotron-fluid bg-dark text-white">
        <div className="container-fluid">
          <img src='./Media/Parent-Ing_Logo.png' alt='app logo' />
          <h1>My App</h1>
        </div>
        <LoginForm />
      </div>
        <div>
          <h2>Welcome to Parent-Ing</h2>
          <p>A place for parents where to address all your concerns on being a parent</p>
          <p>Share your experiences, stories, memories and so on</p>
          <p>Ask questions or answer others concerns</p>
        </div>
    </div>
  );
}

export default App;
