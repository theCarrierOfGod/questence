import React from 'react';
import style from './footer.module.css';
import Logo from '../images/thelogo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/Auth';

const Footer = () => {
    const auth = useAuth();
    return (
        <div className={`${style.footerSection}`}>
            <div className="row">
                <div className='col-lg-12'>
                    <div className={`${style.footerTitle} `}>
                        <img src={Logo} alt="Questence" style={{ width: '200px' }} />
                    </div>
                </div>
                <div className='col-lg-12'>
                    <br />
                    <div className='row'>
                        <div className="col-sm-4">
                            <p>
                                Build skills with courses, certificates, and
                                programmes online from world-class
                                trainers and institutions.
                            </p>
                            <div className={style.socialIcons}>
                                <Link to="" className={style.eachIcon}>
                                    <i className="fa-brands fa-facebook-f"></i>
                                </Link>
                                <Link to="" className={style.eachIcon}>
                                    <i className="fa-brands fa-twitter"></i>
                                </Link>
                                <Link to="" className={style.eachIcon}>
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </Link>
                            </div>
                        </div>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-2'>
                            <h5 className={style.footerLinkHeader}>
                                Pages
                            </h5>
                            <ul className={style.footerLinks}>
                                <li>
                                    <Link to="" className={style.footerHrefs}>
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" className={style.footerHrefs}>
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" className={style.footerHrefs}>
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-sm-2'>
                            <h5 className={style.footerLinkHeader}>
                                Connect
                            </h5>
                            <ul className={style.footerLinks}>
                                <li>
                                    <Link to="" className={style.footerHrefs}>
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-sm-2'>
                            <h5 className={style.footerLinkHeader}>
                                Legal
                            </h5>
                            <ul className={style.footerLinks}>
                                <li>
                                    <Link to="" className={style.footerHrefs}>
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" className={style.footerHrefs}>
                                        Horror Code
                                    </Link>
                                </li>
                                <li>
                                    <Link to="" className={style.footerHrefs}>
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-sm-12'>
                            <div className={style.copyRight}>
                                © 2021 Questence. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
