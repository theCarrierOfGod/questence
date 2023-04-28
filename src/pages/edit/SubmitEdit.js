import React from 'react'
import Footer from '../../components/footer/Footer'
import Nav from '../../components/nav/Nav'
import StatusTab from './StatusTab'
import TabMenu from './TabMenu'

const SubmitEdit = () => {
    return (
        <>
            {/* navigation bar */}
            <Nav />
            <br />
            {/* status, edit, back to dashboard and course preview tab */}
            <StatusTab />
            <br />
            {/* various course parts tab  */}
            <TabMenu />
            <br />
            <div className='container'>
                <div className='d-flex justify-content-center align-center' style={{ minHeight: '60px'}}>
                    <button className="btn btn-success" style={{ width: '50%' }}>
                        SUBMIT
                    </button>
                </div>
            </div>
            <br />
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default SubmitEdit
