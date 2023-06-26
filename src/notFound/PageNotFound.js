import React from 'react'
import HomeNav from '../navigations/HomeNav'

const PageNotFound = () => {
    return (
        <>
            <HomeNav />
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
