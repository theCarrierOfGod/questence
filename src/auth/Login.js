import React from 'react'
import { useAuth } from '../providers/Auth';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png'
import { NotificationContainer } from 'react-notifications';


const Login = () => {
    const auth = useAuth()
    return (
        <>
            <NotificationContainer/>
            <nav className={`${style.isNavbar} navbar navbar-expand-sm`}>
                <div className='container d-flex justify-content-between'>
                    <Link className={`${style.navTitle} navbar-brand mr-3`} to="/">
                        <img src={Logo} alt="Questence" width="120" />
                    </Link>
                </div>
            </nav>
            <div style={{ textAlign: 'center' }}>
                <br /><br /><br />
                <button className="btn btn-success" onClick={auth.logUserIn}>
                    Login
                </button>
            </div>
        </>
    )
}

export default Login
