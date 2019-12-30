import React from 'react';
import './App.css';

import Logo from './Media/Parent-Ing_Logo.png'

import LoginForm from './Components/LoginForm'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
  return (
    <div className="App">
      <div className="jumbotron bg-success text-white">
        <div className="container-sm mx-auto">
          <img className='img-fluid d-sm-block mx-auto' src={Logo} alt='app logo'/>
          <h1 className='text-center'>My App</h1>
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
