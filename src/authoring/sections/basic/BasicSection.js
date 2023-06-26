import React, { useEffect, useState } from 'react'
import SectionsLanding from '../SectionsLanding'
import { useBasic } from '../../../providers/Basic'
import { useLocation, useParams } from 'react-router-dom';
import { useEdit } from '../../../providers/Edit';
import { useAuth } from '../../../providers/Auth';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BasicSection = () => {
    const basic = useBasic();
    const edit = useEdit();
    const auth = useAuth();
    const location = useLocation();
    const [subjectIndex, setSubjectIndex] = useState(0);
    const subjects = 'subjects';
    let { id } = useParams();
    const [disableBasicEdit, setDisableBasicEdit] = useState('');

    const roleCheck = () => {
        var role = window.localStorage.getItem('role');
        if ((role === 'Reader')) {
            setDisableBasicEdit(true);
        } else if ((role === 'Author')) {
            setDisableBasicEdit(true)
        } else if ((role === 'Lead')) {
            setDisableBasicEdit(false)
        } else {
            setDisableBasicEdit(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            roleCheck()
        }, 500);
        document.addEventListener("change", function (event) {
            edit.setUnsaved(true);
        });


        return () => {
            return true;
        }
    }, [location.key])

    const changeGroup = (index) => {
        setSubjectIndex(index);
        auth.subjectGroup.forEach(function (value, i) {

        });
    }

    return (
        <>
            <SectionsLanding />

            <div className='container mt-4 mb-4'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='conMenu w-100 justify-space-between' style={{ display: 'flex' }}>
                            <nav className='fg-1'>
                                <div className='d-flex'>
                                    <button disabled={disableBasicEdit} className={`${!edit.isEdit ? 'btn menu-link' : 'd-none'} ${disableBasicEdit ? 'yes' : 'no'}`} style={{ color: '#00798C' }} onClick={() => { edit.toggleEdit('basic'); }}>
                                        Edit
                                    </button>
                                    <button disabled={edit.readOnly} className={edit.isEdit ? 'btn menu-link' : 'd-none'} style={{ color: '#00798C' }} onClick={() => { basic.handleSubmit(auth.id); }}>
                                        Save
                                    </button>
                                    <button disabled={!edit.isEdit} className={edit.isEdit ? 'btn menu-link txtCancel' : 'd-none'} style={{ color: 'rgba(245, 113, 113)' }} onClick={() => { edit.toggleEdit('basic'); }}>
                                        Cancel
                                    </button>
                                </div>
                            </nav>
                            <div className='fg-0 d-flex d-none' >
                                <button className={'btn menu-link text-primary'}>
                                    Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mb-5'>
                {(basic.courseDetails.length === '0' ? null : (
                    <>
                        <div className='card mb-4 pt-0' >
                            <div className='card-body pt-1'>
                                <div id='basicForm'>
                                    <div className="form-group mt-2">
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
                                                <select className='form-select'
                                                    name="language"
                                                    id="language"
                                                    disabled={edit.readOnly}
                                                    onChange={(e) => { basic.setInstitutionID(e.target.value); }}
                                                >
                                                    {auth.institutions.map((inst) => (
                                                        <option key={inst['id']} value={inst['id']} selected={basic.institutionID === inst['id']} className={(basic.institutionID === inst['id']) ? 'd-none' : ''}>
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
                                                <select className='form-select' name="subjectGroup"
                                                    id="subjectGroup"
                                                    required={true}
                                                    disabled={edit.readOnly}
                                                    onChange={
                                                        (e) => {
                                                            changeGroup(e.target.value);
                                                        }
                                                    }
                                                    defaultValue={basic.subjectGroupName}
                                                >
                                                    <option value={''}>Select Subject Group</option>
                                                    {auth.subjectGroup.map((subject, index) => (
                                                        <option
                                                            key={subject.subject_group}
                                                            // selected={(basic.subjectName === subject.id)}
                                                            // onClickCapture={e => { alert('changed'); changeGroup(e, index); basic.setSubjectName(subject.id) }}
                                                            value={`${subject.id}`}>
                                                            {subject.subject_group}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='col-lg-4'>
                                                <label htmlFor="subjectName" className='label' >Subject Name</label>
                                                <select className='form-select'
                                                    name="subjectName"
                                                    id="subjectName"
                                                    required={true}
                                                    disabled={edit.readOnly}
                                                    onChange={e => { basic.setSubjectID(e.target.value); }}
                                                >
                                                    <option value={(basic.subjectID === '') ? null : basic.subjectID}>{(basic.subjectID === '') ? 'select' : basic.subjectName}</option>
                                                    {auth.subjectGroup.length === 0 ? (
                                                        <>
                                                        </>
                                                    ) : (
                                                        <>

                                                        </>
                                                    )}
                                                </select>
                                            </div>
                                            <div className='col-lg-4'>
                                                <label htmlFor="language" className='label'>Language</label>
                                                <select className='form-select'
                                                    name="language"
                                                    id="language"
                                                    disabled={edit.readOnly}
                                                    defaultValue={basic.language}
                                                    onChange={e => basic.setLanguage(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    {auth.languageChoices.map((lang) => (
                                                        <option key={lang['V']} value={lang['V']} >
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
                                            className="form-select"
                                            name="level"
                                            id="level"
                                            disabled={edit.readOnly}
                                            defaultChecked={basic.level}
                                            onChange={e => basic.setLevel(e.target.value)}
                                        >
                                            <option> Select Level</option>
                                            {auth.levelChoices.map((lvl) => (
                                                <option key={lvl['V']} value={lvl['V']}>
                                                    {lvl['D']}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <hr className='mt-3' />
                                    <div className="row">
                                        <div className='col-lg-6'>
                                            <div className="form-check form--inline p-0">
                                                <small className='label m-0' style={{ marginRight: '30px' }}>
                                                    Enrollment Type
                                                </small>
                                                {(auth.enrollmentChoices.length !== 0) ? (
                                                    <>
                                                        {auth.enrollmentChoices.map((enrollment) => (
                                                            <div key={enrollment['V']} style={{ marginLeft: "20px" }}>
                                                                <label className="form-check-label" style={{ marginRight: '30px' }}>
                                                                    <input className="form-check-input" type="radio" name="enrollmentType" id="" onChange={e => basic.setEnrollmentType(e.target.value)} value={enrollment['V']} defaultChecked={(basic.enrollmentType === enrollment['V'])}
                                                                        disabled={edit.readOnly} /> {enrollment['D']}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="form-check form--inline p-0">
                                                <small className='label' style={{ marginRight: '30px' }}>
                                                    Entrance Exam Required
                                                </small>
                                                <div style={{ marginLeft: "20px" }}>
                                                    <label className="form-check-label" style={{ marginRight: '30px' }}>
                                                        <input className="form-check-input" type="radio" name="examRequired" id="" value={true} onChange={e => { basic.setEntranceExamRequired(e.target.value) }} defaultChecked={basic.entranceExamRequired === true}
                                                            disabled={edit.readOnly} /> Yes
                                                    </label>
                                                </div>
                                                <div style={{ marginLeft: "20px" }}>
                                                    <label className="form-check-label" style={{ marginRight: '30px' }}>
                                                        <input className="form-check-input" type="radio" name="examRequired" id="" value={false} onChange={e => { basic.setEntranceExamRequired(e.target.value) }} defaultChecked={basic.entranceExamRequired === false}
                                                            disabled={edit.readOnly} /> No
                                                    </label>
                                                </div>
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
                                </div>
                            </div>
                        </div>

                        <div className='card mb-4'>
                            <div className='card-body'>
                                <form className='row justify-content-center'>
                                    <div className='col-lg-5 col-md-5 mb-4 text-center' >
                                        <div className={((basic.imageLink === null) || (basic.imageLink === '')) ? 'd-none' : 'd-block'}>
                                            <div style={{ height: '200px' }}>
                                                <img src={basic.imageLink} alt=" preview" style={{ inset: '0px', height: '200px' }} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="card-image" title={'Add course image'} >
                                                <small className='d-block w-100 text-center is-hoverable'>
                                                    <b>
                                                        Course Card Image
                                                    </b>
                                                </small>
                                            </label>
                                            <br /><br />
                                            <input
                                                type="url"
                                                className="form-control"
                                                required
                                                name="card-image"
                                                id="card-image"
                                                defaultValue={basic.imageLink}
                                                onChange={e => basic.setImageLink(e.target.value)}
                                                disabled={edit.readOnly}
                                                placeholder='Course card image'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6 mb-4 text-center'>
                                        <div style={{ width: '100%', textAlign: 'center' }}>
                                            <video controls style={{ height: '200px', padding: '5px', overflow: 'hidden', margin: 'auto' }} className={((basic.videoLink === null) || (basic.videoLink === '')) ? 'd-none' : 'd-block'} autoPlay>
                                                <source src={basic.videoLink} type="video/*"></source>
                                            </video>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="card-video" title={'Add course video'}>
                                                <small className='d-block w-100 text-center is-hoverable'>
                                                    <b>
                                                        Course Introduction Video
                                                    </b>
                                                </small>
                                            </label><br /><br />
                                            <input
                                                type="url"
                                                className="form-control"
                                                name="card-video"
                                                id="card-video"
                                                onChange={e => basic.setVideoLink(e.target.value)}
                                                disabled={edit.readOnly}
                                                defaultValue={basic.videoLink}
                                                placeholder='Course Introduction video'
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className='card'>
                            <div className='card-body'>
                                <div className='row mb-5'>
                                    <div className='col-lg-12'>
                                        <div className="form-check form--inline p-0">
                                            <label htmlFor="coursePacing" className='label'>Course Pacing</label>
                                            <div style={{ marginLeft: "20px" }}>
                                                <label className="form-check-label" style={{ marginRight: '30px' }}>
                                                    <input className="form-check-input" type="radio" name="coursePacing" id="" value={'IN'} onChange={e => { basic.setCoursePacing(e.target.value) }} defaultChecked={basic.coursePacing === 'IN'}
                                                        disabled={edit.readOnly} /> Instructor Led
                                                </label>
                                                <label className="form-check-label" style={{ marginLeft: '30px' }}>
                                                    <input className="form-check-input" type="radio" name="coursePacing" id="" value={'SP'} onChange={e => { basic.setCoursePacing(e.target.value) }} defaultChecked={basic.coursePacing === 'SP'}
                                                        disabled={edit.readOnly} /> Self Paced
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-6'>
                                        <div className="form-group mt-4">
                                            <label htmlFor="startDate" className='label'>Course Start Date & Time</label>
                                            <div className='row'>
                                                <div className='col-lg-8'>
                                                    <input type="date" disabled={edit.readOnly} name="startDate" id="startDate" className="form-control mb-2 mr-sm-2" placeholder='Date' />
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type="time" disabled={edit.readOnly} name="startTime" id="startTime" className="form-control mb-2 mr-sm-2" placeholder='Time' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-6'>
                                        <div className="form-group mt-4">
                                            <label htmlFor="endDate" className='label'>Course End Date & Time</label>
                                            <div className='row'>
                                                <div className='col-lg-8'>
                                                    <input type="date" disabled={edit.readOnly} name="endDate" id="endDate" className="form-control mb-2 mr-sm-2" placeholder='Date' />
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type="time" disabled={edit.readOnly} name="endTime" id="endTime" className="form-control mb-2 mr-sm-2" placeholder='Time' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-6'>
                                        <div className="form-group mt-4">
                                            <label htmlFor="enrollmentDate" className='label'>Enrollment Start Date & Time</label>
                                            <div className='row'>
                                                <div className='col-lg-8'>
                                                    <input type="date" disabled={edit.readOnly} name="enrollmentDate" id="enrollmentDate" className="form-control mb-2 mr-sm-2" placeholder='Date' />
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type="time" disabled={edit.readOnly} name="enrollmentTime" id="enrollmentTime" className="form-control mb-2 mr-sm-2" placeholder='Time' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-6'>
                                        <div className="form-group mt-4">
                                            <label htmlFor="endEnrollmentDate" className='label'>Enrollment End Date & Time</label>
                                            <div className='row'>
                                                <div className='col-lg-8'>
                                                    <input type="date" disabled={edit.readOnly} name="endEnrollmentDate" id="endEnrollmentDate" className="form-control mb-2 mr-sm-2" placeholder='Date' />
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type="time" disabled={edit.readOnly} name="endEnrollmentTime" id="endEnrollmentTime" className="form-control mb-2 mr-sm-2" placeholder='Time' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-6'>
                                        <div className="form-group mt-4">
                                            <label htmlFor="reqWeek" className='label'>
                                                Requirements - No of Week
                                            </label>
                                            <input type="text" disabled={edit.readOnly} name="reqWeek" id="reqWeek" placeholder="Input weeks required" className="form-control" />
                                        </div>
                                    </div>

                                    <div className='col-lg-6'>
                                        <div className="form-group mt-4">
                                            <label htmlFor="reqHours" className='label'>
                                                Requirements - Hours of Effort per Week
                                            </label>
                                            <input type="text" disabled={edit.readOnly} name="reqHours" id="reqHours" placeholder="Input hours required" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default BasicSection