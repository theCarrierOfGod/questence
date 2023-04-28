import React from 'react'
import Nav from '../../components/nav/Nav'
import StatusTab from './StatusTab'
import TabMenu from './TabMenu'
import Frame from './contents/Frame'
import Footer from '../../components/footer/Footer'
import './content.css'

const ContentEdit = () => {
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
            <Frame />
            <br />
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default ContentEdit