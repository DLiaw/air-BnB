// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './logo3.png'
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import createASpot from '../CreateASpot';
function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [login, setLogin] = useState(true)

    // let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (
    //         <ProfileButton user={sessionUser} />
    //     );
    // } else {
    //     sessionLinks = (
    //         <>
    //             <LoginFormModal />
    //             <SignupFormModal />
    //         </>
    //     );
    // }

    return (
        <div className='navmaindiv'>
            <div id='navhomebutton'>
                <NavLink exact to="/">
                    <img id='navLogo' src={logo} alt='Home'></img>
                </NavLink>
            </div>
            {/* <div id='navloginsignup'>
                {isLoaded && sessionLinks}
            </div> */}
            {/* <div>
            </div> */}
            < div id='navloginsignup'>
                {sessionUser &&
                    <div>
                        <NavLink to='/spots/new'>Become a host </NavLink>
                    </div>}
                {isLoaded &&
                    <ProfileButton
                        user={sessionUser}
                        setLogin={setLogin}
                        setShowModal={setShowModal}
                    />}
                {showModal && <Modal onClose={() => setShowModal(false)}>
                    {login ?
                        <LoginForm setShowModal={setShowModal} />
                        :
                        <SignupForm setShowModal={setShowModal} />}
                </Modal>}
            </div>
        </div >
    );


}

export default Navigation;
