import React, { useState } from 'react'
import { useHook } from '../../../../providers/Hook';
import style from '../../../index/components/progress/progress.module.css';

const SubComp = () => {
    const hook = useHook();
    const [newSection, setNewSection] = useState(false);
    const [deletes, setDelete] = useState(false);
    const [htmlContent, setHtmlContent] = useState(false);
    const [videoContent, setVideoContent] = useState(false);

    const toggleNewSection = () => {
        if (newSection) {
            setNewSection(false);
        } else {
            setNewSection(true);
        }
    }

    const toggleDelete = () => {
        if (deletes) {
            setDelete(false);
        } else {
            setDelete(true);
        }
    }

    const seeHtmlContent = () => {
        if (htmlContent) {
            setHtmlContent(false);
        } else {
            setHtmlContent(true);
        }
    }

    const seeVideoContent = () => {
        if (videoContent) {
            setVideoContent(false);
        } else {
            setVideoContent(true);
        }
    }

    const submitForm = () => {
        alert('clicked!');
    }
    return (
        <>
            <form>
                <div className='row'>
                    <div className="form-group mb-3">
                        <div className='d-flex justify-content-between alignCenter mb-2'>
                            <label className="label mb-0 p-0" htmlFor="courseCode">
                                Components
                            </label>
                            <div>
                                <button type="button" className={newSection ? 'd-none' : 'btn bgPreview'} style={{ marginLeft: '10px' }} onClick={toggleNewSection}>
                                    New
                                </button>
                                <button type="button" className={newSection ? 'd-none' : 'btn bgReturn'} style={{ marginLeft: '10px', border: '2px solid #00798C' }}>
                                    Edit
                                </button>
                                <button type="button" className={newSection ? 'd-none' : 'btn btn-danger'} style={{ marginLeft: '10px' }} onClick={toggleDelete}>
                                    Delete
                                </button>
                            </div>
                            <div className={newSection ? 'd-flex' : 'd-none'}>
                                <button type="button" className='btn bgPreview' onClick={submitForm}>
                                    Save
                                </button>
                                <button type="button" className='btn btn-danger' style={{ marginLeft: '10px' }} onClick={toggleNewSection}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <hr />
                        {newSection ? (
                            <>
                                <form className='m-3'>
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <input type="text" name="positionID" required id="courseName" className="form-control" placeholder="" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <select className='form-control'>
                                                    <option value="html">HTML</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 d-flex'>
                                            <div className="form-group mb-3 w-100">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <div className='d-flex align-center'>
                                                    <input type="text" name="courseName" required id="courseName" className="form-control" placeholder="Input Title" aria-describedby="helpId" />
                                                    <span className={htmlContent ? 'fa fa-angle-up is-hoverable' : 'fa fa-angle-down is-hoverable'} style={{ lineHeight: '18px', padding: '10px' }} onClick={seeHtmlContent}></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={htmlContent ? 'd-block' : 'd-none'} >
                                        <div className='row'>
                                            <div className='col-lg-12'>
                                                <div className="form-group mb-3">
                                                    <label className="label" htmlFor="htmlType">
                                                        HTML Type
                                                    </label>
                                                    <select className='form-control' id="htmlType" name="htmlType">
                                                        <option>Select Type</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-lg-12'>
                                                <div className="form-group mb-3 w-100">
                                                    <label className="label" htmlFor="htmlContent">
                                                        HTML content
                                                    </label>
                                                    <textarea type="text" name="htmlContent" required id="htmlContent" className="form-control" ></textarea>
                                                </div>
                                            </div>
                                            <div className='col-lg-12'>
                                                <div className="form-group mb-3">
                                                    <label className="label" htmlFor="htmlUrl">
                                                        HTML URL
                                                    </label>
                                                    <select className='form-control mb-3' name="htmlUrl" id="htmlUrl">
                                                        <option> Select file to upload </option>
                                                    </select>
                                                    <input className='form-control' name="" placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="videoPositionId">
                                                    Position ID
                                                </label>
                                                <input type="text" name="videoPositionId" required id="videoPositionId" className="form-control" placeholder="" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="videoType">
                                                    Type
                                                </label>
                                                <select name="videoType" id="videoType" className='form-control'>
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
                                                    <input type="text" name="videoTitle" required id="videoTitle" className="form-control" placeholder="Input Title" aria-describedby="helpId" />
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
                                                    <select className='form-control' id="videoType" name="videoType">
                                                        <option>Select video type</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-lg-12'>
                                                <div className="form-group mb-3 w-100">
                                                    <label className="label" htmlFor="videoHeader">
                                                        Video Header
                                                    </label>
                                                    <textarea type="text" name="videoHeader" required id="videoHeader" className="form-control" ></textarea>
                                                </div>
                                            </div>
                                            <div className='col-lg-12'>
                                                <div className="form-group mb-3 w-100">
                                                    <label className="label" htmlFor="videoFooter">
                                                        Video Footer
                                                    </label>
                                                    <textarea type="text" name="videoFooter" required id="videoFooter" className="form-control" ></textarea>
                                                </div>
                                            </div>
                                            <div className='col-lg-12'>
                                                <div className="form-group mb-3">
                                                    <label className="label" htmlFor="recordedlUrl">
                                                        Recorded URL
                                                    </label>
                                                    <select className='form-control mb-3' name="recordedlUrl" id="recordedlUrl">
                                                        <option> Select file to upload </option>
                                                    </select>
                                                    <input className='form-control' name="recordedlUrl" id="recordedlUrl" placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                                </div>
                                            </div>
                                            <div className='col-lg-12'>
                                                <div className="form-group mb-3">
                                                    <label className="label" htmlFor="mobileUrl">
                                                        Mobile URL
                                                    </label>
                                                    <select className='form-control mb-3' name="mobileUrl" id="mobileUrl">
                                                        <option> Select file to upload </option>
                                                    </select>
                                                    <input className='form-control' name="mobileUrl" id="mobileUrl" placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                                </div>
                                            </div>
                                            <div className='col-lg-12'>
                                                <div className="form-group mb-3">
                                                    <label className="label" htmlFor="livelUrl">
                                                        Live URL
                                                    </label>
                                                    <select className='form-control mb-3' name="livelUrl" id="livelUrl">
                                                        <option> Select file to upload </option>
                                                    </select>
                                                    <input className='form-control' name="livelUrl" id="livelUrl" placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
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
                                                                    <input type='date' className='form-control mb-3 ' name="startDate" id="startDate" />
                                                                </div>
                                                                <div className='col-sm-6'>
                                                                    <input type="time" className='form-control mb-3 col-sm-6' name="startTime" id="startTime" />
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
                                                                    <input type='date' className='form-control mb-3' name="endDate" id="endDate" />
                                                                </div>
                                                                <div className='col-sm-6'>
                                                                    <input type="time" className='form-control mb-3' name="endTime" id="endTime" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <hr />
                            </>
                        ) : (
                            <>
                                <div>
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <input type="text" name="positionID" required id="courseName" className="form-control" placeholder="" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <select className='form-control'>
                                                    <option>HTML</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <input type="text" name="courseName" required id="courseName" className="form-control" placeholder="Input Title" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <input type="text" name="positionID" required id="courseName" className="form-control" placeholder="" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <select className='form-control'>
                                                    <option>HTML</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <input type="text" name="courseName" required id="courseName" className="form-control" placeholder="Input Title" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <input type="text" name="positionID" required id="courseName" className="form-control" placeholder="" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <select className='form-control'>
                                                    <option>HTML</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <input type="text" name="courseName" required id="courseName" className="form-control" placeholder="Input Title" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <input type="text" name="positionID" required id="courseName" className="form-control" placeholder="" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <select className='form-control'>
                                                    <option>HTML</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <input type="text" name="courseName" required id="courseName" className="form-control" placeholder="Input Title" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <input type="text" name="positionID" required id="courseName" className="form-control" placeholder="" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <select className='form-control'>
                                                    <option>HTML</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <input type="text" name="courseName" required id="courseName" className="form-control" placeholder="Input Title" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <input type="text" name="positionID" required id="courseName" className="form-control" placeholder="" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Position ID
                                                </label>
                                                <select className='form-control'>
                                                    <option>HTML</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <input type="text" name="courseName" required id="courseName" className="form-control" placeholder="Input Title" aria-describedby="helpId" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </form>
            <div className={deletes ? `${style.modal} modal d-block` : `modal d-none`} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <form className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content p-3">
                        <div className={`${style.modalHeader} modal-header`}>
                            <h5 className={`${style.modalTitle} modal-title`} id="exampleModalLongTitle"> </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleDelete}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`${style.modalBody2} modal-body`}>
                            <div className="form-group mb-3">
                                <div className='d-flex justify-content-between alignCenter mb-2'>
                                    <div className="text-center mb-0 p-0 w-100" style={{ color: '#FF4040', fontWeight: 700 }}>
                                        Confirm Delete
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='col-lg-12'>
                                        <div className="form-group mb-3 text-center" style={{ fontSize: '21px' }}>
                                            Are you sure you want to delete progress made on problem questions?
                                        </div>
                                    </div>
                                    <div className='col-lg-12 d-flex justify-content-center'>
                                        <button type="button" className="btn" data-dismiss="modal" style={{ marginRight: '10px', background: '#FF4040', color: 'white' }} onClick={toggleDelete}>
                                            Delete
                                        </button>
                                        <button type="button" className="btn" data-dismiss="modal" style={{ border: '2px solid #000000' }} onClick={toggleDelete}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SubComp
