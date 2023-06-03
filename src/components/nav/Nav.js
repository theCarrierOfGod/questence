/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 01/03/2023 - 21:14:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/03/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/

import React from 'react';
import { Link } from 'react-router-dom';
import style from './nav.module.css';
import Logo from '../../images/logo.png'
import User from '../../images/left-image.png'
import { useAuth } from '../../providers/Auth';
import { useHook } from '../../providers/Hook';

const Nav = () => {

    const auth = useAuth();
    const hook = useHook();

    return (
        <>
            <nav className={`${style.isNavbar} navbar navbar-expand-sm bg-white`} style={{ background: 'white !important' }}>
                <div className='container d-flex justify-content-between'>
                    <div className='d-flex align-items-center' >
                        <Link className={`${style.navTitle} navbar-brand mr-3`} to="/">
                            <img src={Logo} alt="Questence" width="120" />
                        </Link>
                        <div className='collapse navbar-collapse'>
                            |
                            <Link className='m-3 nav-link'>
                                Instructor
                            </Link>
                            <Link className='m-3 nav-link'>
                                Authoring
                            </Link>
                            <Link className='m-3 nav-link'>
                                Administering
                            </Link>
                        </div>
                    </div>
                    <button className="navbar-toggler d-lg-none" type="button" onClick={e => alert('No mobile menu')}>
                        <i className='fa fa-bars'></i>
                    </button>
                    <div className={auth.isLoggedIn ? "collapse navbar-collapse justify-content-between" : "d-none"} id="collapsibleNavId" style={{ flexGrow: 0 }}>
                        <button className='eHeadBtn' onClick={hook.toggleRight}>
                            Hey, {auth.userName} &nbsp; <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div className={style.topImg} style={{ backgroundImage: `url('${User}')`, }}></div>
                    </div>
                </div>
                <div className={hook.rightTab ? `${style.dropDown}` : "d-none"} >
                    <ul>
                        <li>
                            <Link to={'/'} className='nav-link'>
                                Dashoard
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='nav-link'>
                                Commercial
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='nav-link'>
                                Notifications
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='nav-link'>
                                Messages
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='nav-link'>
                                Settings
                            </Link>
                        </li>
                        <li onClick={auth.logOut} className={style.footerHrefs}>
                            Logout
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav
