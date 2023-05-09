import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";

const BasicContext = createContext(null);

export const Basic = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
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

                    setInstitutionID(response.data[0].institution_id);
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
                    setIntroImage(response.data[0].card_image);
                    setIntroVid(response.data[0].intro_video);
                    setReleaseDate(response.data[0].intro_video);
                    setEnrollmentType(response.data[0].enrollment_type);
                    setLevel(response.data[0].level)
                    setLanguage(response.data[0].language)
                    setCoursePacing(response.data[0].course_pacing)
                    setEntranceExamRequired(response.data[0].entrance_exam_required)
                    setSubjectID(response.data[0].subject_id)
                }
            })
    }

    const processBasicForm = (e) => {
        e.preventDefault();
    }

    return (
        <BasicContext.Provider value={{ subjectID, setSubjectID, entranceExamRequired, setEntranceExamRequired, language, setLanguage, coursePacing, setCoursePacing, enrollmentType, setEnrollmentType, level, setLevel, getCourse, courseDetails, IntroImage, IntroVid, releaseDate, setCourseDetails, keywords, setKeywords, processBasicForm, courseCode, setCourseCode, courseName, setCourseName, institutionName, setInstitutionName, institutionID, setInstitutionID, courseDescription, setCourseDescription, overview, setOverview }}>
            {children}
        </BasicContext.Provider>
    )
}

export const useBasic = () => {
    return useContext(BasicContext);
}
