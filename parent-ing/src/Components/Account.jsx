import React from 'react'
import Axios from 'axios'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const handleNetworkErrors = err => {
    if (err.response) {
        if (err.response.data.message) {
            toast.error(err.response.data.message,
                { position: toast.POSITION.TOP_CENTER });
        }
    } else if (err.message) {
        toast.error(err.message,
            { position: toast.POSITION.TOP_CENTER });
    } else {
        toast.error('Sorry, an error occured, try again later',
            { position: toast.POSITION.TOP_CENTER });
        console.log('Error', err);
    }
}

export default class Account extends React.PureComponent {
    state = {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        joiningDate: '',
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
        waitingForData: true
    }

    async componentDidMount() {
        const username = this.props.match.params.username

        if (username !== 'undefined') {
            try {
                const { data } = await Axios.get(`http://localhost:3129/users/${username}`)
                this.setState({
                    id: data.payload.id,
                    username: data.payload.username,
                    firstName: data.payload.firstname,
                    lastName: data.payload.lastname,
                    dob: (data.payload.dob).slice(0, 10),
                    email: data.payload.email,
                    joiningDate: (data.payload.signing_date).slice(0, 10),
                    waitingForData: false
                })
            } catch (err) {
                this.setState({ waitingForData: false })
                handleNetworkErrors(err)
            }
        } else {
            toast.error('Login issue, please login into your account again',
                { position: toast.POSITION.TOP_CENTER });
        }
    }

    handleFormSubmit = async (event) => {
        event.preventDefault()
        const {id, username, firstName, lastName, dob, email, oldPassword} = this.state
        
        if (id && username && firstName && lastName && dob && email && oldPassword) {
            try {
                this.setState({ waitingForData: true })
                const userInfo = { 
                    username: username, 
                    firstname: firstName, 
                    lastname: lastName, 
                    dob: dob, 
                    password: oldPassword, 
                    email: email
                }

                const { data } = await Axios.put(`http://localhost:3129/users/${id}`, userInfo)
                console.log(data)
                this.setState({
                    username: data.payload.username,
                    firstName: data.payload.firstname,
                    lastName: data.payload.lastname,
                    dob: (data.payload.dob).slice(0, 10),
                    email: data.payload.email,
                    waitingForData: false
                })
                toast.success('Updated information successfully',
                { position: toast.POSITION.BOTTOM_CENTER });
            } catch (err) {
                this.setState({ waitingForData: false })
                handleNetworkErrors(err)
            }
        } else {
            toast.error('Missing information, All fields are required',
                { position: toast.POSITION.TOP_CENTER });
        }
    }

    handlePasswordForm = async (event) => {
        event.preventDefault()
        const { id, oldPassword, newPassword, newPasswordConfirmation } = this.state

        if (oldPassword && newPassword && newPasswordConfirmation && newPassword === newPasswordConfirmation) {
            try {
                // this.setState({ waitingForData: true })
                const updateData = { 
                    oldPassword: oldPassword, 
                    newPassword: newPassword, 
                    confirmedPassword: newPasswordConfirmation, 
                }

                const { data } = await Axios.patch(`http://localhost:3129/users/${id}/password`, updateData)
                console.log(data)
                // this.setState({ waitingForData: false })
                if (data.status === 'success') {
                    sessionStorage.setItem('Parent-Ing_App_KS', newPassword);
                    toast.success('Password updated successfully ',
                    { position: toast.POSITION.BOTTOM_CENTER });

                } else {
                    toast.warn('Something went wrong!!',
                    { position: toast.POSITION.TOP_CENTER });
                }
            } catch (err) {
                // this.setState({ waitingForData: false })
                handleNetworkErrors(err)
            }
        } else {
            toast.error('Missing information, All fields are required OR new password confirmation does not match',
                { position: toast.POSITION.TOP_CENTER });
        }
        
    }

    handleEmailInput = event => {
        this.setState({email: event.target.value})
    }

    handleUsernameInput = event => {
        this.setState({username: event.target.value})
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

    handleOldPasswordInput = event => {
        this.setState({oldPassword: event.target.value})
    }

    handleNewPasswordInput = event => {
        this.setState({newPassword: event.target.value})
    }

    handleNewPasswordConfirmInput = event => {
        this.setState({newPasswordConfirmation: event.target.value})
    }


    // ############ RENDER ############
    render() {
        let content =
            <div className='spinner-border m-5' role='status'>
                <span className='sr-only  text-center'>Loading...</span>
            </div>

        if (!this.state.waitingForData) {
            content = 
            <>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <a className='nav-item nav-link active' id='nav-profile-tab' data-toggle='tab' href='#nav-profile' role='tab' aria-controls='nav-profile' aria-selected='true'>Profile</a>
                        <a className='nav-item nav-link' id='nav-password-tab' data-toggle='tab' href='#nav-password' role='tab' aria-controls='nav-password' aria-selected='false'>Update Password</a>
                    </div>
                </nav>

                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-profile' role='tabpanel' aria-labelledby='nav-profile-tab'>
                        <form className='form-row was-validated' onSubmit={this.handleFormSubmit}>
                            <div className='form-group col-sm-6'>
                                <label className='' htmlFor='email'>Email address: </label>
                                <input className='form-control' id='email' type='email' value={this.state.email} onChange={this.handleEmailInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label className='' htmlFor='username'>Username: </label>
                                <input className='form-control' id='username' type='text' value={this.state.username} onChange={this.handleUsernameInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label className='' htmlFor='firstname'>First name: </label>
                                <input className='form-control' id='firstname' type='text' value={this.state.firstName} onChange={this.handleFirstNameInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label className='' htmlFor='lastname'>Last name: </label>
                                <input className='form-control' id='lastname' type='text' value={this.state.lastName} onChange={this.handleLastNameInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label className='' htmlFor='dob'>Date of birth</label>
                                <input className='form-control' id='dob' type='date' value={this.state.dob} onChange={this.handleDobInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label className='' htmlFor='joiningDate'>Member since: </label>
                                <input className='form-control' id='joiningDate' type='date' value={this.state.joiningDate} disabled></input>
                            </div>
                            <div className='form-group col-sm-12'>
                                <label className='' htmlFor='password'>Please type your current Password to allow changes: </label>
                                <input className='form-control' id='password' type='password' autoComplete='off' value={this.state.oldPassword} onChange={this.handleOldPasswordInput} required></input>
                            </div>
                            <div className='d-sm-block col-sm-12'>
                                <button className='d-lg-block'>Update Information</button>
                            </div>
                        </form>
                    </div>
                    <div className='tab-pane fade' id='nav-password' role='tabpanel' aria-labelledby='nav-password-tab'>
                        <form className='form-row was-validated' onSubmit={this.handlePasswordForm}>
                            <div className='form-group col-sm-12'>
                                <label className='' htmlFor='password'>Old Password: </label>
                                <input className='form-control' id='password' type='password' autoComplete='off' value={this.state.oldPassword} onChange={this.handleOldPasswordInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label className='' htmlFor='newPassword'>New Password: </label>
                                <input className='form-control' id='newPassword' type='password' autoComplete='off' value={this.state.newPassword} onChange={this.handleNewPasswordInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label className='' htmlFor='newPasswordConfirmation'>Confirm Password: </label>
                                <input className='form-control' id='newPasswordConfirmation' type='password' autoComplete='off' value={this.state.newPasswordConfirmation} onChange={this.handleNewPasswordConfirmInput} required></input>
                            </div>
                            <div className='d-sm-block col-sm-12'>
                                <button className='d-lg-block'>Update Information</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
                
        }

        return (
            <div className='container'>
                {content}

                
            </div>
        )
    }
}