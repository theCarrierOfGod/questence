import React from 'react'
import ContentNav from './ContentNav'
import RightNav from './RightNav'

const Frame = () => {
    return (
        <>
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
        </>
    )
}

export default Frame