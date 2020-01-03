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
        waitingForData: true
    }

    async componentDidMount() {
        const username = this.props.match.params.username
        if (username !== 'undefined') {
            try {
                const { data } = await Axios.get(`http://localhost:3129/users/${username}`)
                console.log(data)
                this.setState({waitingForData: false})
            } catch (err) {
                this.setState({waitingForData: false})
                handleNetworkErrors(err)
            }
        }
    }

    // ############ RENDER ############
    render() {
        let spinner = null;
        if (this.state.waitingForData) {
            spinner = <div className="spinner-border d-sm-block" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        }

        return (
            <div>Account {spinner}</div>
        )
    }
}