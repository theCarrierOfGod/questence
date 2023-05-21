import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";
import { useEdit } from "./Edit";
import { NotificationManager } from "react-notifications";

const BasicContext = createContext(null);

export const Basic = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
    const edit = useEdit();
    let { id } = useParams();
    const [courseDetails, setCourseDetails] = useState([]);
    const [courseCode, setCourseCode] = useState([]);
    const [courseName, setCourseName] = useState([]);
    const [institutionID, setInstitutionID] = useState([]);
    const [institutionName, setInstitutionName] = useState([]);
    const [courseDescription, setCourseDescription] = useState([]);
    const [overview, setOverview] = useState([]);
    const [IntroImage, setIntroImage] = useState(null);
    const [IntroVid, setIntroVid] = useState('');
    const [keywords, setKeywords] = useState('');
    const [releaseDate, setReleaseDate] = useState('01/01/2023');
    const [enrollmentType, setEnrollmentType] = useState('');
    const [level, setLevel] = useState('');
    const [language, setLanguage] = useState('');
    const [coursePacing, setCoursePacing] = useState('');
    const [entranceExamRequired, setEntranceExamRequired] = useState('');
    const [subjectID, setSubjectID] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectArray, setSubjectArray] = useState([]);
    const [institutionArray, setInstitutionArray] = useState([])


    const [imageLink, setImageLink] = useState('');
    const [videoLink, setVideoLink] = useState('');

    useEffect(() => {
        setCourseDetails([]);
        setCourseCode('')
        setCourseName('')
        setInstitutionID('')
        setCourseDescription('')
        setOverview('')
        setIntroImage(null);
        setIntroVid('');
        setKeywords('');
        setReleaseDate('01/01/2023');
        setEnrollmentType('');
        setLevel('');
        setLanguage('');
        setCoursePacing('');
        setEntranceExamRequired('');
        setSubjectID('')
    }, [id])

    const getCourse = (id) => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-detail/${id}`,
            headers: {
                'Authorization': auth.token,
                'Content-Type': 'application/json'
            }
        };

        axios(config)
            .then(function (response) {
                if (response.detail) {
                    alert(response.detail);
                } else {
                    setCourseDetails(response.data[0]);
                    if (response.data[0].code === null) {
                        setCourseCode('');
                    } else {
                        setCourseCode(response.data[0].code);
                    }

                    if (response.data[0].name === null) {
                        setCourseName('');
                    } else {
                        setCourseName(response.data[0].name);
                    }

                    
                    if (response.data[0].short_description === null) {
                        setInstitutionID('');
                        setInstitutionArray([])
                    } else {
                        setInstitutionID(response.data[0].institution_id.id);
                        setInstitutionArray(response.data[0].institution_id)
                    }
                    setInstitutionName(response.data[0].institution_id);
                    if (response.data[0].short_description === null) {
                        setCourseDescription('');
                    } else {
                        setCourseDescription(response.data[0].short_description);
                    }
                    if (response.data[0].overview === null) {
                        setOverview('');
                    } else {
                        setOverview(response.data[0].overview);
                    }
                    // setReleaseDate(response.data[0].intro_video);
                    setEnrollmentType(response.data[0].enrollment_type);
                    setLevel(response.data[0].level)
                    setLanguage(response.data[0].language)
                    setCoursePacing(response.data[0].course_pacing)
                    setEntranceExamRequired(response.data[0].entrance_exam_required)
                    setSubjectID(response.data[0].subject_id.id)
                    setSubjectArray(response.data[0].subject_id);
                    setSubjectName(response.data[0].subject_id.subject_group_id.id)
                    setVideoLink(response.data[0].intro_video);
                    setImageLink(response.data[0].card_image);
                }
            })
    }

    const processBasicForm = (e) => {
        e.preventDefault();
    }

    const handleSubmit = (id) => {
        edit.toggleEdit('basic');
        NotificationManager.info('Saving...', 'Basic tab', 3000)

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-detail/`,
            data: {
                "id": id,
                "code": courseCode.toUpperCase(),
                "name": courseName.toUpperCase(),
                "subject_id": subjectID,
                "short_description": courseDescription,
                "overview": overview,
                "institution_id": institutionID,
                "level": level,
                "keywords": keywords,
                "language": language,
                "entrance_exam_required": entranceExamRequired,
                "enrollment_type": enrollmentType,
            },
            headers: {
                'Authorization': auth.token
            }
        };

        axios(config)
            .then(function (response) {
                edit.setReadOnly(false);
                edit.setIsEdit(false);
                edit.setActiveEdit('');
                if (response.data.id) {
                    NotificationManager.success('Saved', 'Basic tab', 3000)
                    getCourse(id);
                    // NotificationManager.success(message, title, timeOut, callback, priority);
                }
            })
            .catch(function (error) {
                NotificationManager.error('Input the right data into all fields', 'Basic tab', 3000);
                edit.setReadOnly(false);
                edit.setIsEdit(false);
                edit.setActiveEdit('');
            });
    }

    const saveMedia = (id) => {
        edit.toggleEdit('media');
        NotificationManager.info('Saving...', 'Media tab', 3000)

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-detail/`,
            data: {
                "id": id,
                'card_image': imageLink,
                'intro_video': videoLink
            },
            headers: {
                'Authorization': auth.token
            }
        };

        axios(config)
            .then(function (response) {
                edit.setReadOnly(false);
                edit.setIsEdit(false);
                edit.setActiveEdit('');
                if (response.data.id) {
                    NotificationManager.success('Saved', 'Media tab', 3000)
                    getCourse(id);
                    // NotificationManager.success(message, title, timeOut, callback, priority);
                }
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'Media tab', 3000);
                edit.setReadOnly(false);
                edit.setIsEdit(false);
                edit.setActiveEdit('');
            });
    }

    const saveTeam = () => {

    }

    return (
        <BasicContext.Provider value={{ subjectID, saveTeam, institutionArray, setInstitutionArray, subjectArray, setSubjectArray, setSubjectID, handleSubmit, saveMedia, videoLink, setVideoLink, imageLink, setImageLink, subjectName, setSubjectName, entranceExamRequired, setEntranceExamRequired, language, setLanguage, coursePacing, setCoursePacing, enrollmentType, setEnrollmentType, level, setLevel, getCourse, courseDetails, IntroImage, IntroVid, releaseDate, setCourseDetails, keywords, setKeywords, processBasicForm, courseCode, setCourseCode, courseName, setCourseName, institutionName, setInstitutionName, institutionID, setInstitutionID, courseDescription, setCourseDescription, overview, setOverview }}>
            {children}
        </BasicContext.Provider>
    )
}

export const useBasic = () => {
    return useContext(BasicContext);
}
