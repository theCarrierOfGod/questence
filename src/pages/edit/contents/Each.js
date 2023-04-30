import React, { useEffect } from 'react'
import { useDetail } from '../../../providers/Detail'
import { useLocation } from 'react-router-dom';

const Each = (props) => {
    const detail = useDetail();
    const location = useLocation();

    const editComponent = (id) => {
        alert(id)
    }

    useEffect(() => {
        console.log(props.data)
    }, [location.key])
    return (
        <>
            <div>
                <div className={detail.editContent ? 'd-flex justify-content-end' : 'd-none'}>
                    <button className={(detail.activeCom === props.data.id) ? 'btn bgPreview' : 'd-none'}>
                        Save
                    </button>
                    <button className={(detail.activeCom !== props.data.id) ? 'btn btn-primary' : 'd-none'} onClick={() => editComponent(props.data.id)} style={{ marginLeft: '10px' }}>
                        Edit
                    </button>
                    <button className='btn btn-danger' style={{ marginLeft: '10px' }}>
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default Each