import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";
import { useDetail } from "./Detail";
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
import { useBasic } from "./Basic";

const NewContext = createContext(null);

export const New = ({ children }) => {

    const auth = useAuth();
    const detail = useDetail();
    const basic = useBasic();
    const navigate = useNavigate();
    const hook = useHook();
    const location = useLocation();
    const [addNow, setAddNow] = useState(false);
    const [newCourseName, setNewCourseName] = useState(false);
    const [newCourseCode, setNewCourseCode] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [programCount, setProgramCount] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('Fetching data...');
    const [addSection, setAddSection] = useState(false);
    const [nextSub, setNextSub] = useState(0);
    const [nextLes, setNextLes] = useState('');
    const [newSub, setNewSub] = useState(false);
    const [newLes, setNewLes] = useState(false);
    const [savingNew, setSavingNew] = useState(false);


    const addNew = () => {
        if (addNow) {
            setAddNow(false)
        } else {
            setAddNow(true)
        }
    }

    // index page course list starts
    const getMyPrograms = () => {
        setLoadingMessage('Fetching your courses...');
        setPrograms([]);
        setProgramCount(0);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-list/`,
            headers: {
                'Authorization': auth.token
            },
            data: {}
        };

        axios(config)
            .then(function (response) {
                setPrograms(response.data);
                setProgramCount(response.data.length);
            })
            .catch(function (error) {
                setLoadingMessage('Error acquiring data. Please reload page');
            });
    }
    // index page course list ends

    // start new course on index page starts 
    const startNewCourse = (e) => {
        e.preventDefault();
        setSavingNew(true);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-detail/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "code": newCourseCode.toUpperCase(),
                "name": newCourseName.toUpperCase()
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    setSavingNew(false);
                    swal("Add course", "Course added!", "success", {
                        button: false,
                        timer: 2000,
                    })
                        .then((response) => {
                            setAddNow(false)
                        });
                }
            })
            .catch(function (error) {
                setSavingNew(false);
                setAddNow(false);
                swal("Add course", "An error occured while adding !", "error", {
                    button: false,
                    timer: 2000,
                });
            });
    }

    // delete course on index page 
    const deleteCourse = (id) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-detail/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "id": id,
                "course_id": id,
            }
        };
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this course!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Deleting...", {
                        icon: 'info',
                        timer: 2000,
                        button: false
                    });
                    axios(config)
                        .then(function (response) {
                            swal("Delete Course", "Course deleted!", "success", {
                                button: false,
                                timer: 2000,
                            });
                            getMyPrograms();
                        })
                        .catch(function (error) {
                            swal("Delete Course", "Courses containing contents cannot be deleted!", "error", {
                                button: false,
                                timer: 3000,
                            });
                        });
                } else {
                    swal("Cancelled by user", {
                        icon: 'info',
                        timer: 2000
                    });
                }
            });
    }
    // start new course on index page ends 

    const toggleAddSection = () => {
        if (addSection) {
            setAddSection(false)
        } else {
            setAddSection(true)
        }
        setNewLes(false);
        setNewSub(false)
    }

    const sectionCount = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-section/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                id: id
            }
        };

        axios(config)
            .then(function (response) {
                setPrograms(response.data);
                setProgramCount(response.data.length);
            })
            .catch(function (error) {
                setLoadingMessage('Error acquiring data. Please reload page');
            });
    }

    const toggleAddSubsSection = (id) => {
        if (!newSub) {
            // setNextSub(detail.getSubPosition());
            setNewSub(true);
        } else {
            setNewSub(false)
            setNextSub('');
        }
        setNewLes(false);
        setAddSection(false);
    }

    const toggleAddLesson = (id) => {
        setNewSub(false)
        setAddSection(false);
        if (!newLes) {
            setNewLes(true);
        } else {
            setNewLes(false);
        }
    }

    const sectionSpecs = () => {
        if (addSection) {
            return '0' + (detail.sectionCount + 1);
        } else {
            return '';
        }
    }

    const subSectionSpecs = () => {
        if (newSub) {
            return 'newSub'
        } else {
            return '';
        }
    }

    const enterEdit = (role, program_id) => {
        window.localStorage.setItem('role', role)
        navigate(`/authoring/edit/basic/${program_id}`);
    }

    useEffect(() => {
        setAddSection(false)
    }, [location])


    return (
        <NewContext.Provider value={{ enterEdit, newLes, nextLes, subSectionSpecs, setNextLes, sectionSpecs, addSection, newSub, nextSub, toggleAddLesson, toggleAddSubsSection, setAddSection, savingNew, setSavingNew, toggleAddSection, sectionCount, getMyPrograms, programs, programCount, startNewCourse, deleteCourse, addNow, newCourseName, newCourseCode, setNewCourseName, setNewCourseCode, addNew, loadingMessage }}>
            {children}
        </NewContext.Provider>
    )
}

export const useNew = () => {
    return useContext(NewContext);
}
