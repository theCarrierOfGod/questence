import React, { useEffect, useState } from 'react'
import { useDetail } from '../../../providers/Detail'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HTML from './HTML';
import Video from './Video';
import Exercise from './Exercise';
import { useLocation } from 'react-router-dom';

const Component = (props) => {
    const detail = useDetail();
    const location = useLocation();
    const [seeMore, setSeeMore] = useState('');
    const [type, setType] = useState('');

    const editComponent = (id) => {
        detail.toggleComponentEdit(id)
    }

    const toggleSeeMore = (id) => {
        if (seeMore === id) {
            setSeeMore('')
        } else {
            setSeeMore(id)
        }
    }

    useEffect(() => {

    }, [location])
    return (
        <>
            {props.data.map((comp) => (
                <div key={comp.id}>
                    <div>
                        <div className={detail.editContent ? 'd-flex justify-content-end' : 'd-none'}>
                            <button className={(detail.activeComp === comp.id) ? 'btn bgPreview' : 'd-none'} onClick={() => editComponent(comp.id)}>
                                Save
                            </button>
                            <button className={(detail.activeComp !== comp.id) ? 'btn btn-primary' : 'd-none'} onClick={() => editComponent(comp.id)} style={{ marginLeft: '10px' }}>
                                Edit
                            </button>
                            <button className='btn btn-danger' style={{ marginLeft: '10px' }}>
                                Delete
                            </button>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <div className="form-group mb-3">
                                    <label className="label" htmlFor="courseName">
                                        Position ID
                                    </label>
                                    <input
                                        type="text"
                                        name="positionID"
                                        disabled={detail.compReadOnly}
                                        required id="courseName"
                                        className="form-control"
                                        placeholder=""
                                        value={comp.position_id}
                                        aria-describedby="helpId" />
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className="form-group mb-3">
                                    <label className="label" htmlFor="courseName">
                                        Type
                                    </label>
                                    <select
                                        className='form-control'
                                        disabled={detail.compReadOnly}
                                    // onChange={e => setType(e.target.value)}
                                    >
                                        <option value={comp.type}>
                                            {(comp.type === 'VI') ? 'Video' : null}
                                            {(comp.type === 'AU') ? 'Audio' : null}
                                            {(comp.type === 'IM') ? 'Image' : null}
                                            {(comp.type === 'HT') ? 'HTML' : null}
                                            {(comp.type === 'EX') ? 'Exercise' : null}
                                            {(comp.type === 'PR') ? 'Private' : null}
                                        </option>
                                        <option value={'VI'}>
                                            Video
                                        </option>
                                        <option value={'AU'}>
                                            Audio
                                        </option>
                                        <option value={'IM'}>
                                            Image
                                        </option>
                                        <option value={'HT'}>
                                            HTML
                                        </option>
                                        <option value={'EX'}>
                                            Exercise
                                        </option>
                                        <option value={'PR'}>
                                            Private
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-6 d-flex'>
                                <div className="form-group mb-3 w-100">
                                    <label className="label" htmlFor="courseName">
                                        Title
                                    </label>
                                    <div className='d-flex align-center'>
                                        <input
                                            type="text"
                                            name="courseName"
                                            disabled={detail.compReadOnly}
                                            required id="courseName"
                                            className="form-control"
                                            placeholder="Input Title"
                                            value={comp.title}
                                            aria-describedby="helpId" />
                                        <span className={(seeMore === comp.id) ? 'fa fa-angle-up is-hoverable' : 'fa fa-angle-down is-hoverable'} style={{ lineHeight: '18px', padding: '10px' }} onClick={() => toggleSeeMore(comp.id)}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className={(seeMore === comp.id) ? 'd-block' : 'd-none'}>
                            {(comp.type === 'HT') ? <HTML /> : null}
                            {(comp.type === 'AU') ? 'Audio' : null}
                            {(comp.type === 'VI') ? <Video /> : null}
                            {(comp.type === 'IM') ? 'Image' : null}
                            {(comp.type === 'EX') ? <Exercise /> : null}
                            {(comp.type === 'PR') ? 'Private' : null}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Component