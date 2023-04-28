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
            <nav className={`${style.isNavbar} navbar navbar-expand-sm`}>
                <div className='container d-flex justify-content-between'>
                    <Link className={`${style.navTitle} navbar-brand mr-3`} to="/">
                        <img src={Logo} alt="Questence" width="120" />
                    </Link>
                    <button className="navbar-toggler d-lg-none" type="button" onClick={e => alert('No mobile menu')}>
                        <i className='fa fa-bars'></i>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="collapsibleNavId" style={{ flexGrow: 0 }}>
                        <button className='eHeadBtn' onClick={hook.toggleRight}>
                            Hey, {auth.userName} &nbsp; <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </button>
                        <div className={style.topImg} style={{ backgroundImage: `url('${User}')`, }}></div>
                    </div>
                </div>
                <div className={hook.rightTab ? `${style.dropDown}` : "d-none"} >
                    <ul>
                        <li>
                            Authoring
                        </li>
                        <li>
                            Commercial
                        </li>
                        <li>
                            Help & Support
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav
