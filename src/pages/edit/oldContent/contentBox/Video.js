import React from 'react'
import { useState } from 'react';
import { useEdit } from '../../../providers/Edit';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Video = (props) => {
    const edit = useEdit();
    const [newSection, setNewSection] = useState(false)
    const [videoContent, setVideoContent] = useState(false);
    const seeVideoContent = () => {
        if (videoContent) {
            setVideoContent(false);
        } else {
            setVideoContent(true);
        }
    }
    return (
        <div>
            <div className="d-flex" style={{ justifyContent: 'right' }}>
                <div>
                    <button type="button" title="Edit Component" className={(edit.editing === props.data.id) ? 'd-none' : 'btn bgReturn ml-10 text-info'} style={{ border: '2px solid #00798C' }} onClick={e => edit.toggleContentEdit(props.data.id)}>
                        <span className='fa fa-pencil m-0 p-1'></span>
                        Edit
                    </button>
                    <button type="button" title="Save Component" className={(edit.editing === props.data.id) ? 'btn bgPreview ml-10 text-light' : 'd-none '} style={{ border: '2px solid #00798C' }} onClick={e => edit.toggleContentEdit('')} >
                        <span className='fa fa-check-circle m-0 p-1'></span>
                        Save
                    </button>
                    <button type="button" className={newSection ? 'd-none' : 'btn btn-danger ml-10'}>
                        Delete
                    </button>
                </div>
                <div className={newSection ? 'd-flex' : 'd-none'}>
                    <button type="button" className='btn btn-danger ml-10'>
                        Cancel
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-3'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="videoPositionId">
                            Position ID
                        </label>
                        <input disabled={edit.editing !== props.data.id} type="text" name="videoPositionId" required id="videoPositionId" className="form-control" placeholder="" value={props.data.position_id} aria-describedby="helpId" />
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="videoType">
                            Type
                        </label>
                        <select disabled={edit.editing !== props.data.id} name="videoType" id="videoType" className='form-control'>
                            <option value="video">Video</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-6 d-flex'>
                    <div className="form-group mb-3 w-100">
                        <label className="label" htmlFor="videoTitle">
                            Title
                        </label>
                        <div className='d-flex align-center'>
                            <input disabled={edit.editing !== props.data.id} type="text" name="videoTitle" required id="videoTitle" className="form-control" placeholder="Input Title" value={props.data.title} aria-describedby="helpId" />
                            <span className={videoContent ? 'fa fa-angle-up is-hoverable' : 'fa fa-angle-down is-hoverable'} style={{ lineHeight: '18px', padding: '10px' }} onClick={seeVideoContent}></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={videoContent ? 'd-block' : 'd-none'} >
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="videoType">
                                Video Type
                            </label>
                            <select disabled={edit.editing !== props.data.id} className='form-control' id="videoType" name="videoType">
                                <option value={props.data.video_type}>{props.data.video_type}</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className="form-group mb-3 w-100">
                            <label className="label" htmlFor="videoHeader">
                                Video Header
                            </label>
                            {/* <CKEditor
                                editor={ClassicEditor}
                                className="form-control"
                                name="videoHeader"
                                id="videoHeader"
                                rows="5"
                                required={true}
                                disabled={edit.editing !== props.data.id}
                                data={props.data.video_header}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ data });
                                }}
                            /> */}
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className="form-group mb-3 w-100">
                            <label className="label" htmlFor="videoFooter">
                                Video Footer
                            </label>
                            {/* <CKEditor
                                editor={ClassicEditor}
                                className="form-control"
                                name="videoFooter"
                                id="videoFooter"
                                rows="5"
                                required={true}
                                disabled={edit.editing !== props.data.id}
                                data={props.data.video_footer}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ data });
                                }}
                            /> */}
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="recordedlUrl">
                                Recorded URL
                            </label>
                            <select disabled={edit.editing !== props.data.id} className='form-control mb-3' name="recordedlUrl" id="recordedlUrl">
                                <option> Select file to upload </option>
                            </select>
                            <input disabled={edit.editing !== props.data.id} className='form-control' name="recordedlUrl" id="recordedlUrl" value={props.data.recorded_url} placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="mobileUrl">
                                Mobile URL
                            </label>
                            <select disabled={edit.editing !== props.data.id} className='form-control mb-3' name="mobileUrl" id="mobileUrl">
                                <option> Select file to upload </option>
                            </select>
                            <input disabled={edit.editing !== props.data.id} className='form-control' name="mobileUrl" id="mobileUrl" value={props.data.mobile_url} placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="livelUrl">
                                Live URL
                            </label>
                            <select disabled={edit.editing !== props.data.id} className='form-control mb-3' name="livelUrl" id="livelUrl">
                                <option> Select file to upload </option>
                            </select>
                            <input disabled={edit.editing !== props.data.id} className='form-control' name="livelUrl" id="livelUrl" value={props.data.live_url} placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-group mb-3">
                                    <div className='row'>
                                        <label className="label mb-3 col-md-12" htmlFor="startDate">
                                            Start Date & Time
                                        </label>
                                        <div className='col-sm-6'>
                                            <input disabled={edit.editing !== props.data.id} type='date' className='form-control mb-3 ' name="startDate" id="startDate" />
                                        </div>
                                        <div className='col-sm-6'>
                                            <input disabled={edit.editing !== props.data.id} type="time" className='form-control mb-3 col-sm-6' name="startTime" id="startTime" value={props.data.start_date_time} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-group mb-3">
                                    <div className='row'>
                                        <label className="label mb-3 col-md-12" htmlFor="endDate">
                                            End Date & Time
                                        </label>
                                        <div className='col-sm-6'>
                                            <input disabled={edit.editing !== props.data.id} type='date' className='form-control mb-3' name="endDate" id="endDate" value={props.data.due_date_time} />
                                        </div>
                                        <div className='col-sm-6'>
                                            <input disabled={edit.editing !== props.data.id} type="time" className='form-control mb-3' name="endTime" id="endTime" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Video
