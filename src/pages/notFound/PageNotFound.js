import React from 'react'
import { useAuth } from '../../providers/Auth';
import { useHook } from '../../providers/Hook';
import style from '../../components/nav/nav.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png'
import User from '../../images/left-image.png'

const PageNotFound = () => {
    return (
        <>
            <nav className={`${style.isNavbar} navbar navbar-expand-sm`}>
                <div className='container d-flex justify-content-between'>
                    <Link className={`${style.navTitle} navbar-brand mr-3`} to="/">
                        <img src={Logo} alt="Questence" width="120" />
                    </Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation"></button>

                </div>
            </nav>
            <div style={{ textAlign: 'center' }}>
                <br /><br /><br />
                <h2>
                    ERROR 404!
                </h2>

                <br></br>

                <h4>
                    Page Not Found
                </h4>
            </div>
        </>
    )
}

export default PageNotFound
