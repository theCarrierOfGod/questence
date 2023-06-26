import axios from "axios";
import React, { createContext, useContext } from "react";

const RoleContext = createContext(null);

export const Role = ({ children }) => {

    const myRole = (id) => {

    }

    return (
        <RoleContext.Provider value={{ myRole }}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRole = () => {
    return useContext(RoleContext);
}