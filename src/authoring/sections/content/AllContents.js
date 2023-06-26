import React, { useEffect, useState } from 'react'
import SectionsLanding from '../SectionsLanding'
import { useEdit } from '../../../providers/Edit';
import './all.css';
import style from '../../members/courses.module.css';
import { useBasic } from '../../../providers/Basic';
import Lesson from './subcontents/Lesson';
import Subsection from './subcontents/Subsection';
import Section from './subcontents/Section';
import { useDetail } from '../../../providers/Detail';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../../providers/Auth';
import { useHook } from '../../../providers/Hook';
import swal from 'sweetalert';
import axios from 'axios';

const AllContents = () => {
    let { id } = useParams();
    const location = useLocation();
    const edit = useEdit();
    const basic = useBasic();
    const detail = useDetail();
    const auth = useAuth();
    const hook = useHook();
    const newHook = useHook();
    const [cantEdit, setCantEdit] = useState(true);
    const [editingContents, setEditingContents] = useState(true);
    const [currentlyEditing, setCurrentlyEditing] = useState('');
    const [currentlyEditingType, setCurrentlyEditingType] = useState('');
    const [newOutline, setNewOutline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // SECTION STATES
    const [dunmmySectionTitle, setDummySectionTitle] = useState('')
    const [nextSectionPosition, setNextSectionPosition] = useState('')
    const [newSectionOngoing, setNewSectionOngoing] = useState(false);
    const [nextSectionTitle, setNextSectionTitle] = useState('');
    const [presentSectionIndex, setPresentSectionIndex] = useState('');
    const [sectionPID, setSectionPID] = useState('');
    const [sectionUID, setSectionUID] = useState('');

    //SUBSECTION STATES
    const [dunmmySubsectionTitle, setDummySubsectionTitle] = useState('')
    const [nextSubsectionPosition, setNextSubsectionPosition] = useState('')
    const [newSubsectionOngoing, setNewSubsectionOngoing] = useState(false);
    const [nextSubsectionTitle, setNextSubsectionTitle] = useState('');
    const [presentSubsectionIndex, setPresentSubectionIndex] = useState('');
    const [subsectionPID, setSubsectionPID] = useState('');
    const [subsectionUID, setSubsetionUID] = useState('');

    //LESSON STATES
    const [dunmmyLessonTitle, setDummyLessonTitle] = useState('')
    const [nextLessonPosition, setLessonPosition] = useState('')
    const [newLessonOngoing, setLessonOngoing] = useState(false);
    const [nextLessonTitle, setNextLessonTitle] = useState('');
    const [presentLessonIndex, setPresentLessonIndex] = useState(0);
    const [LessonPID, setLessonPID] = useState('');
    const [LessonUID, setLessonUID] = useState('');


    const passEditing = (currentID, type) => {
        if ((currentlyEditingType === 'lesson') && (type === 'lesson')) {
            setCurrentlyEditing(currentID);
            setCurrentlyEditingType(type)
        } else {
            if ((detail.viewing === currentID) || (detail.activeSub === currentID) || (detail.activeLesson === currentID)) {
                setCurrentlyEditing('');
                setCurrentlyEditingType('')
            } else {
                setCurrentlyEditing(currentID);
                setCurrentlyEditingType(type)
            }
        }

    }

    useEffect(() => {
        setTimeout(() => {
            edit.gradingNewCheck();
        }, 400);

        return () => {
            return false;
        }
    }, [location.key]);


    // All delete functions start 

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

    // All delete functions end 

    // All creation functions start 
    const openNewForm = () => {
        if (newOutline) {
            setNewOutline(false)
        } else {
            setNewOutline(true)
        }
        setDummySectionTitle('')
        setNextSectionTitle('')
        setNewSectionOngoing('');
        document.getElementById('sectionForm').reset();

        setDummySubsectionTitle('');
        setNextSubsectionTitle('');
        setNewSubsectionOngoing('');
        document.getElementById('subsectionForm').reset();

        setDummyLessonTitle('');
        setNextLessonTitle('');
        setLessonOngoing('');
        document.getElementById('lessonForm').reset();
    }

    const saveNewSection = (e) => {
        e.preventDefault();
        setIsLoading(true);
        swal('New Section', 'Creating...', 'info', {
            buttons: false,
            timer: 4000
        })
        if (nextSectionTitle === '') {
            swal('New Section', 'Please enter section title', 'warning', {
                buttons: false,
                timer: 4000
            })
            setIsLoading(false);
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
                "position_id": nextSectionPosition,
                "title": nextSectionTitle
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    swal('New Section', 'Section created', 'success', {
                        buttons: false,
                        timer: 6000
                    })
                    detail.getDetails(id);
                    toggleNewSection()
                    setIsLoading(false);
                    setPresentLessonIndex('');
                    setPresentSectionIndex('');
                    setPresentSubectionIndex('');

                    setDummySubsectionTitle('');
                    setNextSubsectionTitle('');
                    setNewSubsectionOngoing('');
                    document.getElementById('subsectionForm').reset();

                    setDummyLessonTitle('');
                    setNextLessonTitle('');
                    setLessonOngoing('');
                    document.getElementById('lessonForm').reset();
                } else {
                    swal('New Section', response.data.detail, 'error', {
                        buttons: false,
                        timer: 6000
                    })
                    setIsLoading(false);
                }
            })
            .catch(function (error) {
                swal('New Section', error.message, 'error', {
                    buttons: false,
                    timer: 6000
                })
                setIsLoading(false);
            });
    }

    const theNextSection = () => {
        let highest = detail.sections.length;
        let response = "0" + (highest + 1);

        setNextSectionPosition(response);
    }

    const toggleNewSection = () => {
        theNextSection();
        setNextSectionTitle('')
        setPresentSectionIndex('')
        setDummySubsectionTitle('')
        setDummySectionTitle('')
        if (newSectionOngoing) {
            setNewSectionOngoing(false)
        } else {
            setNewSectionOngoing(true)
        }
        setDummyLessonTitle('');
        document.getElementById('sectionForm').reset();
        document.getElementById('subsectionForm').reset();
        document.getElementById('lessonForm').reset();
    }

    const saveNewSubsection = (e) => {
        e.preventDefault();
        setIsLoading(true);
        swal('New Subsection', 'Creating...', 'info', {
            buttons: false,
            timer: 4000
        })
        if (nextSubsectionTitle === '') {
            swal('New Subsection', 'Please enter subsection title', 'warning', {
                buttons: false,
                timer: 4000
            })
            setIsLoading(false);
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
                "position_id": nextSubsectionPosition,
                "title": nextSubsectionTitle,
                "section_id": sectionUID,
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    swal('New Subsection', 'Subsection created', 'success', {
                        buttons: false,
                        timer: 6000
                    })
                    detail.getDetails(id);
                    toggleNewSubsection()
                    setIsLoading(false);
                    setPresentLessonIndex('');
                    setPresentSubectionIndex('');
                    document.getElementById('subsectionForm').reset();
                } else {
                    swal('New Subsection', response.data.detail, 'error', {
                        buttons: false,
                        timer: 6000
                    })
                    setIsLoading(false);
                }
            })
            .catch(function (error) {
                swal('New Subsection', error.message, 'error', {
                    buttons: false,
                    timer: 6000
                })
                setIsLoading(false);
            });
    }

    const theNextSubection = () => {
        let highestSub = detail.sections[presentSectionIndex].subsections.length;
        let responseSub = "0" + (highestSub + 1);

        setNextSubsectionPosition(sectionPID + '.' + responseSub);
    }

    const toggleNewSubsection = () => {
        setNextSubsectionTitle('');
        setPresentSubectionIndex('')
        if (presentSectionIndex === '') {
            swal({
                title: 'New subsection',
                text: 'Please select a section',
                icon: 'info',
                buttons: 'Okay',
                timer: 4000
            })
        } else {
            theNextSubection();
            if (newSubsectionOngoing) {
                setNewSubsectionOngoing(false)
            } else {
                setNewSubsectionOngoing(true)
            }
            setDummyLessonTitle('');

            document.getElementById('lessonForm').reset();
        }
    }

    const theNextLesson = () => {
        let highestSub = detail.sections[presentSectionIndex].subsections[presentSubsectionIndex].lessons.length;
        let responseSub = "0" + (highestSub + 1);

        setLessonPosition(subsectionPID + '.' + responseSub);
    }

    const toggleNewLesson = () => {
        setNextLessonTitle('');
        if (presentSubsectionIndex === '') {
            swal({
                title: 'New lesson',
                text: 'Please select a subsection',
                icon: 'info',
                buttons: 'Okay',
                timer: 4000
            })
        } else {
            theNextLesson();
            if (newLessonOngoing) {
                setLessonOngoing(false)
            } else {
                setLessonOngoing(true)
            }
        }
    }

    const saveNewLesson = (e) => {
        e.preventDefault();
        setIsLoading(true);
        swal('New Lesson', 'Creating...', 'info', {
            buttons: false,
            timer: 4000
        })
        if (nextLessonTitle === '') {
            swal('New Lesson', 'Please enter lesson title', 'warning', {
                buttons: false,
                timer: 4000
            })
            setIsLoading(false);
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
                "code": basic.courseCode,
                'name': basic.courseName,
                "position_id": nextLessonPosition,
                "title": nextLessonTitle,
                "subsection_id": subsectionUID,
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    swal('New Lesson', 'Lesson created', 'success', {
                        buttons: false,
                        timer: 6000
                    })
                    detail.getDetails(id);
                    toggleNewLesson()
                    setIsLoading(false);
                    document.getElementById('lessonForm').reset();

                    setPresentLessonIndex('');
                } else {
                    swal('New Lesson', response.data.detail, 'error', {
                        buttons: false,
                        timer: 6000
                    })
                    setIsLoading(false);
                }
            })
            .catch(function (error) {
                swal('New Lesson', error.message, 'error', {
                    buttons: false,
                    timer: 6000
                })
                setIsLoading(false);
            });
    }

    // All creation functions end 

    useEffect(() => {
        detail.getDetails(id);
        edit.setUnsaved(false)
    }, [id])
    return (
        <>
            <SectionsLanding />

            <div className='mt-4 mb-5' style={{ minHeight: '40vh' }} >
                <div className='container'>
                    <div className='row'>
                        {/* Left side of the content page  */}
                        <div className='col-md-4'>
                            {/* left side mini menu starts */}
                            <div className='conMenu w-100' style={{ display: 'inline-flex' }}>
                                <nav className='fg-1'>
                                    <div className='d-flex'>
                                        <button
                                            disabled={edit.disableGradingNew}
                                            className={'btn menu-link text-primary'}
                                            onClick={() => openNewForm()}
                                        >
                                            Append
                                        </button>
                                        {/* <button
                                            disabled={(currentlyEditing === '') !== (edit.disableGradingNew)}
                                            className={`${(detail.currentlyEditing === '') ? 'btn menu-link' : 'd-none'} `}
                                            style={{ color: '#00798C' }}
                                            onClick={
                                                (e) => {
                                                    detail.passEditing(currentlyEditing, currentlyEditingType)
                                                }
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={`${((detail.currentlyEditing !== '')) ? 'btn menu-link' : 'd-none'} `}
                                            style={{ color: '#00798C' }}
                                            onClick={
                                                (e) => {
                                                    detail.passEditing(currentlyEditing, currentlyEditingType)
                                                }
                                            }
                                        >
                                            Save
                                        </button>
                                        <button
                                            className={((detail.currentlyEditing !== '')) ? 'btn menu-link txtCancel' : 'd-none'}
                                            style={{ color: 'rgba(245, 113, 113)' }}
                                            onClick={
                                                (e) => {
                                                    detail.passEditing(currentlyEditing, currentlyEditingType)
                                                }
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            disabled={(currentlyEditing === '') !== (edit.disableGradingNew)}
                                            className={`${(detail.currentlyEditing === '') ? 'btn menu-link' : 'd-none'} `}
                                            style={{ color: '#FF4040' }}
                                            onClick={() => deleteSelected()}
                                        >
                                            Delete
                                        </button> */}
                                    </div>
                                </nav>
                                <div className='fg-0 d-flex' >
                                    <button className={'btn menu-link text-primary'}>
                                        Preview
                                    </button>
                                </div>
                            </div>
                            {/* left side mini menu ends  */}

                            {/* course detail list starts  */}
                            <div className='conMenu p-0 w-100 mb-5 mt-4'>
                                <div className='rightStraight w-100 pt-2 pb-2'>
                                    <ul className='no-list-style p-0 m-0 secMain w-100' id="clickIn">
                                        {(detail.sections.length === 0) ? (
                                            <>
                                                {detail.gettingContent ? (
                                                    <>
                                                        <li style={{ padding: '0' }}>
                                                            <span className='activeTab w-100 d-flex alignCenter p-1 justify-content-center'>
                                                                <span>
                                                                    <span className='fa fa-spinner fa-spin' style={{ marginRight: '10px' }}></span>
                                                                    Fetching sections
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        {detail.contentError ? (
                                                            <>
                                                                <li style={{ padding: '0' }}>
                                                                    <span className='activeTab w-100 d-flex alignCenter p-1 justify-content-center'>
                                                                        <span className='fa fa-exclamation-triangle fa-2x text-danger' style={{ marginRight: '20px' }}></span>
                                                                        <span>
                                                                            Error fetching sections, <br />Please reload page!
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {detail.sectionCount === 0 ? (
                                                                    <li style={{ padding: '0' }}>
                                                                        <span className='activeTab w-100 d-flex alignCenter p-1 justify-content-center'>
                                                                            <span className='fa fa-exclamation text-danger' style={{ marginRight: '20px' }}></span>
                                                                            <span>
                                                                                There are no sections!
                                                                            </span>
                                                                        </span>
                                                                    </li>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {(detail.sections.map((asection) => (
                                                    <>
                                                        <li id={asection.id} key={asection.id} style={{ padding: '0' }}>
                                                            <span
                                                                className={`${((detail.viewing === asection.id) && (detail.activeSub === "") && (detail.activeLesson === "")) ? 'activeTab' : ''} w-100 d-flex alignCenter p-1`}
                                                                onClick={
                                                                    (e) => {
                                                                        if (edit.unsaved) {
                                                                            swal({
                                                                                title: "Cancel Editing?",
                                                                                text: "All unsaved changes will be gone, do you want to proceed?",
                                                                                icon: "warning",
                                                                                buttons: ['Continue Editing', 'Cancel Editing'],
                                                                                dangerMode: true,
                                                                            }).then((willCancel) => {
                                                                                if (willCancel) {
                                                                                    detail.toggleView(asection.id);
                                                                                    console.log(asection.id)
                                                                                    passEditing(asection.id, 'section');
                                                                                    detail.openAndClose(asection.id);
                                                                                    edit.setUnsaved(false);
                                                                                } else {
                                                                                    return false;
                                                                                }
                                                                            })
                                                                        } else {
                                                                            detail.toggleView(asection.id);
                                                                            detail.setData([])
                                                                            passEditing(asection.id, 'section');
                                                                            detail.openAndClose(asection.id)
                                                                            edit.setUnsaved(false);
                                                                        }
                                                                    }
                                                                }>
                                                                <span className='leftIds'>
                                                                    {asection.position_id}
                                                                </span>
                                                                <span
                                                                    className={`fa mr-15 ${(detail.opened.includes(asection.id)) ? 'fa-caret-down' : 'fa-caret-right'}`}
                                                                ></span>
                                                                <span>
                                                                    {asection.title}
                                                                </span>
                                                            </span>
                                                            <ul className={`${(detail.opened.includes(asection.id)) ? 'd-block' : 'd-none'} no-list-style pl-20`}>
                                                                {(asection.subsections.map((subSection) => (
                                                                    <li id={subSection.id} key={subSection.id} style={{ padding: '0' }}>
                                                                        <span
                                                                            className={`${((detail.activeSub === subSection.id) && (detail.activeLesson === "")) ? 'activeTab' : ''} w-100 d-flex alignCenter p-1`}
                                                                            onClick={
                                                                                (e) => {
                                                                                    if (edit.unsaved) {
                                                                                        swal({
                                                                                            title: "Cancel Editing?",
                                                                                            text: "All unsaved changes will be gone, do you want to proceed?",
                                                                                            icon: "warning",
                                                                                            buttons: ['Continue Editing', 'Cancel Editing'],
                                                                                            dangerMode: true,
                                                                                        }).then((willCancel) => {
                                                                                            if (willCancel) {
                                                                                                detail.toggleActiveSub(subSection.id, asection.id);
                                                                                                detail.setData([subSection])
                                                                                                passEditing(subSection.id, 'subsection');
                                                                                                detail.openAndClose(subSection.id)
                                                                                                edit.setUnsaved(false);
                                                                                            } else {
                                                                                                return false;
                                                                                            }
                                                                                        })
                                                                                    } else {
                                                                                        detail.toggleActiveSub(subSection.id, asection.id);
                                                                                        detail.setData([subSection])
                                                                                        passEditing(subSection.id, 'subsection');
                                                                                        detail.openAndClose(subSection.id)
                                                                                        edit.setUnsaved(false);
                                                                                    }
                                                                                }
                                                                            }>
                                                                            <span className='leftIds'>
                                                                                {subSection.position_id}
                                                                            </span>
                                                                            <span className={`fa mr-15 ${(detail.opened.includes(subSection.id)) ? 'fa-caret-down' : 'fa-caret-right'}`}></span>
                                                                            <span>
                                                                                {subSection.title}
                                                                            </span>
                                                                        </span>
                                                                        <ul className={`${(detail.opened.includes(subSection.id)) ? 'd-block' : 'd-none'} no-list-style pl-20`} >
                                                                            {(subSection.lessons.map((lesson) => (
                                                                                <li id={lesson.id} key={lesson.id} style={{ padding: '0' }}
                                                                                    onClick={
                                                                                        e => {
                                                                                            if (edit.unsaved) {
                                                                                                swal({
                                                                                                    title: "Cancel Editing?",
                                                                                                    text: "All unsaved changes will be gone, do you want to proceed?",
                                                                                                    icon: "warning",
                                                                                                    buttons: ['Continue Editing', 'Cancel Editing'],
                                                                                                    dangerMode: true,
                                                                                                }).then((willCancel) => {
                                                                                                    if (willCancel) {
                                                                                                        detail.setData([])
                                                                                                        detail.toggleActiveLesson(lesson.id, lesson);
                                                                                                        passEditing(lesson.id, 'lesson');
                                                                                                        edit.setUnsaved(false);
                                                                                                    } else {
                                                                                                        return false;
                                                                                                    }
                                                                                                })
                                                                                            } else {
                                                                                                detail.setData([])
                                                                                                detail.toggleActiveLesson(lesson.id, lesson);
                                                                                                passEditing(lesson.id, 'lesson');
                                                                                                edit.setUnsaved(false);
                                                                                            }
                                                                                        }
                                                                                    }>
                                                                                    <span className='leftIds' >
                                                                                        {lesson.position_id}
                                                                                    </span>
                                                                                    <span className={`${(detail.activeLesson === lesson.id) ? 'activeTab' : ''} w-100 d-flex alignCenter p-1`}>
                                                                                        <span>
                                                                                            {lesson.title}
                                                                                        </span>
                                                                                    </span>
                                                                                </li>
                                                                            )))}
                                                                        </ul>
                                                                    </li>
                                                                )))}
                                                            </ul>
                                                        </li>
                                                    </>
                                                )))}
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            {/* curse detail list ends  */}
                        </div>
                        {/* Right side of the content page  */}
                        <div className='col-md-8'>
                            {/* right side content div starts  */}
                            <div className='mt-2'>
                                {(detail.title === 'Lesson') ? (
                                    <>
                                        <Lesson data={detail.data} />
                                    </>
                                ) : null}

                                {(detail.title === 'Sub-section') ? (
                                    <>
                                        <Subsection data={detail.data} />
                                    </>
                                ) : null}

                                {(detail.title === 'Section') ? (
                                    <>
                                        <Section data={detail.data} />
                                    </>
                                ) : null}

                                {(detail.title === '') ? (
                                    <>
                                        <div className='row mb-5'>
                                            <div className='col-lg-12'>
                                                <div className="form-group mt-5">
                                                    <br />
                                                    {detail.isLoading ? (
                                                        <>
                                                            <span className='fa fa-spinner fa-spin' style={{ marginRight: '10px' }}></span>
                                                            <span>
                                                                Fetching
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {detail.hasError ? (
                                                                <>
                                                                    <span className='fa fa-exclamation-triangle fa-2x text-danger' style={{ marginRight: '20px' }}></span>
                                                                    <span>
                                                                        Error fetching sections, <br />Please reselect!
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <h5>
                                                                        Please select a section.
                                                                    </h5>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                            {/* right side content div ends  */}
                        </div>
                    </div>
                </div>
            </div>


            {/* The modal for creating all new course members  */}
            <div className={newOutline ? `${style.modal} modal d-block` : `modal d-none`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content p-3">
                        {/* modal header starts  */}
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
                                        openNewForm();
                                        // newHook.setAddSection(false);
                                    }
                                }
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* modal header ends  */}

                        {/* modal body starts  */}
                        <div className={`${style.modalBody} modal-body`}>
                            <div className='row'>
                                {/* section form starts  */}
                                <form className='col-lg-12 mb-4' id="sectionForm" onSubmit={e => saveNewSection(e)}>
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
                                                    <button
                                                        type="button"
                                                        className={newSectionOngoing ? `d-none` : `btn bgPreview ml-15`}
                                                        onClick={
                                                            () => {
                                                                toggleNewSection();
                                                            }
                                                        }>
                                                        New
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={!newSectionOngoing ? `d-none` : `btn btn-danger ml-15`}
                                                        onClick={
                                                            () => {
                                                                toggleNewSection();
                                                                setIsLoading(false)
                                                            }
                                                        }>
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className={!newSectionOngoing ? `d-none` : `btn bgPreview ml-15`}
                                                        data-dismiss="modal">
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
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="sectionPositionId">
                                                    POSITION ID
                                                </label>

                                                <select
                                                    type='select'
                                                    hidden={newSectionOngoing}
                                                    className='form-select'
                                                    onChange={
                                                        (e) => {
                                                            if (e.target.value !== "") {
                                                                var myArray = e.target.value.split(" | | ");
                                                                let sectionPID = myArray[0];
                                                                let title = myArray[1];
                                                                let index = myArray[2];
                                                                let sectionUID = myArray[3];
                                                                setSectionPID(sectionPID);
                                                                setPresentSectionIndex(index)
                                                                setDummySectionTitle(title);
                                                                setNewSubsectionOngoing(false);
                                                                setSectionUID(sectionUID)
                                                                //cancel lesson inputs
                                                                setDummyLessonTitle('');
                                                                setNextLessonTitle('');
                                                                document.getElementById('lessonForm').reset();
                                                                setPresentSubectionIndex('');
                                                                setPresentLessonIndex('')
                                                            } else {
                                                                setSectionUID('')
                                                                setSectionPID('')
                                                                setDummySectionTitle('');
                                                                setPresentSectionIndex('');
                                                                setNewSubsectionOngoing(false);
                                                                //cancel lesson inputs
                                                                setDummyLessonTitle('');
                                                                setNextLessonTitle('');
                                                                setPresentSubectionIndex('');
                                                                setPresentLessonIndex('')
                                                                document.getElementById('lessonForm').reset();
                                                            }
                                                        }
                                                    }
                                                    defaultValue={""}>
                                                    <option value={""} >Select section</option>
                                                    {(detail.sections.length !== 0) ? (
                                                        <>
                                                            {(detail.sections.map((asection, index) => (
                                                                <>
                                                                    <option value={`${asection.position_id} | | ${asection.title} | | ${index} | | ${asection.id}`}>{asection.position_id}</option>
                                                                </>
                                                            )))}
                                                        </>
                                                    ) : null
                                                    }
                                                </select>
                                                <input type="type" hidden={!newSectionOngoing} required={true} readOnly={true} className='form-control' value={nextSectionPosition} />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="courseName">
                                                    TITLE
                                                </label>
                                                <input
                                                    type="type"
                                                    hidden={newSectionOngoing}
                                                    className='form-control'
                                                    value={dunmmySectionTitle}
                                                />
                                                <input type="type" hidden={!newSectionOngoing} required={true} placeholder='Section title' className='form-control' onChange={(e) => setNextSectionTitle(e.target.value)} value={nextSectionTitle} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/* section form ends  */}

                                <hr />

                                {/* subsection form starts  */}
                                <form className='col-lg-12 mb-4' id="subsectionForm" onSubmit={e => saveNewSubsection(e)}>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="courseName">
                                                    SUBSECTION
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="form-group mb-1 mt-2">
                                                <div className='w-100 d-flex justify-content-end'>
                                                    <button
                                                        type="button"
                                                        className={newSubsectionOngoing ? `d-none` : `btn bgPreview ml-15`}
                                                        onClick={
                                                            () => {
                                                                toggleNewSubsection();
                                                            }
                                                        }>
                                                        New
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={!newSubsectionOngoing ? `d-none` : `btn btn-danger ml-15`}
                                                        onClick={
                                                            () => {
                                                                toggleNewSubsection();
                                                                setIsLoading(false)
                                                            }
                                                        }>
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className={!newSubsectionOngoing ? `d-none` : `btn bgPreview ml-15`}
                                                        data-dismiss="modal">
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
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="sectionPositionId">
                                                    POSITION ID
                                                </label>

                                                <select
                                                    type='select'
                                                    hidden={newSubsectionOngoing}
                                                    className='form-select'
                                                    onChange={
                                                        (e) => {
                                                            if (e.target.value !== "") {
                                                                var myArray = e.target.value.split(" | | ");
                                                                let title = myArray[1];
                                                                let index = myArray[2]
                                                                let subsectionPID = myArray[0];
                                                                let subsectionUID = myArray[3];
                                                                setSubsectionPID(subsectionPID);
                                                                setPresentSubectionIndex(index)
                                                                setNewSubsectionOngoing(false);
                                                                setSubsetionUID(subsectionUID)
                                                                setDummySubsectionTitle(title);

                                                                //cancel lesson inputs
                                                                setDummyLessonTitle('');
                                                                setNextLessonTitle('');
                                                                document.getElementById('lessonForm').reset();
                                                                setLessonOngoing(false)
                                                                setPresentLessonIndex('')
                                                            } else {
                                                                setDummySubsectionTitle('');
                                                                setPresentSubectionIndex('');
                                                                setSubsetionUID('')
                                                                setSubsectionPID('')
                                                                setNewSubsectionOngoing(false);

                                                                //cancel lesson inputs
                                                                setDummyLessonTitle('');
                                                                setNextLessonTitle('');
                                                                document.getElementById('lessonForm').reset();
                                                                setLessonOngoing(false)
                                                                setPresentLessonIndex('')
                                                            }
                                                        }
                                                    }
                                                    defaultValue={""}>
                                                    <option value={""} >Select subsection</option>
                                                    {(presentSectionIndex === '') ? (
                                                        null
                                                    ) : (
                                                        <>
                                                            {(detail.sections[presentSectionIndex].subsections.map((asubsection, index) => (
                                                                <>
                                                                    <option value={`${asubsection.position_id} | | ${asubsection.title} | | ${index} | | ${asubsection.id}`}>{asubsection.position_id}</option>
                                                                </>
                                                            )))}
                                                        </>
                                                    )
                                                    }
                                                </select>
                                                <input type="type" hidden={!newSubsectionOngoing} required={true} readOnly={true} className='form-control' value={nextSubsectionPosition} />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="courseName">
                                                    TITLE
                                                </label>
                                                <input
                                                    type="type"
                                                    hidden={newSubsectionOngoing}
                                                    className='form-control'
                                                    value={dunmmySubsectionTitle}
                                                />
                                                <input type="type" hidden={!newSubsectionOngoing} required={true} placeholder='Subsection title' className='form-control' onChange={(e) => setNextSubsectionTitle(e.target.value)} value={nextSubsectionTitle} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/* subsection form ends  */}

                                <hr />

                                {/* lesson form starts  */}
                                <form className='col-lg-12 mb-4' id="lessonForm" onSubmit={e => saveNewLesson(e)}>
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
                                                    <button
                                                        type="button"
                                                        className={newLessonOngoing ? `d-none` : `btn bgPreview ml-15`}
                                                        onClick={
                                                            () => {
                                                                toggleNewLesson();
                                                            }
                                                        }>
                                                        New
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={!newLessonOngoing ? `d-none` : `btn btn-danger ml-15`}
                                                        onClick={
                                                            () => {
                                                                toggleNewLesson();
                                                                setIsLoading(false)
                                                            }
                                                        }>
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className={!newLessonOngoing ? `d-none` : `btn bgPreview ml-15`}
                                                        data-dismiss="modal">
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
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="sectionPositionId">
                                                    POSITION ID
                                                </label>

                                                <select
                                                    type='select'
                                                    hidden={newLessonOngoing}
                                                    className='form-select'
                                                    onChange={
                                                        (e) => {
                                                            if (e.target.value !== "") {
                                                                var myArray = e.target.value.split(" | | ");
                                                                let title = myArray[1];
                                                                let index = myArray[2]
                                                                let subsectionPID = myArray[0];
                                                                let subsectionUID = myArray[3];
                                                                setLessonPID(subsectionPID);
                                                                setPresentLessonIndex(index)
                                                                setLessonOngoing(false);
                                                                setLessonUID(subsectionUID)
                                                                setDummyLessonTitle(title);
                                                            } else {
                                                                setDummyLessonTitle('');
                                                                setPresentLessonIndex('');
                                                                setLessonUID('')
                                                                setLessonPID('')
                                                                setLessonOngoing(false);
                                                            }
                                                        }
                                                    }
                                                    defaultValue={""}>
                                                    <option value={""} >Select lesson</option>
                                                    {((presentSectionIndex === '') || (presentSubsectionIndex === '')) ? (
                                                        null
                                                    ) : (
                                                        <>
                                                            {(detail.sections[presentSectionIndex].subsections[presentSubsectionIndex].lessons.map((alesson, index) => (
                                                                <>
                                                                    <option value={`${alesson.position_id} | | ${alesson.title} | | ${index} | | ${alesson.id}`}>{alesson.position_id}</option>
                                                                </>
                                                            )))}
                                                        </>
                                                    )
                                                    }
                                                </select>
                                                <input type="type" hidden={!newLessonOngoing} required={true} readOnly={true} className='form-control' value={nextLessonPosition} />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="form-group mb-1 mt-2">
                                                <label className="label w-100" htmlFor="courseName">
                                                    TITLE
                                                </label>
                                                <input
                                                    type="type"
                                                    hidden={newLessonOngoing}
                                                    className='form-control'
                                                    value={dunmmyLessonTitle}
                                                />
                                                <input type="type" hidden={!newLessonOngoing} required={true} placeholder='Lesson title' className='form-control' onChange={(e) => setNextLessonTitle(e.target.value)} value={nextLessonTitle} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/* lesson form ends  */}

                            </div>
                        </div>
                        {/* modal body ends  */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllContents