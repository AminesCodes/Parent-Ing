import React from 'react';
import './App.css';

import Logo from './Media/Parent-Ing_Logo.png'

import LoginForm from './Components/LoginForm'
import Intro from './Components/Intro'
import Routing from './Components/Routing'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const pw = sessionStorage.getItem('Parent-Ing_App_KS')
const uId = sessionStorage.getItem('Parent-Ing_App_UId')

class App extends React.PureComponent {
  state = {
    loggedUser: '',
  }

  handleFormSubmit = (user, password) => {
    sessionStorage.setItem('Parent-Ing_App_KS', password);
    sessionStorage.setItem('Parent-Ing_App_UId', user.id);
    this.setState({loggedUser: user})
  }

  handleLogOut = () => {
    sessionStorage.clear();
    this.setState({loggedUser: ''})
  }

  // ################## RENDER ###################
  render() {
    const pw = sessionStorage.getItem('Parent-Ing_App_KS')
    const uId = sessionStorage.getItem('Parent-Ing_App_UId')

    let pageContent = 
      <>
        <div className="jumbotron bg-appColor text-white">
          <div className="container-sm mx-auto">
            <img className='img-fluid d-sm-block mx-auto' src={Logo} alt='app logo'/>
            <h1 className='text-center'>My App</h1>
          </div>
          <LoginForm formSubmit={this.handleFormSubmit}/>
        </div>
        <Intro />
      </>

    if (pw && uId) {
      pageContent = <Routing user={this.state.loggedUser} logout={this.handleLogOut}/>
    }

    return (
      <div className="App">
        {pageContent}
      </div>
    );
  }
}

export default App;
