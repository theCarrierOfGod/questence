import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditConContext = createContext(null);

export const EditCon = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = window.localStorage.getItem('id');
    const [isEdit, setIsEdit] = useState(false);
    const [contentEdit, setContentEdit] = useState(false);
    const [activeEdit, setActiveEdit] = useState();
    const [editing, setEditing] = useState('');
    const [courseTab, setCourseTab] = useState('');
    const [readOnly, setReadOnly] = useState(true);
    const courseStatus = 'Draft';

    const toggleEdit = (page) => {
        if (isEdit) {
            setIsEdit(false);
            setActiveEdit('');
            setReadOnly(true);
        } else {
            setIsEdit(true);
            setActiveEdit(page);
            setReadOnly(false);
        }
    }

    const toggleContentEdit = (id) => {
        if (isEdit) {
            if (editing === id) {
                setEditing('')
            } else {
                setEditing(id)
            }
        } else {
            alert('Page is not editing!')
        }
    }

    const goToTab = (tabname, id) => {
        navigate(`/authoring/edit/${tabname}/${id}`);
        setCourseTab(tabname);
    }

    const [section, setSection] = useState(false);
    const [subsection, setSubsection] = useState(false);

    const toggleSection = () => {
        if (section) {
            setSection(false);
            setSubsection(false);
        } else {
            setSection(true);
        }
    }

    const toggleSubSection = () => {
        if (subsection) {
            setSubsection(false);
        } else {
            setSubsection(true);
        }
    } 

    useEffect(() => {
        setIsEdit(false);
        setContentEdit(false);
        setActiveEdit('');
        setReadOnly(true);
        setCourseTab(location.pathname.split('/')[2]);
    }, [location.pathname]);

    return (
        <EditConContext.Provider value={{ isEdit, section, subsection, toggleSection, toggleSubSection, toggleContentEdit, editing, contentEdit, setReadOnly, setIsEdit, setActiveEdit, toggleEdit, activeEdit, courseTab, setCourseTab, goToTab, courseStatus, readOnly, }}>
            {children}
        </EditConContext.Provider>
    )
}

export const useEditCon = () => {
    return useContext(EditConContext);
}
