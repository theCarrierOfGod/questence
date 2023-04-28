import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";
import { useParams } from "react-router-dom";
import { useEdit } from "./Edit";

const DetailContext = createContext(null);

export const Detail = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
    const edit = useEdit();
    let { id } = useParams();
    const [sectionCount, setSectionCount] = useState(0);
    const [sections, setSections] = useState([]);
    const [gettingContent, setGettingContent] = useState(true);
    const [contentError, setContentError] = useState(false);
    const [viewing, setViewing] = useState('');
    const [viewingID, setViewingID] = useState('');
    const [activeSub, setActiveSub] = useState('');
    const [subID, setSubID] = useState(0);
    const [activeLesson, setActiveLesson] = useState('');
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [newForm, setNewForm] = useState(false);

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

    const newLesson = () => {

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
                    setContentError(false)
                } else {
                    setSectionCount(response.data[0].sections.length);
                    setSections(response.data[0].sections);
                    setGettingContent(false);
                    setContentError(true)
                }
            })
    }

    const getSubPosition = () => {
        let act = viewingID - 1;
        let now = "0" + (sections[act].subsections.length + 1);

        return viewingID + '.' + now;
    }

    const getLesPosition = () => {
        let act = viewingID - 1;
        let sub = subID.split(".")[1] - 1;

        let now = "0" + (sections[act].subsections[sub].lessons.length + 1);
        return subID + '.' + now;
    }


    return (
        <DetailContext.Provider value={{ activeSub, subID, viewingID, getLesPosition, getSubPosition, activeLesson, viewing, data, title, toggleView, toggleActiveSub, toggleActiveLesson, toggleNew, newSubSection, newLesson, getDetails, sectionCount, sections, contentError, gettingContent }}>
            {children}
        </DetailContext.Provider>
    )
}

export const useDetail = () => {
    return useContext(DetailContext);
}
