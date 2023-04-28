
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useBasic } from '../../../providers/Basic';
import { useEdit } from '../../../providers/Edit'

const DnS = () => {
    const edit = useEdit();
    const basic = useBasic();
    let { id } = useParams();

    useEffect(() => {
        basic.getCourse(id)
    }, [])
    return (
        <div>
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
        </div>
    )
}

export default DnS
