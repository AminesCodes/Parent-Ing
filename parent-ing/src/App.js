import React from 'react';
import './App.css';

import Logo from './Media/Parent-Ing_Logo.png'

import LoginForm from './Components/LoginForm'
import Intro from './Components/Intro'
import Welcome from './Components/Welcome'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class App extends React.PureComponent {
  state = {
    loggedUser: '',
    loggedPassword: '',
    loggedIn: false,
  }

  handleFormSubmit = async (user, password) => {
    this.setState({
      loggedUser: user,
      loggedPassword: password,
      loggedIn: true
    })
  }

  // ################## RENDER ###################
  render() {
    let pageContent = 
      <>
        <div className="jumbotron bg-success text-white">
          <div className="container-sm mx-auto">
            <img className='img-fluid d-sm-block mx-auto' src={Logo} alt='app logo'/>
            <h1 className='text-center'>My App</h1>
          </div>
          <LoginForm formSubmit={this.handleFormSubmit}/>
        </div>
        <Intro />
      </>

    if (this.state.loggedIn) {
      pageContent = <Welcome />
    }

    return (
      <div className="App">
        {pageContent}
      </div>
    );
  }
}

export default App;
