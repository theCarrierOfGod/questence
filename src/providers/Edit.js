import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDetail } from "./Detail";

const EditContext = createContext(null);

export const Edit = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const detail = useDetail();
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
            detail.setEditContent(false)
            detail.setReadOnly(true)
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
        navigate(`/edit/${tabname}/${id}`);
        setCourseTab(tabname);
    }

    useEffect(() => {
        setIsEdit(false);
        setContentEdit(false);
        setActiveEdit('');
        setReadOnly(true);
        setCourseTab(location.pathname.split('/')[2]);
    }, [location.key]);

    return (
        <EditContext.Provider value={{ isEdit, toggleContentEdit, editing, contentEdit, setReadOnly, setIsEdit, setActiveEdit, toggleEdit, activeEdit, courseTab, setCourseTab, goToTab, courseStatus, readOnly, }}>
            {children}
        </EditContext.Provider>
    )
}

export const useEdit = () => {
    return useContext(EditContext);
}
