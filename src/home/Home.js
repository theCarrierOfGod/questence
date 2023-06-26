import React from 'react'
import HomeNav from '../navigations/HomeNav'
import Footer from '../footer/Footer'

const Home = () => {
    return (
        <>
            <HomeNav />
            <div style={{ width: '100%', height: '95vh', background: 'rgba(0, 135, 61, 0.51)' }}></div>
            <Footer />
        </>
    )
}

export default Home