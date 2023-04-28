import React, { useEffect, useState } from 'react';
import '../content.css';
import style from '../../index/components/progress/progress.module.css';
import { useNew } from '../../../providers/New';
import { useEdit } from '../../../providers/Edit';
import { useDetail } from '../../../providers/Detail';
import { useParams } from 'react-router-dom';
import { useHook } from '../../../providers/Hook';
import { useAuth } from '../../../providers/Auth';
import axios from 'axios';
import { useBasic } from '../../../providers/Basic';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import LeftList from './LeftList';

const ContentNav = () => {
    let { id } = useParams();
    const newHook = useNew();
    const hook = useHook();
    const auth = useAuth();
    const edit = useEdit();
    const detail = useDetail();
    const basic = useBasic();
    const [sectionTitle, setSectionTitle] = useState('');
    const [newSubTitle, setNewSubTitle] = useState('');
    const [title, setTitle] = useState('');

    const newSection = () => {
        if (edit.isEdit) {
            if (detail.activeSub !== '') {
                newHook.toggleAddLesson();
            } else if (detail.viewing !== '') {
                newHook.toggleAddSubsSection();
            } else {
                newHook.toggleAddSection();
            }
        } else {
            NotificationManager.warning('Page not yet editable', 'EDIT', 3000);
        }
    }

    const saveNewSection = (e) => {
        e.preventDefault();
        let positionID = '0' + (detail.sectionCount + 1);
        if (sectionTitle.length === 0) {
            alert('Section title is required');
            return false;
        }
        var config = {
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
                } else {
                    NotificationManager.error(response.data.detail, 'New section', 5000)
                }
                console.log(response);
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'New Section', 6000)
            });
    }

    const saveNewSubSection = (e) => {
        e.preventDefault();
        let positionID = newHook.nextSub;
        if (newSubTitle.length === 0) {
            alert('Title is required');
            return false;
        }

        var config = {
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
                "position_id": positionID,
                "title": newSubTitle,
                "section_id": detail.viewing,
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    NotificationManager.success('Created', 'New sub section', 6000);
                    setNewSubTitle('');
                    newHook.toggleAddSubsSection();
                    detail.getDetails(id);
                } else {
                    NotificationManager.error(response.data.detail, 'New sub section', 5000)
                }
                console.log(response);
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'New sub Section', 6000)
            });
    }

    useEffect(() => {
        detail.getDetails(id);
        basic.getCourse(id);
    }, [id]);


    return (
        <>
            <NotificationContainer />
            <div className='conMenu w-100' style={{ display: 'inline-flex' }}>
                <nav className='fg-1'>
                    <div className='d-flex'>
                        <button className='menu-link text-primary' onClick={newSection}>
                            New
                        </button>
                        <button className='menu-link' style={{ color: '#00798C' }}>
                            Edit
                        </button>
                        <button className='menu-link' style={{ color: '#FF4040' }}>
                            Delete
                        </button>
                    </div>
                </nav>
                <div className='fg-0 d-flex' >
                    <span className='menu-link'>
                        Preview
                    </span>
                    <span className='menu-link' style={{ fontSize: '18px', fontWeight: 1000, padding: 0, lineHeight: '25px' }}>
                        . . .
                    </span>
                </div>
            </div>
            <LeftList />
            <div className={newHook.addSection ? `${style.modal} modal d-block` : `modal d-none`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <form className="modal-dialog modal-dialog-centered" role="document" onSubmit={saveNewSection}>
                    <div className="modal-content p-3">
                        <div className={`${style.modalHeader} modal-header`}>
                            <h5 className={`${style.modalTitle} modal-title`} id="exampleModalLongTitle">
                                Add new section
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={newHook.toggleAddSection}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`${style.modalBody} modal-body`}>
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
                                    value={'0' + (detail.sectionCount + 1)}
                                    readonly={true}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseName">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="sectionTitle"
                                    required
                                    onChange={(e) => setSectionTitle(e.target.value)}
                                    id="sectionTitle"
                                    className="form-control"
                                    placeholder=""
                                    aria-describedby="helpId"
                                />
                            </div>
                        </div>
                        <div className={`${style.saveModal} modal-footer`}>
                            <button type="submit" className="btn btn-secondary" data-dismiss="modal">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {console.log(newHook.newSub)}

            <div className={newHook.newSub ? `${style.modal} modal d-block` : `modal d-none`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <form className="modal-dialog modal-dialog-centered" role="document" onSubmit={saveNewSubSection}>
                    <div className="modal-content p-3">
                        <div className={`${style.modalHeader} modal-header`}>
                            <h5 className={`${style.modalTitle} modal-title`} id="exampleModalLongTitle">
                                Add new sub-section
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={newHook.toggleAddSubsSection}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`${style.modalBody} modal-body`}>
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
                                    value={newHook.nextSub}
                                    readonly={true}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseName">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="sectionTitle"
                                    required
                                    onChange={(e) => setNewSubTitle(e.target.value)}
                                    id="subsectionTitle"
                                    className="form-control"
                                    placeholder=""
                                    aria-describedby="helpId"
                                />
                            </div>
                        </div>
                        <div className={`${style.saveModal} modal-footer`}>
                            <button type="submit" className="btn btn-secondary" data-dismiss="modal">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContentNav