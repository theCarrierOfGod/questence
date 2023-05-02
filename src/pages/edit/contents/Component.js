import React, { useEffect, useRef, useState } from 'react'
import { useDetail } from '../../../providers/Detail'
import { useLocation } from 'react-router-dom';
import { Input } from './Input';

const Component = (props) => {
    const detail = useDetail();
    const location = useLocation();
    const [seeMore, setSeeMore] = useState('');

    useEffect(() => {
    }, [location])
    return (
        <>
            {props.data.map((comp) => (
                <Input data={comp} key={comp.id} />
            ))}
        </>
    )
}

export default Component