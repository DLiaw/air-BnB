// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { allBookingsUserThunk } from "../../store/bookings";
import icon from './images/icon.png'
import './dropdown1.css'
import { NavLink, useHistory } from 'react-router-dom';

function ProfileButton({ user, setLogin, setShowModal }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()
    const bookings = useSelector(state => Object.values(state.bookings.userBookings))

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        if (user) dispatch(allBookingsUserThunk(user.id))
        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };
    // const username = user.username
    // const email = user.email
    return (
        <>
            <button className="menu-trigger" onClick={openMenu}>
                {/* <i class="fa-solid fa-user"></i> */}
                <img alt='Log in' src={icon}></img>
            </button>
            {showMenu && (user ?
                (<ul className="dropdown2">

                    <li id="loginmessage" >Welcome back {user.username}</li>
                    <li id="loginmessage" >{user.email}</li>
                    {bookings.length >= 1 ? <li>
                        <NavLink id="asdf" style={{ width: '90%' }} to={`/${bookings[0].userId}/bookings`}>Trips</NavLink>
                    </li>
                        :
                        null
                    }
                    <li>
                        <button id="asdf" style={{ marginLeft: '2px' }} onClick={logout}>Log Out</button>
                    </li>
                </ul>)
                :
                (<ul className="dropdown1">
                    <li >
                        <button id="asdf" onClick={() => {
                            setLogin(true)
                            setShowModal(true)
                        }}>Login</button>
                    </li>
                    <li >
                        <button id="asdf" onClick={() => {
                            setLogin(false)
                            setShowModal(true)
                        }}>Signup</button>
                    </li>
                </ul>)
            )}
        </>
    );
}



export default ProfileButton;



// return (
//     <>
//         <button onClick={openMenu}>
//             <i class="fa-solid fa-user"></i>
//         </button>
//         {showMenu && (user ?
//             (<ul className="profile-dropdown">
//                 <li>{user.username}</li>
//                 <li>{user.email}</li>
//                 <li>
//                     <button onClick={logout}>Log Out</button>
//                 </li>
//             </ul>)
//             :
//             (<ul>
//                 <li className="profile-dropdown">
//                     <button onClick={() => {
//                         setLogin(true)
//                         setShowModal(true)
//                     }}>Login</button>
//                 </li>
//                 <li>
//                     <button onClick={() => {
//                         setLogin(false)
//                         setShowModal(true)
//                     }}>Signup</button>
//                 </li>
//             </ul>)
//         )}
//     </>
// );
