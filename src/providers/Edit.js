import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDetail } from "./Detail";
import swal from "sweetalert";
import { useBasic } from "./Basic";

const EditContext = createContext(null);

export const Edit = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const detail = useDetail();
    const basic = useBasic();
    const id = window.localStorage.getItem('id');
    const [isEdit, setIsEdit] = useState(false);
    const [contentEdit, setContentEdit] = useState(false);
    const [activeEdit, setActiveEdit] = useState();
    const [editing, setEditing] = useState('');
    const [courseTab, setCourseTab] = useState('basic');
    const [readOnly, setReadOnly] = useState(true);
    const courseStatus = 'Draft';
    const [courseRole, setCourseRole] = useState('');
    const [unsaved, setUnsaved] = useState(false);

    const roleFit = () => {

    }

    const toggleEdit = (page) => {
        if (isEdit) {
            if (unsaved) {
                swal({
                    title: "Cancel Editing",
                    text: "All unsaved changes will be gone, do you want to proceed?",
                    icon: "warning",
                    buttons: ['Continue Editing', 'Cancel Editing'],
                    dangerMode: true,
                }).then((willCancel) => {
                    if (willCancel) {
                        setIsEdit(false);
                        setActiveEdit('');
                        setReadOnly(true);
                        detail.setEditContent(false)
                        detail.setReadOnly(true);
                    } else {
                        return false;
                    }
                })
            } else {
                setIsEdit(false);
                setActiveEdit('');
                setReadOnly(true);
                detail.setEditContent(false)
                detail.setReadOnly(true)
            }
        } else {
            setIsEdit(true);
            setActiveEdit(page);
            setReadOnly(false);
        }
    }

    const toggleContentEdit = (id) => {
        if (isEdit) {
            if (editing === id) {
                setEditing('');
            } else {
                setEditing(id);
            }
        } else {
            swal({
                title: "Course Content",
                text: "Page is not editing!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
        }
    }

    const goToTab = (tabname, id) => {
        if (isEdit) {
            if (unsaved) {
                swal({
                    title: "Cancel Editing?",
                    text: "All unsaved changes will be gone, do you want to proceed?",
                    icon: "warning",
                    buttons: ['Continue Editing', 'Cancel Editing'],
                    dangerMode: true,
                }).then((willCancel) => {
                    if (willCancel) {
                        setIsEdit(false);
                        setActiveEdit('');
                        setReadOnly(true);
                        detail.setEditContent(false)
                        detail.setReadOnly(true)
                        navigate(`/authoring/edit/${tabname}/${id}`);
                        setCourseTab(tabname);
                        setUnsaved(false);
                    } else {
                        return false;
                    }
                })
            } else {
                setIsEdit(false);
                setActiveEdit('');
                setReadOnly(true);
                detail.setEditContent(false)
                detail.setReadOnly(true)
                navigate(`/authoring/edit/${tabname}/${id}`);
                setCourseTab(tabname);
                setUnsaved(false)
            }
        } else {
            navigate(`/authoring/edit/${tabname}/${id}`);
            setCourseTab(tabname);
            setUnsaved(false)
        }
    }

    const checkRole = () => {
        if (window.localStorage.getItem('role')) {
            setCourseRole(window.localStorage.getItem('role'));
        } else {
            setCourseRole('');
        }
    }

    useEffect(() => {
        setIsEdit(false)
        setActiveEdit('');
        setReadOnly(true);
        setContentEdit(false);
        setCourseTab(location.pathname.split('/')[3]);
        checkRole()
        return () => {
            return true;
        }
    }, [location.key]);

    const [disableGradingEdit, setDisableGradingEdit] = useState('');
    const [rowToEdit, setRowToEdit] = useState('');

    const gradingEditCheck = () => {
        var role = window.localStorage.getItem('role');
        if ((role === 'Reader')) {
            setDisableGradingEdit(true);
        } else if ((role === 'Author')) {
            setDisableGradingEdit(true)
        } else if ((role === 'Lead')) {
            setDisableGradingEdit(false)
            if (rowToEdit.length === 0) {
                setDisableGradingEdit(true)
            } else {
                setDisableGradingEdit(false)
            }
        } else {
            setDisableGradingEdit(false)
            if (rowToEdit.length === 0) {
                setDisableGradingEdit(true)
            } else {
                setDisableGradingEdit(false)
            }
        }
    }

    const verifyRow = (rowID) => {
        if (rowToEdit === rowID) {
            setRowToEdit('')
        } else {
            setRowToEdit(rowID)
        }
    }

    const [disableGradingNew, setDisableGradingNew] = useState(true);

    const gradingNewCheck = () => {
        var role = window.localStorage.getItem('role');
        if ((role === 'Reader')) {
            setDisableGradingNew(true);
        } else if ((role === 'Author')) {
            setDisableGradingNew(true)
        } else if ((role === 'Lead')) {
            setDisableGradingNew(false)
        } else {
            setDisableGradingNew(false)
        }
    }
    useEffect(() => {
        setUnsaved(false);
        setRowToEdit('')
    }, [location])

    
    useEffect(() => {
        setUnsaved(false);
    }, [detail.data])

    return (
        <EditContext.Provider value={{ rowToEdit, setRowToEdit, verifyRow, gradingNewCheck, disableGradingNew, gradingEditCheck, setDisableGradingEdit, disableGradingEdit, isEdit, unsaved, setUnsaved, toggleContentEdit, editing, contentEdit, courseRole, setCourseRole, setReadOnly, setIsEdit, setActiveEdit, toggleEdit, activeEdit, courseTab, setCourseTab, goToTab, courseStatus, readOnly, }}>
            {children}
        </EditContext.Provider>
    )
}

export const useEdit = () => {
    return useContext(EditContext);
}
