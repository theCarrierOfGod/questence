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
    const [subjectIndex, setSubjectIndex] = useState('');
    const auth = useAuth()

    const getCourse = (id) => {
        basic.getCourse(id);
    }

    useEffect(() => {
        getCourse(id);
        window.scrollTo(0, 0)
        document.getElementById("basicForm").reset();
    }, [location.key])



    const changeGroup = (e, index) => {
        setSubjectIndex(index);
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
                        <form id='basicForm'>
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
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <label htmlFor="institution_id" className='label'>Institution</label>
                                        <select className='form-control'
                                            name="language"
                                            id="language"
                                            disabled={edit.readOnly}
                                        >
                                            <option value={(basic.institutionArray === []) ? 'Select' : basic.institutionID}>{(basic.institutionArray === []) ? 'select' : basic.institutionArray.institution}</option>

                                            {auth.institutions.map((inst) => (
                                                <option key={inst['id']} value={inst['id']} onClick={(e) => { basic.setInstitutionID(e.target.value); }} className={(basic.institutionID.id === inst['id']) ? 'd-none' : ''}>
                                                    {inst['institution']}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="courseDescription" className='label'>Course Short Description</label>
                                <textarea
                                    className="form-control"
                                    name="courseDescription"
                                    id="courseDescription"
                                    rows="3"
                                    required={true}
                                    disabled={edit.readOnly}
                                    value={basic.courseDescription}
                                    onChange={
                                        (e) => basic.setCourseDescription(e.target.value)
                                    }
                                ></textarea>
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
                                    }}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <div className="row">
                                    <div className='col-lg-4'>
                                        <label htmlFor="subjectGroup" className='label'>Subject Group</label>
                                        <select className='form-control' name="subjectGroup"
                                            id="subjectGroup"
                                            required={true}
                                            disabled={edit.readOnly}
                                        >
                                            <option>Select Subject Group</option>
                                            {auth.subjectGroup.map((subject, index) => (
                                                <option key={subject.subject_group} selected={(basic.subjectName === subject.id)} onClick={e => { changeGroup(e, index); basic.setSubjectName(subject.id) }} value={subject.subject_group}>
                                                    {subject.subject_group}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='col-lg-4'>
                                        <label htmlFor="subjectName" className='label' >Subject Name</label>
                                        <select className='form-control'
                                            name="subjectName"
                                            id="subjectName"
                                            required={true}
                                            disabled={edit.readOnly}
                                        >
                                            {/* <option value={(basic.subjectID === '') ? 'select' : basic.subjectID}>{(basic.subjectID === '') ? 'select' : basic.subjectArray.subject_name}</option> */}
                                            {subjectIndex.length === 0 ? (
                                                <>
                                                </>
                                            ) : (
                                                <>
                                                    {auth.subjectGroup[subjectIndex].subjects.map((subject) => (
                                                        <option key={subject.id} value={subject.id} onClick={e => { basic.setSubjectID(e.target.value); }}>
                                                            {subject.subject_name}
                                                        </option>
                                                    ))}
                                                </>
                                            )}
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
                                            {auth.languageChoices.map((lang) => (
                                                <option key={lang['V']} value={lang['V']} onClick={e => basic.setLanguage(e.target.value)} selected={(basic.language === lang['V'])}>
                                                    {lang['D']}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="keyWords" className='label'>Keyword Tags</label>
                                <textarea
                                    className="form-control"
                                    name="courseDescription"
                                    id="courseDescription"
                                    rows="1"
                                    required={false}
                                    disabled={edit.readOnly}
                                    value={basic.keyWords}
                                    onChange={
                                        (e) => basic.seyKeywords(e.target.value)
                                    }
                                ></textarea>
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
                                    {auth.levelChoices.map((lvl) => (
                                        <option key={lvl['V']} value={lvl['V']} selected={lvl['V'] === basic.level} onChange={e => basic.setLevel(e.target.value)}>
                                            {lvl['D']}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <hr className='mt-3' />
                            <div className="row">
                                <div className='col-lg-6'>
                                    <div className="form-check form--inline">
                                        <small className='label' style={{ marginRight: '30px' }}>
                                            Enrollment Type
                                        </small>
                                        {(auth.enrollmentChoices.length !== 0) ? (
                                            <>
                                                {auth.enrollmentChoices.map((enrollment) => (
                                                    <div key={enrollment['V']}>
                                                        <label className="form-check-label" style={{ marginRight: '30px' }}>
                                                            <input className="form-check-input" type="radio" name="enrollmentType" id="" onChange={e => basic.setEnrollmentType(e.target.value)} value={enrollment['V']} checked={(basic.enrollmentType === enrollment['V'])}
                                                                disabled={edit.readOnly} /> {enrollment['D']}
                                                        </label>
                                                    </div>
                                                ))}
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="form-check form--inline">
                                        <small className='label' style={{ marginRight: '30px' }}>
                                            Entrance Exam Required
                                        </small>
                                        <label className="form-check-label" style={{ marginRight: '30px' }}>
                                            <input className="form-check-input" type="radio" name="examRequired" id="" value={true} onChange={e => basic.setEntranceExamRequired(e.target.value)} checked={basic.entranceExamRequired === true}
                                                disabled={edit.readOnly} /> Yes
                                        </label>

                                        <label className="form-check-label" style={{ marginRight: '30px' }}>
                                            <input className="form-check-input" type="radio" name="examRequired" id="" value={false} onChange={e => basic.setEntranceExamRequired(e.target.value)} checked={basic.entranceExamRequired === false}
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
