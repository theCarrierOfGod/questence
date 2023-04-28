import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const Auth = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const userName = window.localStorage.getItem('username');
    const token = window.localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
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

    const logUserIn = () => {
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://tqfe-develop.herokuapp.com/cs/instructor-login/`,
            data: {
                "username": "instructorone",
                "password": "QI200901"
            },
            headers: {
                'Authorization': 'token b7dde8e9489fcfeb60a8df584f07eec2b56cb19c6f6a98773705775e659da5fd'
            }
        };

        axios(config)
            .then(function (response) {
                storeActiveToken(response.data.user.username, response.data.token);
                navigate('/');
            })
            .catch(function (error) {
                // console.log(error);
                alert(error.data)
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

    useEffect(() => {
        checkIfLoggedIn();
        sessionExpired();
        return () => {

        }
    }, [location.key])

    return (
        <AuthContext.Provider value={{ userName, token, isLoggedIn, logUserIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}