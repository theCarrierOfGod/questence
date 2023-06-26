import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";

const SubContentContext = createContext(null);

export const SubContent = ({ children }) => {

    const hook = useHook();
    const auth = useAuth();
    const navigate = useNavigate();

    const [sections, setSections] = useState([]);
    const [gettingContent, setGettingContent] = useState(true);
    const [contentError, setContentError] = useState(false); 

    const getContent = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/content-detail/${id}/`,
            headers: {
                'Authorization': auth.token
            }
        };
        setGettingContent(true);
        axios(config)
            .then(function (response) {
                setSections(response.data);
                setGettingContent(false);
                setContentError(false)
            })
            .catch(function (error) {
                setGettingContent(false);
                setContentError(true)
            });
    }

    return (
        <SubContentContext.Provider value={{ getContent, sections, contentError, gettingContent }}>
            {children}
        </SubContentContext.Provider>
    )
}

export const useSubContent = () => {
    return useContext(SubContentContext);
}