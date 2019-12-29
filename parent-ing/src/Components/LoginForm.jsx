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
        this.setState({firstName: event.target.value})
    }
    
    handleLastNameInput = event => {
        this.setState({lastName: event.target.value})
    }
    
    handleDobInput = event => {
        this.setState({dob: event.target.value})
    }
    
    handleEmailInput = event => {
        this.setState({email: event.target.value})
    }

    handlePasswordInput = event => {
        this.setState({password: event.target.value})
    }

    handleSigninBtn = () => {
        this.setState({login: false})
    }
    //################# RENDER ################
    render() {
        let signinFields = null;

        if (!this.state.login) {
            signinFields = <>
                <div className="form-group">
                    <input className='form-control' id='firstname' type='text' value={this.state.firstName} onChange={this.handleFirstNameInput} required></input>
                    <label className='ph-area' htmlFor='firstname'>First name: </label>
                </div>
                <div className="form-group">
                    <input className='form-control' id='lastname' type='text' value={this.state.lastName} onChange={this.handleLastNameInput} required></input>
                    <label className='ph-area' htmlFor='lastname'>Last name: </label>
                </div>
                <div className="form-group">
                    <input className='form-control right-text' id='firstname' type='date' value={this.state.dob} onChange={this.handleDobInput} required></input>
                    <label className='ph-area' htmlFor='firstname'>Date of birth</label>
                </div>
            </>
        }
        return(
            <form className='was-validated' onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <input className='form-control' id='email' type='email' value={this.state.email} onChange={this.handleEmailInput} required></input>
                    <label className='ph-area' htmlFor='email'>Email address: </label>
                </div>
                <div className="form-group">
                    <input className='form-control' id='password' type='password' value={this.state.password} onChange={this.handlePasswordInput} required></input>
                    <label className='ph-area' htmlFor='password'>password: </label>
                </div>
                {signinFields}
                <div className='d-flex'>
                    <button className='p-2'>Login</button>
                    <button className='p-2 ml-auto' onClick={this.handleSigninBtn}>Sign-in</button>
                </div>
            </form>
        )
    }
}