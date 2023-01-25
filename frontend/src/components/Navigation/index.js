// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './logo3.png'
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupModal/SignupForm';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [login, setLogin] = useState(true)

    return (
        <div className='navmaindiv'>
            <div id='navhomebutton'>
                <NavLink exact to="/">
                    <img id='navLogo' src={logo} alt='Home' />
                </NavLink>
            </div>
            <div className='becomehostandicon'>
                < div id='navloginsignup'>
                    {sessionUser &&
                        <div >
                            <NavLink className='navhost' to='/spots/new'>Become a host</NavLink>
                        </div>}
                    {isLoaded && <div>
                        <ProfileButton
                            user={sessionUser}
                            setLogin={setLogin}
                            setShowModal={setShowModal}
                        /> </div>}
                    {showModal && <Modal onClose={() => setShowModal(false)}>
                        {login ?
                            <LoginForm setShowModal={setShowModal} />
                            :
                            <SignupForm setShowModal={setShowModal} />}
                    </Modal>}
                </div>
            </div>
        </div >
    );


}

function DropdownItem(props) {
    return (
        <li className="dropdownItem">
            <img src={props.img}></img>
            <a>{props.text}</a>
        </li>
    )
}

export default Navigation;



// (
//     <div className='navmaindiv'>
//         <div id='navhomebutton'>
//             <NavLink exact to="/">
//                 <img id='navLogo' src={logo} alt='Home'></img>
//             </NavLink>
//         </div>
//         < div id='navloginsignup'>
//             {sessionUser &&
//                 <div>
//                     <NavLink to='/spots/new'>Become a host</NavLink>
//                 </div>}
//             {isLoaded &&
//                 <ProfileButton
//                     user={sessionUser}
//                     setLogin={setLogin}
//                     setShowModal={setShowModal}
//                 />}
//             {showModal && <Modal onClose={() => setShowModal(false)}>
//                 {login ?
//                     <LoginForm setShowModal={setShowModal} />
//                     :
//                     <SignupForm setShowModal={setShowModal} />}
//             </Modal>}
//         </div>
//     </div >
// );
