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
    }

    handleFormSubmit = event => {
        event.preventDefault()
    }

    handleFirstNameInput = event => {

    }

    handleLastNameInput = event => {

    }

    handleDobInput = event => {

    }
    //################# RENDER ################
    render() {
        let signinFields = null;

        if (!this.state.login) {
            signinFields = <>
                <label htmlFor='firstname'>First name: </label>
                <input id='firstname' type='text' value={this.state.firstName} onChange={this.handleFirstNameInput}></input>
                <label htmlFor='lastname'>Last name: </label>
                <input id='lastname' type='text' value={this.state.lastName} onChange={this.handleLastNameInput}></input>
                <label htmlFor='firstname'>Date of birth</label>
                <input id='firstname' type='date' value={this.state.dob} onChange={this.handleDobInput}></input>
            </>
        }
        return(
            <form onSubmit={this.handleFormSubmit}>
                <label htmlFor='email'>Email address: </label>
                <input id='email' type='email' value={this.state.firstName} onChange={this.handleFirstNameInput}></input>
                <label htmlFor='password'>password: </label>
                <input id='password' type='password' value={this.state.lastName} onChange={this.handleLastNameInput}></input>
            </form>
        )
    }
}