import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./Auth";
import { useHook } from "./Hook";
import { useParams } from "react-router-dom";

const DetailContext = createContext(null);

export const Detail = ({ children }) => {
    const hook = useHook();
    const auth = useAuth();
    let { id } = useParams();
    const [sectionCount, setSectionCount] = useState(0);
    const [sections, setSections] = useState([]);

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

        axios(config)
            .then(function (response) {
                if (response.detail) {
                    alert(response.detail);
                } else {
                    setSectionCount(response.data[0].sections.length);
                    setSections(response.data[0].sections);
                }
            })
    }


    return (
        <DetailContext.Provider value={{ getDetails, sectionCount, sections }}>
            {children}
        </DetailContext.Provider>
    )
}

export const useDetail = () => {
    return useContext(DetailContext);
}
