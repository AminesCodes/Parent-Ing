import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Logo from '../Media/Parent-Ing_Logo.png'
import Home from './Home'
import Posts from './Posts'
import Pictures from './Pictures'
import Likes from './Likes'
import Account from './Account'

export default class Welcome extends React.PureComponent {



    //################ RENDER ###########
    render() {
        console.log(this.props)
        return (
            <>
                <nav className='navbar navbar-expand-md navbar-light bg-appColor'>
                    <Link className='navbar-brand' to='/'>
                        <img className='img-fluid' src={Logo} alt='app logo' width='130px' />
                    </Link>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#collapsibleNavbar'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='collapsibleNavbar'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to='/'>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${this.props.user.username}/posts`}>My Posts</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${this.props.user.username}/pictures`}>My Pics</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${this.props.user.username}/likes`}>My Likes</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${this.props.user.username}/account`}>Account</Link>
                            </li>
                        <li className='navbar-nav float-right'>
                            <div className='btn-nav float-right'>
                                <Link className='btn btn-secondary btn-small navbar-btn' to='/' onClick={this.props.logout}>Logout</Link>
                            </div>
                        </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path={`/:username/posts`} render={props => (<Posts user={this.props.user} {...props} /> )} />
                    <Route path={`/:username/pictures`} render={props => (<Pictures user={this.props.user} {...props} /> )} />
                    <Route path={`/:username/likes`} render={props => (<Likes user={this.props.user} {...props} /> )} />
                    <Route path={`/:username/account`} render={props => (<Account user={this.props.user} {...props} /> )} />
                    {/* <Route path={`/:username/pictures`} component={Pictures} />
                    <Route path={`/:username/likes`} component={Likes} />
                    <Route path={`/:username/account`} component={Account} /> */}
                    {/* <Route exact component={ErrorNotFound} /> */}
                </Switch>
            </>
        )
    }
}