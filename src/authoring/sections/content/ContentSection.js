import React from 'react'
import SectionsLanding from '../SectionsLanding'
import ContentNav from './subcontents/ContentNav'
import RightNav from './subcontents/RightNav'

const ContentSection = () => {
    return (
        <>
            <SectionsLanding />

            <div className='mt-4 mb-5' style={{ minHeight: '40vh' }} >
                <div className='container'>
                    <div className='row'>
                        {/* Left side of the content page  */}
                        <div className='col-md-4'>
                            <ContentNav />
                        </div>
                        <div className='col-md-8'>
                            <RightNav />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentSection