import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHook } from "./Hook";
import swal from "sweetalert";

const AuthContext = createContext(null);

export const Auth = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const hook = useHook();
    const id = window.localStorage.getItem('id');
    const userName = window.localStorage.getItem('username');
    const token = window.localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [componentOptions, setComponentOptions] = useState([]);
    const [htmlOptions, setHtmlOptions] = useState([]);
    const [subjectGroup, setSubjectGroup] = useState([]);
    const [languageChoices, setLanguageChoices] = useState([]);
    const [levelChoices, setLevelChoices] = useState([]);
    const [enrollmentChoices, setEnrollmentChoices] = useState([]);
    const [videosOptions, setVideoOptions] = useState([]);
    const [exerciseOptions, setExerciseOptions] = useState([]);
    const [institutions, setInstitutions] = useState([]);

    const checkIfLoggedIn = () => {
        if (window.localStorage.getItem('username')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }

    const storeActiveToken = (username, token) => {
        let timestamp = Date.now() + (1 * 12 * 60 * 60 * 1000);
        window.localStorage.setItem('token', "Token " + token);
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('timestamp', timestamp);
        checkIfLoggedIn();
    }

    const logOut = () => {
        window.localStorage.clear();
        navigate('/');
    }

    const logUserIn = (username, password) => {
        swal("Login", "Loggin in...", "info", {
            button: false,
            timer: 15000,
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://tqfe-develop.herokuapp.com/cs/instructor-login/`,
            data: {
                "username": username,
                "password": password
            },
            headers: {
                'Authorization': 'token b7dde8e9489fcfeb60a8df584f07eec2b56cb19c6f6a98773705775e659da5fd'
            }
        };

        axios(config)
            .then(function (response) {
                storeActiveToken(response.data.user.username, response.data.token);
                swal("Success!", "You have been logged in!", "success", {
                    button: false,
                    timer: 1000,
                });
                setTimeout(() => {
                    navigate('/')
                }, 1200);
            })
            .catch(function (error) {
                swal("Login", "An error occured while attempting to log you in!", "error", {
                    button: false,
                    timer: 3000,
                });
            });
    }

    const sessionExpired = () => {
        if (isLoggedIn) {
            // var OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000);
            var OneDay = window.localStorage.getItem('timestamp');
            let yourDate = Date.now();

            // let hours = moment().diff(moment(yourDateString), 'hours');
            // let days = moment().diff(moment(yourDateString), 'days');

            if (yourDate < OneDay) {
                // session still continues
            } else if (yourDate >= OneDay) {
                // The yourDate time is exactly/more than 12 hours from now
                logOut();
            }
        }
    }

    const getChoices = () => {
        if (window.localStorage.getItem('username')) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${hook.api}/i/choices/`,
                headers: {
                    'Authorization': token
                }
            };

            axios(config)
                .then(function (response) {
                    setComponentOptions(response.data.component_types_choices);
                    setHtmlOptions(response.data.html_choices);
                    setSubjectGroup(response.data.subject);
                    setLanguageChoices(response.data.language_choices);
                    setLevelChoices(response.data.level_choices);
                    setEnrollmentChoices(response.data.enrollment_source_choices);
                    setVideoOptions(response.data.video_choices);
                    setExerciseOptions(response.data.exercise_type_choices)
                    setInstitutions(response.data.institution)
                })
        }
    }
    

    useEffect(() => {
        checkIfLoggedIn();
        sessionExpired();
        if(institutions.length === 0) {
            getChoices();
        }
        return () => {
            return true;
        }
    }, [location]);

    return (
        <AuthContext.Provider value={{ id, userName, token, videosOptions, exerciseOptions, componentOptions, institutions, enrollmentChoices, levelChoices, subjectGroup, languageChoices, htmlOptions, getChoices, isLoggedIn, logUserIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}