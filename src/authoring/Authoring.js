import React, { useEffect } from 'react';
import style from './authoring.module.css'
import { useNew } from '../providers/New';
import Courses from './members/Courses';
import Report from './members/Report';
import Footer from '../footer/Footer';
import AuthoringHome from '../navigations/AuthoringHome';
import { useLocation } from 'react-router-dom';

const Authoring = () => {
    const newHook = useNew();
    const location = useLocation();
    useEffect(() => {
        window.localStorage.removeItem('id')
    }, [location])
    return (
        <>
            <AuthoringHome />
            <div className={`${style.menu} container d-flex justify-content-between`}>
                <h4 className={style.menuTitle}>
                    My Courses
                </h4>
                <button className='eHeadBtn' onClick={newHook.addNew}>
                    Add New Course
                </button>
            </div>
            
            <Courses />

            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default Authoring