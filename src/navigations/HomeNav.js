import React from 'react';
import style from './nav.module.css';
import QuestenceLogo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import { useHook } from '../providers/Hook';
import User from '../images/19900b1ea5f3a63cfbd59c6c09038027.png'

const HomeNav = () => {
    const auth = useAuth();
    const hook = useHook();
    const navigate = useNavigate();
    return (
        <>
            <nav className={`${style.isNavbar} navbar navbar-expand-sm bg-white`} style={{ background: 'white !important' }}>
                <div className='container d-flex justify-content-between'>
                    <div className='d-flex align-items-center' >
                        <Link className={`${style.navTitle} navbar-brand mr-3`} to="/">
                            <img src={QuestenceLogo} alt="Questence" width="190" />
                        </Link>
                        <div className='collapse navbar-collapse'>
                            <button disabled={!auth.isLoggedIn} className='btn menu-link' style={{ fontWeight: 'bolder' }} onClick={e => { navigate("/authoring") }}>
                                Authoring
                            </button>
                            <button disabled={!auth.isLoggedIn} className='btn menu-link' style={{ fontWeight: 'bolder' }}>
                                Administering
                            </button>
                        </div>
                    </div>
                    <button className="navbar-toggler d-lg-none" type="button" onClick={e => alert('No mobile menu')}>
                        <i className='fa fa-bars'></i>
                    </button>
                    <div className={auth.isLoggedIn ? "collapse navbar-collapse justify-content-between p-2" : "d-none"} id={style.collapsibleNavId} style={{ flexGrow: 0, position: 'relative' }}>
                        <button className='eHeadBtn' onClick={hook.toggleRight}>
                            Hey, {auth.userName} &nbsp; <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div className={style.topImg} style={{ backgroundImage: `url('${User}')`, }}></div>
                        <div className={`${style.dropDown} ${style.dashDrop}`} >
                            <ul>
                                <li>
                                    <Link to={'/'} className='nav-link'>
                                        Dashboard
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
                    </div>
                    <div className={!auth.isLoggedIn ? "collapse navbar-collapse justify-content-between is-link" : "d-none"} id="collapsibleNavId" style={{ flexGrow: 0 }}>
                        <Link to={'/login'} className='eHeadBtn menu-link'>
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default HomeNav