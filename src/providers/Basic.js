import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";

const BasicContext = createContext(null);

export const Basic = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
    const [courseDetails, setCourseDetails] = useState([]);
    const [courseCode, setCourseCode] = useState([]);
    const [courseName, setCourseName] = useState([]);
    const [institution, setInstitution] = useState([]);
    const [courseDescription, setCourseDescription] = useState([]);
    const [overview, setOverview] = useState([]);
    const [IntroImage, setIntroImage] = useState(null);
    const [IntroVid, setIntroVid] = useState('');
    const [releaseDate, setReleaseDate] = useState('01/01/2023');

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
                    setCourseCode(response.data[0].code);
                    setCourseName(response.data[0].name);
                    setInstitution(response.data[0].institution_id);
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
                }
            })
    }

    const processBasicForm = (e) => {
        e.preventDefault();
    }

    return (
        <BasicContext.Provider value={{ getCourse, courseDetails, IntroImage, IntroVid, releaseDate, setCourseDetails, processBasicForm, courseCode, setCourseCode, courseName, setCourseName, institution, setInstitution, courseDescription, setCourseDescription, overview, setOverview }}>
            {children}
        </BasicContext.Provider>
    )
}

export const useBasic = () => {
    return useContext(BasicContext); 
}
