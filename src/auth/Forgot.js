import React, { useState } from 'react'
import { useAuth } from '../providers/Auth';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png'
import { NotificationContainer } from 'react-notifications';
import Nav from '../components/nav/Nav';
import './login.module.css'
import Footer from '../components/footer/Footer';



const Forgot = () => {
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <NotificationContainer />
            <table style={{ width: '100%', height: '100vh', background: 'rgba(0, 135, 61, 0.51)' }}>
                <tbody>
                    <tr>
                        <td>
                            <Nav />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <div className='row justify-content-center align-items-center m-1' style={{ minHeight: 'calc(100vh - 56px)' }}>
                                    <div className='col-md-5'>
                                        <div className="card">
                                            <div className='card-body'>
                                                <div className='m-2' style={{ textAlign: 'center' }}>
                                                    <img src={Logo} alt="Questence" width="150" />
                                                    <br />
                                                    <h3 className='m-3 mb-0'>
                                                        FORGOT PASSWORD
                                                    </h3>
                                                    <p>
                                                        Enter your email to reset your password
                                                    </p>
                                                </div>
                                                <div className={`${style.modalBody} modal-body  p-5`}>
                                                    <div className="form-group mb-3 m-2">
                                                        <label className="label w-100" htmlFor="email" style={{ textAlign: 'center' }}>
                                                            Email
                                                        </label>
                                                        <input type="text" name="email" id="email" required
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="form-control" value={email} placeholder="Email Address" aria-describedby="helpId" />
                                                    </div>

                                                    <div className="form-group m-2">
                                                        <button type="submit" className="btn bgPreview w-100" data-dismiss="modal">
                                                            Send Password Reset Request
                                                        </button>
                                                        <p className='label w-100 nav-link mt-4' style={{ fontSize: '12px', justifyContent: 'center', display: 'inline-flex' }}>
                                                            Remember your password? <Link className="nav-link" to={'/login'} style={{ textAlign: 'center' }}>
                                                                &nbsp; Login
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Footer />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Forgot
