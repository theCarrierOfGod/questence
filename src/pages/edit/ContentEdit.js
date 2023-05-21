import React, { useEffect } from 'react'
import Nav from '../../components/nav/Nav'
import StatusTab from './StatusTab'
import TabMenu from './TabMenu'
import Frame from './contents/Frame'
import Footer from '../../components/footer/Footer'
import './content.css'
import { useLocation, useParams } from 'react-router-dom'
import { useDetail } from '../../providers/Detail'

const ContentEdit = () => {
    const detail = useDetail();
    let { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        detail.getDetails(id);
    }, [id, location.key]);

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