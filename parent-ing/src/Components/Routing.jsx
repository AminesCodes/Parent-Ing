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
        return (
            <>
                <nav className='navbar navbar-expand-sm bg-appColor'>
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
                                <Link className='nav-link mb-0 h6 text-dark' to='/posts'>My Posts</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to='/pictures'>My Pics</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to='/likes'>My Likes</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to='/account'>Account</Link>
                            </li>
                        </ul>
                    </div>
                        <ul className='nav navbar-nav navbar-right'>
                            <div className="btn-nav">
                                <Link className='btn btn-secondary btn-small navbar-btn' to='/logout'>Logout</Link>
                            </div>
                        </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/posts' component={Posts} />
                    <Route path='/pictures' component={Pictures} />
                    <Route path='/likes' component={Likes} />
                    <Route path='/account' component={Account} />
                    <Route path='/logout' component={Home} />
                    {/* <Route exact component={ErrorNotFound} /> */}
                </Switch>
            </>
        )
    }
}