/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 01/03/2023 - 20:53:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/03/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/

import React from 'react'
import Nav from '../../components/nav/Nav';
import style from "./index.module.css";
import Footer from '../../components/footer/Footer';
import Progress from './components/progress/Progress';
import { Dashboard } from './components/dashboard/Dashboard';
import { useNew } from '../../providers/New';

const Index = () => {

    const newHook = useNew();
    return (
        <>
            <Nav />

            <div className={`${style.menu} container d-flex justify-content-between`}>
                <h4 className={style.menuTitle}>
                    My Courses
                </h4>
                <button className='eHeadBtn' onClick={newHook.addNew}>
                    Add New Course
                </button>
            </div>

            <Dashboard />
            <Progress />


            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default Index
