import React, { useEffect, useState } from 'react';
import './content.css';
import style from '../../../members/courses.module.css';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import LeftList from './LeftList';
import RightContent from './RightContent';
import { useNew } from '../../../../providers/New';
import { useHook } from '../../../../providers/Hook';
import { useAuth } from '../../../../providers/Auth';
import { useEdit } from '../../../../providers/Edit';
import { useDetail } from '../../../../providers/Detail';
import { useBasic } from '../../../../providers/Basic';
import swal from 'sweetalert';

const ContentNav = () => {
    let { id } = useParams();
    const newHook = useNew();
    const hook = useHook();
    const auth = useAuth();
    const edit = useEdit();
    const detail = useDetail();
    const basic = useBasic();
    const location = useLocation();
    const [sectionTitle, setSectionTitle] = useState('');
    const [section_id, setSectionID] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [newOutline, setNewOutline] = useState(false)
    const [subID, setSubID] = useState('')
    const [subTitle, setSubTitle] = useState('');
    const [lesTitle, setLesTitle] = useState('');
    const [subPID, setSubPID] = useState('')
    const [lesPID, setLesPID] = useState('');
    const [subArray, setSubArray] = useState([]);

    useEffect(() => {
        setSectionTitle('')
        setSectionID('')
        setSubID('')
        setSubTitle('')
        setLesTitle('')
        setSubPID('')
        setLesPID('')
        setSubArray([]);
        setTimeout(() => {
            edit.gradingNewCheck()
            edit.gradingEditCheck()
        }, 500);
    }, [id]);

    useEffect(() => {
        setTimeout(() => {
            edit.gradingNewCheck()
            edit.gradingEditCheck()
        }, 500);
    }, [location.key]);

    const newSection = () => {
        if (newOutline)
            setNewOutline(false)
        else
            setNewOutline(true)
    }

    const deleteLesson = () => {
        if (window.confirm("Are you sure you want to delete this lesson?") === true) {
            swal({
                title: "Delete Lesson",
                text: "Please wait while lesson deletes",
                icon: "info",
                buttons: false,
                timer: 5000,
            })
            const params = {
                id: detail.activeLesson
            };
            const options = {
                method: 'DELETE',
                body: JSON.stringify(params),
                headers: {
                    'Authorization': auth.token
                },
            };

            fetch(`${hook.api}/i/course-lesson/`, options)
                .then(response => response.json())
                .then(response => {
                    // Do something with response.
                    if (response.message) {
                        swal({
                            title: "Delete Lesson",
                            text: response.message,
                            icon: "success",
                            buttons: false,
                            timer: 5000,
                        })
                        detail.getDetails(id);
                    } else {
                        swal({
                            title: "Delete Lesson",
                            text: "Error while deleting lesson",
                            icon: "error",
                            buttons: false,
                            timer: 5000,
                        })
                    }
                })
                .catch(err => {
                    swal({
                        title: "Delete Lesson",
                        text: "Error while deleting lesson",
                        icon: "error",
                        buttons: false,
                        timer: 5000,
                    })
                })
        }
    }

    const deleteSubSection = () => {
        if (window.confirm("Are you sure you want to delete this subsection?") === true) {
            swal({
                title: "Delete Sub section",
                text: "Please wait while sub section deletes",
                icon: "info",
                buttons: false,
                timer: 5000,
            })
            const params = {
                id: detail.activeSub
            };
            const options = {
                method: 'DELETE',
                body: JSON.stringify(params),
                headers: {
                    'Authorization': auth.token
                },
            };

            fetch(`${hook.api}/i/course-subsection/`, options)
                .then(response => response.json())
                .then(response => {
                    // Do something with response.
                    if (response.message) {
                        swal({
                            title: "Delete Sub section",
                            text: "Deleted",
                            icon: "success",
                            buttons: false,
                            timer: 2500,
                        })
                        detail.getDetails(id);
                    } else {
                        swal({
                            title: "Delete Sub section",
                            text: "Error while deleting subsection",
                            icon: "error",
                            buttons: false,
                            timer: 5000,
                        })
                    }
                })
                .catch(err => {
                    swal({
                        title: "Delete Sub section",
                        text: "Error while deleting subsection",
                        icon: "error",
                        buttons: false,
                        timer: 5000,
                    })
                })
        }
    }

    const deleteSection = () => {
        if (window.confirm("Are you sure you want to delete this section?") === true) {
            swal({
                title: "Delete Section",
                text: "Please wait while section deletes",
                icon: "info",
                buttons: false,
                timer: 5000,
            })
            const params = {
                id: detail.viewing
            };
            const options = {
                method: 'DELETE',
                body: JSON.stringify(params),
                headers: {
                    'Authorization': auth.token
                },
            };

            fetch(`${hook.api}/i/course-section/`, options)
                .then(response => response.json())
                .then(response => {
                    // Do something with response.
                    if (response.message) {
                        swal({
                            title: "Delete Section",
                            text: "Deleted",
                            icon: "success",
                            buttons: false,
                            timer: 2500,
                        })
                        detail.getDetails(id);
                    } else {
                        swal({
                            title: "Delete Section",
                            text: "Error while deleting section",
                            icon: "error",
                            buttons: false,
                            timer: 5000,
                        })
                    }
                })
                .catch(err => {
                    swal({
                        title: "Delete Section",
                        text: "Error while deleting section",
                        icon: "error",
                        buttons: false,
                        timer: 5000,
                    })
                })
        }
    }

    const deleteSelected = () => {
        if (detail.activeLesson !== '') {
            deleteLesson();
        } else if (detail.activeSub !== '') {
            deleteSubSection();
        } else if (detail.viewing !== '') {
            deleteSection();
        }
    }

    const saveNewSection = (e) => {
        e.preventDefault();
        setIsloading(true);
        NotificationManager.info('Creating...', 'New section', 6000);
        let positionID = '0' + (detail.sectionCount + 1);
        if (sectionTitle.length === 0) {
            alert('Section title is required');
            setIsloading(false);
            return false;
        }
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-section/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "course_id": id,
                "code": basic.courseCode,
                'name': basic.courseName,
                "position_id": positionID,
                "title": sectionTitle
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    NotificationManager.success('Created', 'New section', 6000);
                    setSectionTitle('');
                    detail.getDetails(id);
                    newHook.toggleAddSection();
                    setIsloading(false);
                } else {
                    NotificationManager.error(response.data.detail, 'New section', 5000)
                    setIsloading(false);
                }
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'New Section', 6000)
                setIsloading(false);
            });
    }

    const saveNewSubSection = (e) => {
        e.preventDefault();
        NotificationManager.info('Creating...', 'New sub section', 6000);
        setIsloading(true);
        let positionID = newHook.nextSub;
        if (subTitle.length === 0) {
            alert('Title is required');
            setIsloading(false);
            return false;
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-subsection/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "course_id": id,
                "code": basic.courseCode,
                'name': basic.courseName,
                "position_id": subPID,
                "title": subTitle,
                "section_id": section_id,
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    NotificationManager.success('Created', 'New sub section', 6000);
                    setSubTitle('');
                    newHook.toggleAddSubsSection();
                    detail.getDetails(id);
                    setIsloading(false);
                    setSubPID('')
                    setSectionID('')
                } else {
                    NotificationManager.error(response.data.detail, 'New sub section', 5000)
                    setIsloading(false);
                }
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'New sub Section', 6000)
                setIsloading(false);
            });
    }

    const saveNewLesson = (e) => {
        e.preventDefault();
        setIsloading(true);
        NotificationManager.info('Creating...', 'New lesson', 6000);
        let positionID = newHook.nextLes;
        if (lesTitle.length === 0) {
            alert('Title is required');
            setIsloading(false);
            return false;
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-lesson/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "course_id": id,
                "position_id": lesPID,
                "title": lesTitle,
                "subsection_id": subID
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    NotificationManager.success('Created', 'New sub section', 6000);
                    setSubTitle('');
                    newHook.toggleAddLesson();
                    detail.getDetails(id);
                    setIsloading(false);
                    setSubPID('')
                    setLesPID('');
                    setSectionID('')
                    setSubArray([]);
                    setLesTitle('')
                } else {
                    NotificationManager.error(response.data.detail, 'New sub section', 5000)
                    setIsloading(false);
                }
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'New sub Section', 6000)
                setIsloading(false);
            });
    }

    const editContentHere = () => {
        detail.editContentToogle();
    }

    const passSection = (value) => {
        if (value.length === 0) {
            setSubPID('')
        } else {
            setSectionID(value.split('/')[0]);
            let position_id = value.split('/')[1];
            let index = value.split('/')[2];
            // detail.getSubPosition(index, position_id);
            setSubPID(detail.getSubPosition(index, position_id))
        }
    }

    const passSub = (value) => {
        if (value.length === 0) {
            setSubPID('')
            setLesPID('')
            setSubArray([])
        } else {
            setSubArray(detail.getArray(value))
        }
    }

    const getSub = (value) => {
        if (value.length === 0) {
            setSubID('')
            setSubPID('')
            setLesPID('')
        } else {
            setSubID(value.split('/')[0]);
            let position_id = value.split('/')[1];
            let index = value.split('/')[2];
            setLesPID(detail.getLesPosition(subArray, index, position_id))
        }
    }


    return (
        <>
            <NotificationContainer />
            <div className='conMenu w-100' style={{ display: 'inline-flex' }}>
                <nav className='fg-1'>
                    <div className='d-flex'>
                        <button disabled={edit.disableGradingNew} className={'btn menu-link text-primary'} onClick={newSection}>
                            New
                        </button>
                        <button
                            disabled={(detail.currentlyEditing === '') && (edit.disableGradingNew)}
                            className={'btn menu-link'}
                            style={{ color: '#00798C' }}
                        >
                            Edit
                        </button>
                        <button disabled={edit.disableGradingNew} className={detail.editContent ? 'btn menu-link' : 'd-none'} style={{ color: '#00798C' }} onClick={() => detail.updateContent(id)}>
                            Save
                        </button>
                        <button disabled={detail.readOnly} className={detail.editContent ? 'btn menu-link txtCancel' : 'd-none'} style={{ color: 'rgba(245, 113, 113)' }} onClick={() => editContentHere()}>
                            Cancel
                        </button>
                        <button disabled={edit.disableGradingNew} className={!detail.editContent ? 'btn menu-link' : 'btn menu-link'} style={{ color: '#FF4040' }} onClick={deleteSelected}>
                            Delete
                        </button>
                    </div>
                </nav>
                <div className='fg-0 d-flex' >
                    <button className={'btn menu-link text-primary'}>
                        Preview
                    </button>
                </div>
            </div>
            <LeftList />

            <div className={newOutline ? `${style.modal} modal d-block` : `modal d-none`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content p-3">
                        <div className={`${style.modalHeader} modal-header`}>
                            <h5 className={`${style.modalTitle} modal-title`} style={{ fontSize: '20px' }} id="exampleModalLongTitle">
                                Create course outline
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={
                                    (e) => {
                                        newSection();
                                        newHook.setAddSection(false);
                                    }
                                }
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`${style.modalBody} modal-body`}>
                            <div className='row'>
                                <form className='col-lg-12' onSubmit={e => saveNewSection(e)}>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="courseName">
                                                    SECTION
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="form-group mb-1 mt-2">
                                                <div className='w-100 d-flex justify-content-end'>
                                                    <button type="button" className={newHook.addSection ? `d-none` : `btn bgPreview ml-15`} onClick={newHook.toggleAddSection}>
                                                        New
                                                    </button>
                                                    <button type="button" className={!newHook.addSection ? `d-none` : `btn btn-danger ml-15`} onClick={newHook.toggleAddSection}>
                                                        Cancel
                                                    </button>
                                                    <button type="submit" className={!newHook.addSection ? `d-none` : `btn bgPreview ml-15`} data-dismiss="modal">
                                                        {isLoading ? (
                                                            <>
                                                                <span className='fa fa-spinner fa-spin'></span>
                                                            </>
                                                        ) : (
                                                            'Save'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${!newHook.newSub ? 'col-5' : 'd-none'} ${!newHook.newLes ? 'col-5' : 'd-none'} `}>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseCode">
                                                    Position ID
                                                </label>
                                                <input
                                                    type="text"
                                                    name="positionID"
                                                    id="positionID"
                                                    required
                                                    className={"form-control"}
                                                    placeholder=""
                                                    aria-describedby="helpId"
                                                    value={newHook.sectionSpecs()}
                                                    readonly={true}
                                                />
                                            </div>
                                        </div>
                                        <div className={newHook.newSub ? 'col-5' : 'd-none'}>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseCode">
                                                    Select section
                                                </label>
                                                <select
                                                    className='form-control'
                                                    id="section"
                                                    name="section"
                                                    onChange={(e) => passSection(e.target.value)}
                                                >
                                                    <option value=''>section</option>
                                                    {detail.sections.length > 0 ? (
                                                        <>
                                                            {detail.sections.map((section, index) => (
                                                                <option key={section.id} value={`${section.id}/${section.position_id}/${index}`} >
                                                                    {section.position_id}
                                                                </option>
                                                            ))}
                                                        </>
                                                    ) : null}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={newHook.newLes ? 'col-5' : 'd-none'}>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseCode">
                                                    Select section
                                                </label>
                                                <select
                                                    className='form-control'
                                                    id="section"
                                                    name="section"
                                                    onChange={(e) => passSub(e.target.value)}
                                                >
                                                    <option value=''>section</option>
                                                    {detail.sections.length > 0 ? (
                                                        <>
                                                            {detail.sections.map((section, index) => (
                                                                <option key={section.id} value={`${index}`} >
                                                                    {section.position_id}
                                                                </option>
                                                            ))}
                                                        </>
                                                    ) : null}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-7'>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="sectionTitle"
                                                    required
                                                    onChange={(e) => setSectionTitle(e.target.value)}
                                                    id="subsectionTitle"
                                                    className="form-control"
                                                    placeholder=""
                                                    aria-describedby="helpId"
                                                    value={sectionTitle}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <form className='col-lg-12' onSubmit={e => saveNewSubSection(e)}>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="courseName">
                                                    SUB-SECTION
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="form-group mb-1 mt-2">
                                                <div className='w-100 d-flex justify-content-end'>
                                                    <button type="button" className={newHook.newSub ? `d-none` : `btn bgPreview ml-15`} onClick={newHook.toggleAddSubsSection}>
                                                        New
                                                    </button>
                                                    <button type="button" className={!newHook.newSub ? `d-none` : `btn btn-danger ml-15`} onClick={newHook.toggleAddSubsSection}>
                                                        Cancel
                                                    </button>
                                                    <button type="submit" className={!newHook.newSub ? `d-none` : `btn bgPreview ml-15`} data-dismiss="modal">
                                                        {isLoading ? (
                                                            <>
                                                                <span className='fa fa-spinner fa-spin'></span>
                                                            </>
                                                        ) : (
                                                            'Save'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={newHook.newLes ? 'col-5' : 'd-none'}>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseCode">
                                                    Select sub-section
                                                </label>
                                                <select
                                                    className='form-control'
                                                    id="section"
                                                    name="section"
                                                    onChange={(e) => getSub(e.target.value)}
                                                >
                                                    <option value=''>sub-section</option>
                                                    {subArray.length > 0 ? (
                                                        <>
                                                            {subArray.map((section, index) => (
                                                                <option key={section.id} value={`${section.id}/${section.position_id}/${index}`} >
                                                                    {section.position_id}
                                                                </option>
                                                            ))}
                                                        </>
                                                    ) : null}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={newHook.newLes ? 'd-none' : 'col-5'}>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseCode">
                                                    Position ID
                                                </label>
                                                <input
                                                    type="text"
                                                    name="positionID"
                                                    id="positionID"
                                                    required
                                                    className="form-control"
                                                    placeholder=""
                                                    aria-describedby="helpId"
                                                    value={subPID}
                                                    readonly={true}
                                                />
                                            </div>
                                        </div>
                                        <div className={newHook.newSub ? 'col-7' : 'col-7'}>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="sectionTitle"
                                                    required
                                                    onChange={(e) => setSubTitle(e.target.value)}
                                                    id="subsectionTitle"
                                                    className="form-control"
                                                    placeholder=""
                                                    aria-describedby="helpId"
                                                    value={subTitle}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <form className='col-lg-12' onSubmit={e => saveNewLesson(e)}>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="courseName">
                                                    LESSON
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="form-group mb-1 mt-2">
                                                <div className='w-100 d-flex justify-content-end'>
                                                    <button type="button" className={!newHook.newLes ? `d-none` : `btn btn-danger ml-15`} onClick={newHook.toggleAddLesson}>
                                                        Cancel
                                                    </button>
                                                    <button type="button" className={newHook.newLes ? `d-none` : `btn bgPreview ml-15`} onClick={newHook.toggleAddLesson}>
                                                        New
                                                    </button>
                                                    <button type="submit" className={!newHook.newLes ? `d-none` : `btn bgPreview ml-15`} data-dismiss="modal">
                                                        {isLoading ? (
                                                            <>
                                                                <span className='fa fa-spinner fa-spin'></span>
                                                            </>
                                                        ) : (
                                                            'Save'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={newHook.newLes ? 'col-5' : 'col-5'}>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseCode">
                                                    Position ID
                                                </label>
                                                <input
                                                    type="text"
                                                    name="positionID"
                                                    id="positionID"
                                                    required
                                                    className="form-control"
                                                    placeholder=""
                                                    aria-describedby="helpId"
                                                    value={lesPID}
                                                    readonly={true}
                                                />
                                            </div>
                                        </div>
                                        <div className={newHook.newLes ? 'col-7' : 'col-7'}>
                                            <div className="form-group mb-3">
                                                <label className="label" htmlFor="courseName">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="sectionTitle"
                                                    required
                                                    onChange={(e) => setLesTitle(e.target.value)}
                                                    id="subsectionTitle"
                                                    className="form-control"
                                                    placeholder=""
                                                    aria-describedby="helpId"
                                                    value={lesTitle}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentNav