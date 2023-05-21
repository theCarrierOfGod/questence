import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";
import { useDetail } from "./Detail";
import { useLocation } from 'react-router-dom';
import { NotificationManager } from "react-notifications";

const NewContext = createContext(null);

export const New = ({ children }) => {

    const auth = useAuth();
    const detail = useDetail();
    const hook = useHook();
    const location = useLocation();
    const [addNow, setAddNow] = useState(false);
    const [newCourseName, setNewCourseName] = useState(false);
    const [newCourseCode, setNewCourseCode] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [programCount, setProgramCount] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('Fetching data...');
    const [addSection, setAddSection] = useState(false);
    const [now, setNow] = useState('');
    const [nextSub, setNextSub] = useState(0);
    const [nextLes, setNextLes] = useState('');
    const [newSub, setNewSub] = useState(false);
    const [newLes, setNewLes] = useState(false);


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
        var config = {
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
        var config = {
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
                setAddNow(false);
                console.log(response)
            })
            .catch(function (error) {
                // console.log(error);
                setAddNow(false);
            });
    }

    const deleteCourse = (id) => {
        if (window.confirm("Are you sure you want to delete this course?") === true) {
            NotificationManager.info('Deleting', 'Course');
            var config = {
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

            axios(config)
                .then(function (response) {
                    console.log(response)
                    NotificationManager.success('Course deleted', 'Delete Course');
                    getMyPrograms();
                })
                .catch(function (error) {
                    console.log(error);
                    NotificationManager.error('You cannot delete a course with sections', 'Delete Course');
                });
        } else {
            return false;
        }
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
        var config = {
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

    useEffect(() => {
        setAddSection(false)
    }, [location])


    return (
        <NewContext.Provider value={{ newLes, nextLes, subSectionSpecs, sectionSpecs, addSection, newSub, nextSub, toggleAddLesson, toggleAddSubsSection, setAddSection, toggleAddSection, sectionCount, getMyPrograms, programs, programCount, startNewCourse, deleteCourse, addNow, newCourseName, newCourseCode, setNewCourseName, setNewCourseCode, addNew, loadingMessage }}>
            {children}
        </NewContext.Provider>
    )
}

export const useNew = () => {
    return useContext(NewContext);
}
