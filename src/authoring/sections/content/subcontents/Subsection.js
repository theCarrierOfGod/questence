import React, { useEffect, useState } from 'react'
import { useHook } from '../../../../providers/Hook';
import { useDetail } from '../../../../providers/Detail';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAuth } from '../../../../providers/Auth';
import { useParams } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import axios from 'axios';
import { useEdit } from '../../../../providers/Edit';
import swal from 'sweetalert';

const Subsection = (props) => {
    let { id } = useParams();
    const detail = useDetail();
    const auth = useAuth();
    const hook = useHook();
    const [done, setDone] = useState(false);
    const edit = useEdit();
    const [showMen, setShowMen] = useState(false);
    const [subsectionID, setSubsectionID] = useState('')
    const [subsectionTitle, setSubsectionTitle] = useState('');
    const [subsectionPositionID, setSubsectionPositionID] = useState('');
    const [subsectionOverview, setSubsectionOverview] = useState('')
    const [subsectionVisibility, setSubSectionVisibility] = useState();

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
            title: 'Sub section',
            text: 'updating sub section ' + props.data.title,
            icon: 'info',
            button: false,
            timer: 6000
        });
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-subsection/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "title": subsectionTitle,
                "id": subsectionID,
                "overview": subsectionOverview,
                "position_id": subsectionPositionID,
                "visible": subsectionVisibility,
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    swal({
                        title: 'Sub section',
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
                        title: 'Sub section',
                        text: response.data.detail,
                        icon: 'error',
                        button: false,
                        timer: 4000
                    });
                }
            })
            .catch(function (error) {
                swal({
                    title: 'Sub section',
                    text: error.message,
                    icon: 'error',
                    button: false,
                    timer: 4000
                });
            });
    }

    const deleteSection = () => {
        swal({
            title: "Delete sub section",
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
                        url: `${hook.api}/i/course-subsection/`,
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
                                    title: 'Delete sub section',
                                    text: 'section deleted!',
                                    icon: 'success',
                                    button: false,
                                    timer: 4000
                                });
                                detail.getDetails(id);
                                edit.setUnsaved(false);
                                detail.setTitle('');
                                detail.setCurrentlyEditing('')
                                detail.setActiveSub('');
                            } else {
                                swal({
                                    title: 'Delete sub section',
                                    text: response.data.detail,
                                    icon: 'error',
                                    button: false,
                                    timer: 4000
                                });
                            }
                        })
                        .catch(function (error) {
                            swal({
                                title: 'Delete sub section',
                                text: error.message,
                                icon: 'error',
                                button: false,
                                timer: 4000
                            });
                        });
                } else {
                    swal({
                        title: "Delete sub section",
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
        setSubsectionTitle(props.data.title);
        setSubsectionPositionID(props.data.position_id);
        setSubsectionOverview(props.data.overview);
        setSubsectionID(props.data.id);
        setSubSectionVisibility(props.data.visible);
        return () => {
            setDone(true);
        }

        document.addEventListener("change", function (event) {
            edit.setUnsaved(true);
        });
    }, [props.data]);

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
                                Sub section Title
                            </label>
                            <input
                                type='text'
                                placeholder='Input title'
                                name={'setionTitle'}
                                defaultValue={subsectionTitle}
                                className='form-control'
                                onChange={e => setSubsectionTitle(e.target.value)}
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
                                data={subsectionOverview}
                                onChange={(event, editor) => {
                                    setSubsectionOverview(editor.getData());
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
                                    onChange={e => setSubSectionVisibility(e.target.value)}
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
                                    onChange={e => setSubSectionVisibility(e.target.value)}
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
        </>
    )
}

export default Subsection