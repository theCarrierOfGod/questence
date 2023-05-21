import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";
import { useEdit } from "./Edit";
import { useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const DetailContext = createContext(null);

export const Detail = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
    const edit = useEdit();
    const location = useLocation();
    const [sectionCount, setSectionCount] = useState(0);
    const [sections, setSections] = useState([]);
    const [gettingContent, setGettingContent] = useState(true);
    const [contentError, setContentError] = useState(false);
    const [viewing, setViewing] = useState('');
    const [viewingID, setViewingID] = useState('');
    const [activeSub, setActiveSub] = useState('');
    const [subID, setSubID] = useState('');
    const [activeLesson, setActiveLesson] = useState('');
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [newForm, setNewForm] = useState(false);
    const [editContent, setEditContent] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    const [newLesson, setNewLesson] = useState(false);
    const [editComp, setEditComp] = useState(false);
    const [compReadOnly, setCompReadonly] = useState(true);
    const [activeComp, setActiveComp] = useState('');
    const [theComponents, setTheComponents] = useState([]);

    const [fetchingLesson, setFetchingLesson] = useState(false);

    const [sectionID, setSectionID] = useState('')
    const [sectionTitle, setSectionTitle] = useState('');
    const [sectionPositionID, setSectionPositionID] = useState('');
    const [sectionOverview, setSectionOverview] = useState('');
    const [sectionVisibility, setSectionVisibility] = useState();

    const [subsectionID, setSubsectionID] = useState('')
    const [subsectionTitle, setSubsectionTitle] = useState('');
    const [subsectionPositionID, setSubsectionPositionID] = useState('');
    const [subsectionOverview, setSubsectionOverview] = useState('')
    const [subsectionVisibility, setSubSectionVisibility] = useState();

    const [lessonID, setLessonID] = useState('')
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonPositionID, setLessonPositionID] = useState('');
    const [lessonVisibility, setLessonVisibility] = useState();

    useEffect(() => {
        setSectionCount(0)
        setSections([])
        setGettingContent(true)
        setContentError(false)
        setViewing('')
        setViewingID('')
        setActiveSub('')
        setSubID('')
        setActiveLesson('')
        setData([])
        setTitle('')
        setNewForm(false)
        return (data) => {

        }
    }, [location])

    const toggleView = (id, pass, vid) => {
        setViewing(id);
        setViewingID(vid)
        setData(pass);
        setTitle('Section');
        setActiveLesson('')
        setActiveSub('')
        if (viewing === id) {
            setViewing('');
            setViewingID('');
            setTitle('');
        }
    }

    const toggleActiveSub = (sub, sec, pass, older, vid, sid) => {
        if (activeSub === sub) {
            if (viewing === sec) {
                setTitle('Section');
            } else {
                setTitle('');
            }
            setViewingID(vid)
            setActiveSub('');
            setActiveLesson('');
            setData(older);
            setSubID(sid)
        } else {
            setViewingID(vid)
            setSubID(sid)
            setActiveSub(sub);
            setViewing(sec);
            setTitle('Sub-section');
            setData(pass);
            setActiveLesson('');
        }
    }

    const toggleActiveLesson = (less, lesson) => {
        setTitle('Lesson');
        setData(lesson);
        setActiveLesson(less);
    }

    const toggleNew = () => {
        if (edit.isEdit) {
            if (newForm) {
                setNewForm(false);
            } else {
                setNewForm(true);
            }
        }
    }

    const newSubSection = () => {

    }

    const getDetails = (id) => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/content-detail/${id}`,
            headers: {
                'Authorization': auth.token,
                'Content-Type': 'application/json'
            }
        };
        setGettingContent(true);

        axios(config)
            .then(function (response) {
                if (response.detail) {
                    alert(response.detail);
                    setGettingContent(false);
                    setContentError(true);
                    setSections([]);
                    setSectionCount(0)
                } else {
                    setSectionCount(response.data[0].sections.length);
                    setSections(response.data[0].sections);
                    setGettingContent(false);
                    setContentError(false)
                }
            })
            .catch(err => {
                setGettingContent(false);
                setContentError(true);
                setSections([]);
                setSectionCount(0)
            })
    }

    const getSubPosition = (secIn, secId) => {
        let now = "0" + (sections[secIn].subsections.length + 1);

        return secId + '.' + now;
    }

    const getLesPosition = (subArray, index, position_id) => {
        let now = "0" + (subArray[index].lessons.length + 1);
        return position_id + '.' + now;
    }

    const getComPosition = (lesArray, position_id) => {
        let now = "0" + (lesArray.components.length + 1);
        return position_id + '.' + now;
    }

    const editContentToogle = () => {
        if (!editContent) {
            setEditContent(true)
            setReadOnly(false)
            console.log(true)
        } else {
            setEditContent(false)
            setReadOnly(true)
            console.log(false)
        }
    }

    const toggleNewLesson = () => {
        if (newLesson) {
            setNewLesson(false);
        } else {
            setNewLesson(true);
        }
    }

    const toggleComponentEdit = (id) => {
        if (editComp) {
            if (activeComp === id) {
                setActiveComp('');
                setEditComp(false);
                setCompReadonly(true);
            } else {
                setActiveComp(id);
                setEditComp(true);
                setCompReadonly(false);
            }
        } else {
            setActiveComp(id);
            setEditComp(true);
            setCompReadonly(false);
        }

    }

    const lessonChanges = (id) => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-lesson/${id}/drill-down/`,
            headers: {
                'Authorization': auth.token,
                'Content-Type': 'application/json'
            }
        };
        setGettingContent(true);
        setFetchingLesson(true);

        axios(config)
            .then(function (response) {
                setData(response.data)
                setFetchingLesson(false);
            })
            .catch(err => {
                setGettingContent(false);
                setContentError(true);
                setSections([]);
                setSectionCount(0)
                setFetchingLesson(false);
            })
    }

    const getArray = (index) => {
        return sections[index].subsections;
    }

    const updateContent = (id) => {
        if (activeLesson !== '') {
            NotificationManager.info('Updating', 'Lesson', 6000);

            if (lessonPositionID === 0 || lessonTitle === 0) {
                NotificationManager.error('Please fill all required fields', 'Lesson', 5000)
                return false;
            }

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${hook.api}/i/course-lesson/`,
                headers: {
                    'Authorization': auth.token
                },
                data: {
                    "title": lessonTitle,
                    "id": lessonID,
                    "position_id": lessonPositionID,
                    "visible": lessonVisibility,
                }
            };

            axios(config)
                .then(function (response) {
                    if (response.data.id) {
                        NotificationManager.success('Updated', 'Lesson', 6000);
                        lessonChanges(lessonID)
                    } else {
                        NotificationManager.error(response.data.detail, 'Lesson', 5000)
                    }
                })
                .catch(function (error) {
                    NotificationManager.error(error.message, 'Lesson', 6000)
                });
        } else if (activeSub !== '') {
            NotificationManager.info('Updating', 'Subsection', 6000);

            if (subsectionOverview.length === 0 || subsectionPositionID === 0 || subsectionTitle === 0) {
                NotificationManager.error('Please fill all required fields', 'Subsection', 5000)
                return false;
            }

            var config = {
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
                        NotificationManager.success('Updated', 'Subsection', 6000);
                        getDetails(id);
                    } else {
                        NotificationManager.error(response.data.detail, 'Subsection', 5000)
                    }
                })
                .catch(function (error) {
                    NotificationManager.error(error.message, 'Subsection', 6000)
                });
        } else if (viewing !== '') {
            NotificationManager.info('Updating', 'Subsection', 6000);

            if (sectionOverview.length === 0 || sectionPositionID === 0 || sectionTitle === 0) {
                NotificationManager.error('Please fill all required fields', 'Subsection', 5000)
                return false;
            }
            var config = {
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
                        NotificationManager.success('Updated', 'Section', 6000);
                        getDetails(id);
                    } else {
                        NotificationManager.error(response.data.detail, 'Section', 5000)
                    }
                })
                .catch(function (error) {
                    NotificationManager.error(error.message, 'Section', 6000)
                });
        }
    }

    useEffect(() => {
        return () => {
            setNewLesson(false)
        }
    }, [location.key, data])


    return (
        <DetailContext.Provider
            value={{
                lessonID, setLessonID,
                lessonPositionID, setLessonPositionID,
                lessonVisibility, setLessonVisibility,
                lessonTitle, setLessonTitle,
                subsectionID, setSubsectionID,
                subsectionOverview, setSubsectionOverview,
                subsectionPositionID, setSubsectionPositionID,
                subsectionTitle, setSubsectionTitle,
                subsectionVisibility, setSubSectionVisibility,
                getArray, sectionID, setSectionID,
                sectionVisibility, setSectionVisibility,
                sectionPositionID, setSectionPositionID,
                sectionOverview, setSectionOverview,
                getComPosition, setSectionTitle, sectionTitle,
                updateContent, fetchingLesson, setEditContent, setReadOnly,
                lessonChanges, activeComp, toggleComponentEdit, editContent, editComp,
                compReadOnly, setData, readOnly, toggleNewLesson,
                editContentToogle, activeSub, subID, viewingID, getLesPosition,
                getSubPosition, activeLesson, viewing, data, title, toggleView,
                toggleActiveSub, toggleActiveLesson, toggleNew, newSubSection,
                newLesson, getDetails, sectionCount, sections,
                contentError, gettingContent
            }}>
            {children}
        </DetailContext.Provider>
    )
}

export const useDetail = () => {
    return useContext(DetailContext);
}
