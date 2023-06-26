import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";
import { useEdit } from "./Edit";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

const BasicContext = createContext(null);

export const Basic = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
    const edit = useEdit();
    const location = useLocation();
    const id = window.localStorage.getItem('id');
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
    const [subjectGroupName, setSubjectGroupName] = useState([]);
    const [institutionArray, setInstitutionArray] = useState([])
    const [imageLink, setImageLink] = useState('');
    const [videoLink, setVideoLink] = useState('');

    const [team, setTeam] = useState([]);
    const [teamEmail, setTeamEmail] = useState('');
    const [teamRole, setTeamRole] = useState('');

    const [teamSet, setTeamset] = useState(false);
    const [courseSet, setCourseSet] = useState(false);

    const [disableBasicEdit, setDisableBasicEdit] = useState('');

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

        return () => {
            return true;
        }
    }, [id]);

    const canEditBasic = (role) => {
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

    const getCourse = (id) => {
        let config = {
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
                    // Course code 
                    if (response.data[0].code === null) {
                        setCourseCode('');
                    } else {
                        setCourseCode(response.data[0].code);
                    }

                    // Course name 
                    if (response.data[0].name === null) {
                        setCourseName('');
                    } else {
                        setCourseName(response.data[0].name);
                    }

                    // Institution ID and Name 
                    if (response.data[0].institution_id === null) {
                        setInstitutionID('');
                    } else {
                        setInstitutionID(response.data[0].institution_id.id);
                    }
                    setInstitutionName(response.data[0].institution_id);

                    // Subject ID and Name 
                    if (response.data[0].subject_id === null) {
                        setSubjectID('')
                        setSubjectName('');
                        setSubjectGroupName('')
                        setSubjectArray([])
                    } else {
                        setSubjectName(response.data[0].subject_id.subject_name)
                        setSubjectID(response.data[0].subject_id.id)
                        setSubjectArray(response.data[0].subject_id)
                        setSubjectGroupName(response.data[0].subject_id.subject_group_id.id)
                    }

                    // Course description 
                    if (response.data[0].short_description === null) {
                        setCourseDescription('');
                    } else {
                        setCourseDescription(response.data[0].short_description);
                    }

                    // Course Overview 
                    if (response.data[0].overview === null) {
                        setOverview('');
                    } else {
                        setOverview(response.data[0].overview);
                    }

                    setEnrollmentType(response.data[0].enrollment_source);
                    setLevel(response.data[0].level)
                    setLanguage(response.data[0].language)
                    setCoursePacing(response.data[0].course_pacing)
                    setEntranceExamRequired(response.data[0].entrance_exam_required)
                    setVideoLink(response.data[0].intro_video);
                    setImageLink(response.data[0].card_image);
                }
            })
    }

    const handleSubmit = (id) => {
        edit.toggleEdit('basic');
        swal({
            title: 'Basic Tab',
            text: 'Saving...',
            icon: 'info',
            button: false,
            timer: '3000'
        })

        let config = {
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
                'card_image': imageLink,
                'intro_video': videoLink,
                "course_pacing": coursePacing
            },
            headers: {
                'Authorization': auth.token
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    swal({
                        title: 'Basic Tab',
                        text: 'Saved!',
                        icon: 'success',
                        button: false,
                        timer: '3000'
                    })
                    getCourse(id);
                    edit.setUnsaved(false)
                }
            })
            .catch(function (error) {
                swal({
                    title: 'Basic Tab',
                    text: 'Some required fields are missing!',
                    icon: 'error',
                    button: false,
                    timer: '3000',
                    dangerMode: true
                })
            });
    }

    const myTeam = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-team/${id}`,
            headers: {
                'Authorization': auth.token,
                'Content-Type': 'application/json'
            }
        };

        axios(config)
            .then(function (response) {
                setTeam(response.data)
            });

    }

    const addNewRole = (event) => {
        event.preventDefault();
        swal({
            title: "Course Team",
            timer: 2000
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-team/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "course_id": id,
                "email": teamEmail,
                "role": teamRole,
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {

                } else {
                    // NotificationManager.error(response.data.detail, 'Team member', 5000);
                }
            })
            .catch(function (error) {
                // NotificationManager.error(error.message, 'Team member', 6000);
            });
    }

    useEffect(() => {
        if (window.localStorage.getItem('id')) {
            if (!teamSet) {
                myTeam(id);
            }
            if (!courseSet) {
                getCourse(id);
            }
        }

        return () => {
            return false;
        }
    }, [id]);

    return (
        <BasicContext.Provider value={{ canEditBasic, disableBasicEdit, teamEmail, teamRole, setTeamEmail, setTeamRole, addNewRole, myTeam, team, setTeam, subjectGroupName, subjectID, institutionArray, setInstitutionArray, subjectArray, setSubjectArray, setSubjectID, handleSubmit, videoLink, setVideoLink, imageLink, setImageLink, subjectName, setSubjectName, entranceExamRequired, setEntranceExamRequired, language, setLanguage, coursePacing, setCoursePacing, enrollmentType, setEnrollmentType, level, setLevel, getCourse, courseDetails, IntroImage, IntroVid, releaseDate, setCourseDetails, keywords, setKeywords, courseCode, setCourseCode, courseName, setCourseName, institutionName, setInstitutionName, institutionID, setInstitutionID, courseDescription, setCourseDescription, overview, setOverview }}>
            {children}
        </BasicContext.Provider>
    )
}

export const useBasic = () => {
    return useContext(BasicContext);
}
