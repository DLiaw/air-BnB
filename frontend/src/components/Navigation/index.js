// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';
import logo from './logo3.png'


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignupFormModal />
            </>
        );
    }

    return (
        <div className='navmaindiv'>
            <div id='navhomebutton'>
                <NavLink exact to="/">
                    <img id='navLogo' src={logo} alt='Home'></img>
                </NavLink>
            </div>
            <div id='navloginsignup'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );


}

export default Navigation;
