// eslint-disable-next-line react-hooks/exhaustive-deps

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Nav from '../../components/nav/Nav';
import { useAuth } from '../../providers/Auth';
import { useBasic } from '../../providers/Basic';
import { useEdit } from '../../providers/Edit';
import { useHook } from '../../providers/Hook';
import StatusTab from './StatusTab';
import TabMenu from './TabMenu';
import $ from 'jquery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const BasicEdit = () => {
    const hook = useHook();
    const edit = useEdit();
    const basic = useBasic();
    const location = useLocation();
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth()

    const getCourse = (id) => {
        basic.getCourse(id);
    }

    useEffect(() => {
        getCourse(id);
        window.scrollTo(0 ,0)
        document.getElementById("basicForm").reset();
    }, [location.key])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        edit.toggleEdit('basic');
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        console.log(formData);

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-detail/`,
            data: {
                "id": id,
                "code": basic.courseCode,
                "name": basic.courseName,
                "short_description": basic.courseDescription,
                "overview": basic.overview,
                // "institution_id": basic.institution
            },
            headers: {
                'Authorization': auth.token
            }
        };

        axios(config)
            .then(function (response) {
                setIsLoading(false);
                edit.setReadOnly(false);
                edit.setIsEdit(false);
                edit.setActiveEdit('');
                if (response.data.id) {
                    NotificationManager.success('Saved', 'Basic tab', 3000)
                    // NotificationManager.success(message, title, timeOut, callback, priority);
                    document.getElementById("basicForm").reset();
                }
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'Basic tab', 3000);
                setIsLoading(false);
                edit.setReadOnly(false);
                edit.setIsEdit(false);
                edit.setActiveEdit('');
            });
    }

    return (
        <>
            <NotificationContainer />
            {/* navigation bar */}
            <Nav />
            <br />
            {/* status, edit, back to dashboard and course preview tab */}
            <StatusTab />
            <br />
            {/* various course parts tab  */}
            <TabMenu />
            <br />
            <div className='container'>
                {(basic.courseDetails.length === '0' ? null : (
                    <>
                        <form onSubmit={handleSubmit} id='basicForm'>
                            <div className="form-group mt-3">
                                <label htmlFor="courseCode" className='label'>Course Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="courseCode"
                                    id="courseCode"
                                    required={true}
                                    value={basic.courseCode}
                                    readOnly={edit.readOnly}
                                    onChange={e => { basic.setCourseCode(e.target.value) }}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="courseName" className='label'>Course Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="courseName"
                                    id="courseName"
                                    required={true}
                                    value={basic.courseName}
                                    readOnly={edit.readOnly}
                                    onChange={e => { basic.setCourseName(e.target.value) }}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="institution" className='label'>Institution</label>
                                <input
                                    type="text"
                                    name="institution"
                                    id="institution"
                                    className="form-control"
                                    required={true}
                                    value={basic.institution}
                                    readOnly={edit.readOnly}
                                    onChange={e => { basic.setInstitution(e.target.value) }}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="courseDescription" className='label'>Course Short Description</label>
                                <CKEditor
                                    editor={ClassicEditor} className="form-control"
                                    name="courseDescription"
                                    id="courseDescription"
                                    rows="3"
                                    required={true}
                                    disabled={edit.readOnly}
                                    data={basic.courseDescription}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        basic.setCourseDescription(data)
                                    }}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="overview" className='label'>Course Overview</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    className="form-control"
                                    name="overview"
                                    id="overview"
                                    rows="3"
                                    required={true}
                                    disabled={edit.readOnly}
                                    data={basic.overview}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        basic.setOverview(data)
                                        console.log({ data });
                                    }}
                                />
                            </div>

                            <div className='form-group mt-3'>
                                <div className="row">
                                    <div className='col-lg-4'>
                                        <label htmlFor="subjectGroup" className='label'>Subject Group</label>
                                        <select className='form-control' name="subjectGroup"
                                            id="subjectGroup"
                                            disabled={edit.readOnly}
                                        >
                                            <option>Select Subject Group</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-4'>
                                        <label htmlFor="subjectName" className='label'>Subject Name</label>
                                        <select className='form-control'
                                            name="subjectName"
                                            id="subjectName"
                                            disabled={edit.readOnly}
                                        >
                                            <option>Select</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-4'>
                                        <label htmlFor="language" className='label'>Language</label>
                                        <select className='form-control'
                                            name="language"
                                            id="language"
                                            disabled={edit.readOnly}
                                        >
                                            <option>Select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="keyWords" className='label'>Keyword Tags</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    className="form-control"
                                    name="keyWords"
                                    id="keyWords"
                                    rows="3"
                                    required={true}
                                    disabled={edit.readOnly}
                                    data={''}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ data });
                                    }}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="level" className='label'>Level</label>
                                <select
                                    className="form-control"
                                    name="level"
                                    id="level"
                                    disabled={edit.readOnly}
                                >
                                    <option> Select Level</option>
                                </select>
                            </div>
                            <hr className='mt-3' />
                            <div className="row">
                                <div className='col-lg-6'>
                                    <div className="form-check form--inline">
                                        <small className='label' style={{ marginRight: '30px' }}>
                                            Enrollment Type
                                        </small>
                                        <label className="form-check-label" style={{ marginRight: '30px' }}>
                                            <input className="form-check-input" type="radio" name="enrollmentType" id="" value="checkedValue" checked
                                                disabled={edit.readOnly} /> Open
                                        </label>
                                        <label className="form-check-label" style={{ marginRight: '30px' }}>
                                            <input className="form-check-input" type="radio" name="enrollmentType" id="" value="checkedValue"
                                                disabled={edit.readOnly} /> By Invitation
                                        </label>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="form-check form--inline">
                                        <small className='label' style={{ marginRight: '30px' }}>
                                            Entrance Exam Required
                                        </small>
                                        <label className="form-check-label" style={{ marginRight: '30px' }}>
                                            <input className="form-check-input" type="radio" name="examREquired" id="" value="checkedValue" checked
                                                disabled={edit.readOnly} /> Yes
                                        </label>

                                        <label className="form-check-label" style={{ marginRight: '30px' }}>
                                            <input className="form-check-input" type="radio" name="examREquired" id="" value="checkedValue"
                                                disabled={edit.readOnly} /> No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr className='mt-3' />
                            <div className="form-group mt-3">
                                <label htmlFor="prerequisite" className='label'>Prerequisite</label>
                                <input
                                    type="text"
                                    name="prerequisite"
                                    id="prerequisite"
                                    className="form-control"
                                    readOnly={edit.readOnly}
                                />
                            </div>

                            <div className="form-group mt-3">
                                <div className="row justify-content-end">
                                    <div className='col-lg-2'>
                                        <button
                                            className='statusButton bgPreview'
                                            type={'submit'}
                                            disabled={edit.readOnly}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className='fa fa-spinner fa-spin'></span> <span style={{ fontFamily: 'monospace' }} >
                                                        SAVING
                                                    </span>
                                                </>
                                            ) : (
                                                'Save'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </>
                ))}
            </div>
            <br />
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default BasicEdit
