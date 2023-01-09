import React from "react";
import { useState } from 'react'
import ProfileButton from './ProfileButton';
import logo from './logo3.png'
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormModal/SignupForm';
import { useSelector } from 'react-redux';

// function DropdownMenu() {
//     const [open, setOpen] = useState(0)
//     const sessionUser = useSelector(state => state.session.user);

//     return (
//         <div>

//         </div>
//     )

// }

function Dropdownimg(props) {
    const [open, setOpen] = useState(0)
    return (
        <div className="navitem">
            <a className="icon-button" onClick={() => { setOpen(!open) }}>
                <i class="fa-solid fa-user"></i>
            </a>
            {open && <DropMenu />}
        </div>
    )
}

function DropMenu() {
    const [showModal, setShowModal] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    return (
        <div className="dropdown">
            <div id='navhomebutton'>
                <NavLink exact to="/">
                    <img id='navLogo' src={logo} alt='Home'></img>
                </NavLink>
            </div>
            < div id='navloginsignup'>
                {sessionUser &&
                    <div>
                        <NavLink to='/spots/new'>Become a host</NavLink>
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
        </div>
    )
}
function ProfileDropdown(props) {

}

export default Dropdownimg;
