import React from 'react'
import { useEdit } from '../../../providers/Edit'
import { useBasic } from '../../../providers/Basic';

const RightNav = () => {
    const edit = useEdit();
    const basic = useBasic();
    return (
        <>
            <div className='d-flex justify-content-between' style={{ marginBottom: 0 }}>
                <p className='m-0 mt-2'>
                    Release Date : {basic.releaseDate}
                </p>
                <p className='m-0 mt-2'>
                    <b>
                        Status: {edit.courseStatus}
                    </b>
                </p>
            </div>
            <hr />
            {/* <SectionForm data={data} title={title} /> */}
        </>
    )
}

export default RightNav