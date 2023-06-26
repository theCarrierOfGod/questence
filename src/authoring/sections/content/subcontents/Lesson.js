import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHook } from '../../../../providers/Hook';
import { useAuth } from '../../../../providers/Auth';
import { useDetail } from '../../../../providers/Detail';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import Component from './Component';
import swal from 'sweetalert';
import { useEdit } from '../../../../providers/Edit';

const Lesson = (props) => {
    let { id } = useParams();
    const hook = useHook();
    const auth = useAuth();
    const edit = useEdit();
    const detail = useDetail();
    const [title, setTitle] = useState(props.data.title);
    const [positionID, setPositionID] = useState(props.data.position_id);
    const [lessonID, setLessonID] = useState();
    const [done, setDone] = useState(false);
    const componentPosition = detail.getComPosition(props.data, positionID);
    const [componentTitle, setComponentTitle] = useState('');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [key, setKey] = useState('0');
    const [showMen, setShowMen] = useState(false);
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonPositionID, setLessonPositionID] = useState('');
    const [lessonVisibility, setLessonVisibility] = useState();


    const toogleshowMenu = () => {
        if (showMen) {
            setShowMen(false)
        } else {
            setShowMen(true)
        }
    }

    const editDetail = () => {
        if (detail.currentlyEditing === props.data.id) {
            detail.setCurrentlyEditing('')
        } else {
            detail.setCurrentlyEditing(props.data.id)
        }
    }

    const toggleLessonEdit = () => {
        if (edit.unsaved) {
            swal({
                title: "Cancel Editing",
                text: "All unsaved changes will be gone, do you want to proceed?",
                icon: "warning",
                buttons: ['Continue Editing', 'Cancel Editing'],
                dangerMode: true,
            }).then((willCancel) => {
                if (willCancel) {
                    editDetail();
                    edit.setUnsaved(false)
                } else {
                    return false;
                }
            })
        } else {
            editDetail();
        }
    }

    const updateLesson = () => {
        swal({
            title: 'Lesson',
            text: 'updating lesson ' + props.data.title,
            icon: 'info',
            button: false,
            timer: 6000
        });
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-lesson/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "title": lessonTitle,
                "id": lessonID,
                "position_id": lessonPositionID,
                "visible": lessonVisibility,
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    swal({
                        title: 'Lesson',
                        text: 'changes saved',
                        icon: 'success',
                        button: false,
                        timer: 4000
                    });
                    detail.getDetails(id);
                    edit.setUnsaved(false);
                    editDetail()
                } else {
                    swal({
                        title: 'Lesson',
                        text: response.data.detail,
                        icon: 'error',
                        button: false,
                        timer: 4000
                    });
                }
            })
            .catch(function (error) {
                swal({
                    title: 'Lesson',
                    text: error.message,
                    icon: 'error',
                    button: false,
                    timer: 4000
                });
            });
    }

    const deleteLesson = () => {
        swal({
            title: "Delete Lesson",
            text: "Are you sure you want to delete this lesson?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            timer: 5000,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let config = {
                        method: 'delete',
                        maxBodyLength: Infinity,
                        url: `${hook.api}/i/course-lesson/`,
                        headers: {
                            'Authorization': auth.token
                        },
                        data: {
                            id: props.data.id
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.data.message) {
                                swal({
                                    title: 'Delete Lesson',
                                    text: 'lesson deleted!',
                                    icon: 'success',
                                    button: false,
                                    timer: 4000
                                });
                                detail.getDetails(id);
                                edit.setUnsaved(false);
                                detail.setTitle('');
                                detail.setCurrentlyEditing('')
                                detail.activeLesson('');
                            } else {
                                swal({
                                    title: 'Delete Lesson',
                                    text: response.data.detail,
                                    icon: 'error',
                                    button: false,
                                    timer: 4000
                                });
                            }
                        })
                        .catch(function (error) {
                            swal({
                                title: 'Delete Lesson',
                                text: error.message,
                                icon: 'error',
                                button: false,
                                timer: 4000
                            });
                        });
                } else {
                    swal({
                        title: "Delete Lesson",
                        text: "Cancelled by user",
                        icon: "info",
                        buttons: 'Okay',
                        timer: 5000,
                    })
                    return false;
                }
            })
    }

    const newComponent = () => {
        detail.toggleNewLesson();
        setKey(Math.random())
    }

    const saveComponent = () => {
        swal({
            title: "Create Component",
            text: "Creating...",
            icon: "info",
            buttons: false,
            timer: 5000,
        })
        setIsLoading(true);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-component/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "title": componentTitle,
                "lesson_id": lessonID,
                "position_id": componentPosition,
                "type": type,
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    detail.getDetails(id);
                    detail.lessonChanges(lessonID);
                    swal({
                        title: "Create Component",
                        text: "Created",
                        icon: "success",
                        buttons: false,
                        timer: 5000,
                    })
                    detail.toggleNewLesson();
                    setIsLoading(false);
                } else {
                    swal({
                        title: "Create Component",
                        text: response.data.detail,
                        icon: "error",
                        buttons: false,
                        timer: 5000,
                    })
                    setIsLoading(false);
                    document.getElementById('newComForm').reset();
                    setComponentTitle('')
                }
            })
            .catch(function (error) {
                swal({
                    title: "Create Component",
                    text: error.message,
                    icon: "error",
                    buttons: false,
                    dangerMode: true,
                    timer: 5000,
                })
                setIsLoading(false);
            });
    }



    useEffect(() => {
        setLessonTitle(props.data.title);
        setLessonPositionID(props.data.position_id);
        setLessonID(props.data.id);
        setLessonVisibility(props.data.visible);

        document.addEventListener("change", function (event) {
            edit.setUnsaved(true);
        });

        return () => {
            setDone(true);
        }
    }, [props.data])



    useEffect(() => {
        setTitle(props.data.title);
        setPositionID(props.data.position_id);
        setLessonID(props.data.id)
        setIsLoading(false);
        return () => {
            setDone(true);
        }
    }, [detail.content]);



    return (
        <>
            {/* right side top bar starts  */}
            <div className='d-flex justify-content-end mb-1' style={{ marginBottom: '0', height: '38px' }}>
                <div class={`${(detail.currentlyEditing === props.data.id) ? 'd-block' : 'd-none'}`}>
                    <button class={`btn bgPreview mr-20`} onClick={() => { updateLesson() }}>
                        Save
                    </button>
                    <button
                        class={`btn bgCancel`}
                        onClick={
                            (e) => {
                                toggleLessonEdit()
                            }
                        }
                    >
                        Cancel
                    </button>
                </div>
                <div class={`${((detail.currentlyEditing !== props.data.id) && !edit.disableGradingNew) ? 'ellMenu' : 'd-none'}`}>
                    <span className='fa fa-ellipsis-v sm-menu-btn'></span>
                    <ul className='editMenu' style={{}}>
                        <li className='sm-menu-link' onClick={
                            (e) => {
                                toggleLessonEdit()
                            }}
                        >
                            Edit
                        </li>
                        <li className='sm-menu-link' onClick={() => deleteLesson()}>
                            Delete
                        </li>
                    </ul>
                </div>
            </div>
            {/* right side top bar ends  */}
            <form>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className="form-group mt-2">
                            <label className="label" for="">
                                Lesson Title
                            </label>
                            <input
                                type='text'
                                placeholder='Input title'
                                name={'setionTitle'}
                                value={lessonTitle}
                                className='form-control'
                                onChange={e => setLessonTitle(e.target.value)}
                                disabled={(detail.currentlyEditing !== props.data.id)} />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className="form-check form--inline mt-2 p-0">
                            <small className='label' style={{ marginRight: '40px' }}>
                                Visibility
                            </small>
                            <label className="form-check-label" style={{ marginRight: '30px' }}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="visible"
                                    id=""
                                    value={true}
                                    onChange={e => setLessonVisibility(e.target.value)}
                                    defaultChecked={props.data.visible === true}
                                    disabled={(detail.currentlyEditing !== props.data.id)}
                                /> Yes
                            </label>

                            <label className="form-check-label" style={{ marginRight: '30px' }}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="visible"
                                    id=""
                                    value={false}
                                    onChange={e => setLessonVisibility(e.target.value)}
                                    defaultChecked={props.data.visible === false}
                                    disabled={(detail.currentlyEditing !== props.data.id)}
                                /> No
                            </label>
                        </div>
                    </div>
                    <div className='col-lg-6 d-none'>
                        <div className="form-group mt-3">
                            <label className="label" for="editable_by">Editable By</label>
                            <select
                                className="form-control"
                                name={'editableBy'}
                                id="editable_by"
                                disabled={(detail.currentlyEditing !== props.data.id)}
                            >
                                <option>Select group</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>

            <div className='row mt-5'>
                <div className="form-group mb-3">
                    <div className='d-flex justify-content-between alignCenter mb-2'>
                        <label className="label mb-0 p-0" htmlFor="courseCode">
                            Components
                        </label>
                        <div>
                            <div className={detail.fetchingLesson ? 'fa fa-recycle fa-spin' : 'd-none'} ></div>
                            <button type="button" disabled={edit.disableGradingNew} className={!detail.newLesson ? 'btn bgPreview' : 'd-none'} onClick={newComponent} style={{ marginLeft: '10px' }}>
                                New
                            </button>
                            <button type="button" className={detail.newLesson ? 'btn bgPreview mr-20' : 'd-none'} onClick={saveComponent}>
                                {isLoading ? (
                                    <>
                                        <span className='fa fa-spinner fa-spin'></span>
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </button>
                            <button type="button" className={detail.newLesson ? 'btn bgCancel' : 'd-none'} onClick={newComponent}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <hr />

                    <form onSubmit={(e) => e.preventDefault() } id="newComForm" className={detail.newLesson ? 'row' : 'd-none'}>
                        <div className='col-md-3'>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseName">
                                    Position ID
                                </label>
                                <input
                                    type="text"
                                    name="positionID"
                                    required
                                    id="courseName"
                                    className="form-control"
                                    placeholder=""
                                    value={detail.getComPosition(props.data, positionID)}
                                    aria-describedby="helpId"
                                />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseName">
                                    Type
                                </label>
                                <select className='form-select' onChange={e => setType(e.target.value)}>
                                    <option value={null}>
                                        Select a type
                                    </option>
                                    {auth.componentOptions.map((option) => (
                                        <option key={option['V']} value={option['V']}>
                                            {option['D']}
                                        </option>
                                    ))}
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
                                        name="componentTitle"
                                        required id="courseName"
                                        className="form-control"
                                        placeholder="Input Title"
                                        defaultValue={componentTitle}
                                        onChange={e => setComponentTitle(e.target.value)}
                                        aria-describedby="helpId"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr />
                    </form>
                    {props.data.components ? (
                        <>
                            {(props.data.components.length !== 0) ? (
                                <>
                                    <Component data={props.data.components} key={key} />
                                </>
                            ) : null}
                        </>
                    ) : (null)}

                </div>
            </div>
        </>
    )
}

export default Lesson