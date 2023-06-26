import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react'
import { useDetail } from '../../../../providers/Detail';
import { NotificationContainer } from 'react-notifications';
import { useEdit } from '../../../../providers/Edit';
import swal from 'sweetalert';
import { useHook } from '../../../../providers/Hook';
import axios from 'axios';
import { useAuth } from '../../../../providers/Auth';
import { useParams } from 'react-router-dom';

const Section = (props) => {
    let { id } = useParams();
    const detail = useDetail();
    const auth = useAuth();
    const hook = useHook();
    const [done, setDone] = useState(false);
    const edit = useEdit();
    const [showMen, setShowMen] = useState(false);
    const [sectionID, setSectionID] = useState()
    const [sectionTitle, setSectionTitle] = useState();
    const [sectionPositionID, setSectionPositionID] = useState('');
    const [sectionOverview, setSectionOverview] = useState('');
    const [sectionVisibility, setSectionVisibility] = useState();



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

    const toggleSectionEdit = () => {
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

    const updateSection = () => {
        swal({
            title: 'Section',
            text: 'updating section ' + props.data.title,
            icon: 'info',
            button: false,
            timer: 6000
        });
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-section/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "title": sectionTitle,
                "id": sectionID,
                "overview": sectionOverview,
                "position_id": sectionPositionID,
                "visible": sectionVisibility,
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    swal({
                        title: 'Section',
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
                        title: 'Section',
                        text: response.data.detail,
                        icon: 'error',
                        button: false,
                        timer: 4000
                    });
                }
            })
            .catch(function (error) {
                swal({
                    title: 'Section',
                    text: error.message,
                    icon: 'error',
                    button: false,
                    timer: 4000
                });
            });
    }

    const deleteSection = () => {
        swal({
            title: "Delete Section",
            text: "Are you sure you want to delete this section?",
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
                        url: `${hook.api}/i/course-section/`,
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
                                    title: 'Delete Section',
                                    text: 'section deleted!',
                                    icon: 'success',
                                    button: false,
                                    timer: 4000
                                });
                                detail.getDetails(id);
                                edit.setUnsaved(false);
                                detail.setTitle('');
                                detail.setCurrentlyEditing('')
                                detail.setViewing('');
                            } else {
                                swal({
                                    title: 'Delete Section',
                                    text: response.data.detail,
                                    icon: 'error',
                                    button: false,
                                    timer: 4000
                                });
                            }
                        })
                        .catch(function (error) {
                            swal({
                                title: 'Delete Section',
                                text: error.message,
                                icon: 'error',
                                button: false,
                                timer: 4000
                            });
                        });
                } else {
                    swal({
                        title: "Delete Section",
                        text: "Cancelled by user",
                        icon: "info",
                        buttons: 'Okay',
                        timer: 5000,
                    })
                    return false;
                }
            })
    }

    useEffect(() => {
        setSectionTitle(props.data.title);
        setSectionPositionID(props.data.position_id);
        setSectionOverview(props.data.overview);
        setSectionID(props.data.id);
        setSectionVisibility(props.data.visible);

        document.addEventListener("change", function (event) {
            edit.setUnsaved(true);
        });

        return () => {
            setDone(true);
        }
    }, [props.data])

    useEffect(() => {
        edit.setUnsaved(false)
    }, [])
    return (
        <>
            {/* right side top bar starts  */}
            <div className='d-flex justify-content-end mb-1' style={{ marginBottom: 0, height: '38px'  }}>
                <div class={`${(detail.currentlyEditing === props.data.id) ? 'd-block' : 'd-none'}`}>
                    <button class={`btn bgPreview mr-20`} onClick={() => { updateSection() }}>
                        Save
                    </button>
                    <button
                        class={`btn bgCancel`}
                        onClick={
                            (e) => {
                                toggleSectionEdit()
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
                                toggleSectionEdit()
                            }}
                        >
                            Edit
                        </li>
                        <li className='sm-menu-link' onClick={() => deleteSection()}>
                            Delete
                        </li>
                    </ul>
                </div>
            </div>
            {/* right side top bar ends  */}
            <form>
                <div className='row mb-5'>
                    <div className='col-lg-12'>
                        <div className="form-group mt-2">
                            <label className="label" for="">
                                Section Title
                            </label>
                            <input
                                type='text'
                                placeholder='Input title'
                                name={'setionTitle'}
                                defaultValue={sectionTitle}
                                className='form-control'
                                onChange={(e) => {
                                    setSectionTitle(e.target.value);
                                }}
                                onKeyUp={() => {
                                    edit.setUnsaved(true);
                                }}
                                disabled={(detail.currentlyEditing !== props.data.id)} />
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className="form-group mt-2">
                            <label className="label" for="overview">
                                {props.title} Overview
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                className="form-control"
                                name="overview"
                                id="overview"
                                rows="5"
                                required={true}
                                disabled={(detail.currentlyEditing !== props.data.id)}
                                data={sectionOverview}
                                onChange={(event, editor) => {
                                    setSectionOverview(editor.getData());
                                    // edit.setUnsaved(true);
                                }}
                            />
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
                                    onChange={e => setSectionVisibility(e.target.value)}
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
                                    onChange={e => setSectionVisibility(e.target.value)}
                                    defaultChecked={props.data.visible === false}
                                    disabled={(detail.currentlyEditing !== props.data.id)}
                                /> No
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Section