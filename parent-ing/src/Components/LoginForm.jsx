import React from 'react';

export default class LoginFrom extends React.PureComponent {
    state = {
        email: '',
        password: '',
        login: true,
        username: '',
        firstName: '',
        lastName: '',
        dob: '',
        loggedUser: '',
        loggedPassword: '',
    }

    handleFormSubmit = event => {
        event.preventDefault()

        if (this.state.login) {

        } else {
            
        }
    }

    handleFirstNameInput = event => {

    }

    handleLastNameInput = event => {

    }

    handleDobInput = event => {

    }

    handleSigninBtn = () => {
        this.setState({login: false})
    }
    //################# RENDER ################
    render() {
        let signinFields = null;

        if (!this.state.login) {
            signinFields = <>
                <label className='mr-sm-2' htmlFor='firstname'>First name: </label>
                <input className='form-control mb-2 mr-sm-2' id='firstname' type='text' value={this.state.firstName} onChange={this.handleFirstNameInput}></input>
                <label className='mr-sm-2' htmlFor='lastname'>Last name: </label>
                <input className='form-control mb-2 mr-sm-2' id='lastname' type='text' value={this.state.lastName} onChange={this.handleLastNameInput}></input>
                <label className='mr-sm-2' htmlFor='firstname'>Date of birth</label>
                <input className='form-control mb-2 mr-sm-2' id='firstname' type='date' value={this.state.dob} onChange={this.handleDobInput}></input>
            </>
        }
        return(
            <form className='form-inline' onSubmit={this.handleFormSubmit}>
                <label className='mr-sm-2' htmlFor='email'>Email address: </label>
                <input className='form-control mb-2 mr-sm-2' id='email' type='email' value={this.state.firstName} onChange={this.handleFirstNameInput}></input>
                <label className='mr-sm-2' htmlFor='password'>password: </label>
                <input className='form-control mb-2 mr-sm-2' id='password' type='password' value={this.state.lastName} onChange={this.handleLastNameInput}></input>
                {signinFields}
                <button>Login</button>
                <button onClick={this.handleSigninBtn}>Sign-in</button>
            </form>
        )
    }
}