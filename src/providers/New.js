import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";
import { useDetail } from "./Detail";
import { useLocation } from 'react-router-dom';

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
                "code": newCourseCode,
                "name": newCourseName
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
            console.log(id)

            axios(config)
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            return false;
        }
    }
    // start new course on index page ends 

    const toggleAddSection = () => {
        if (addSection)
            setAddSection(false)
        else
            setAddSection(true)
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
        if(!newSub) {
            setNextSub(detail.getSubPosition());
            setNewSub(true);
        } else {
            setNewSub(false)
            setNextSub('');
        }
    }

    const toggleAddLesson = (id) => {
        if(!newLes) {
            setNextLes(detail.getLesPosition());
            setNewLes(true);
        } else {
            setNewLes(false)
            setNextLes('');
        }
    }
    

    return (
        <NewContext.Provider value={{ newLes, nextLes, addSection, newSub, nextSub, toggleAddLesson, toggleAddSubsSection, setAddSection, toggleAddSection, sectionCount, getMyPrograms, programs, programCount, startNewCourse, deleteCourse, addNow, newCourseName, newCourseCode, setNewCourseName, setNewCourseCode, addNew, loadingMessage }}>
            {children}
        </NewContext.Provider>
    )
}

export const useNew = () => {
    return useContext(NewContext);
}
