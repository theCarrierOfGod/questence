import React from 'react'
import SectionsLanding from '../SectionsLanding'

const SubmitSection = () => {
    return (
        <>
            <SectionsLanding />

            <div className='mb-5 mt-5' style={{ minHeight: '40vh' }}>
                <div className='d-flex justify-content-center align-center' style={{ minHeight: '60px' }}>
                    <button className="btn btn-success" style={{ width: '50%' }}>
                        SUBMIT
                    </button>
                </div>
            </div>
        </>
    )
}

export default SubmitSection