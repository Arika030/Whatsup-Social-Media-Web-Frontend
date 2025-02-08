import React, { useContext } from "react";
import { AuthContext } from '../../Auth-context';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to='/' exact>
                    POSTS
                </NavLink>
            </li>

            {auth.isLoggedIn && (
                <li>
                    <NavLink to='/u1/posts'>
                        MY POSTS
                    </NavLink>
                </li>
            )}

            {auth.isLoggedIn && (
                <li>
                    <NavLink to='/posts/new'>
                        CREATE
                    </NavLink>
                </li>
            )}

            {!auth.isLoggedIn && (
                <li>
                    <NavLink to='/auth'>
                        LOGIN
                    </NavLink>
                </li>
            )}

            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>
                        LOGOUT
                    </button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
