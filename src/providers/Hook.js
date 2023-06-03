import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HookContext = createContext(null);

export const Hook = ({ children }) => {

    const Navigate = useNavigate();
    const api = "https://tqfe-develop.herokuapp.com";
    const [courseTab, setCourseTab] = useState('basic');
    const [rightTab, setRightTab] = useState(false);
    const [contLess, setContLess] = useState(false);
    const [current, setCurrent] = useState();
    const location = useLocation();

    const goHome = () => {
        Navigate('/');
    }

    const changeCurrent = (id) => {
        setCurrent(id)
    }

    const toggleRight = () => {
        if (rightTab) {
            setRightTab(false)
        } else {
            setRightTab(true)
        }
    }

    const showLesson = (num) => {
        if (contLess) {
            setContLess(false);
        } else {
            setContLess(true);
        }
    }

    const editTab = () => {
        return courseTab;
    }

    useEffect(() => {
        
        return () => {
            setRightTab(false)
        };
    }, [location]);

    return (
        <HookContext.Provider value={{ api, goHome, editTab, changeCurrent, current, toggleRight, contLess, showLesson, rightTab, courseTab, setCourseTab }}>
            {children}
        </HookContext.Provider>
    )
}

export const useHook = () => {
    return useContext(HookContext);
}
