import React, { useState } from 'react';
import { useDetail } from '../../../../providers/Detail';
import Lesson from './Lesson';
import Section from './Section';
import Subsection from './Subsection';

const RightContent = (props) => {
    const detail = useDetail();
    return (
        <div className='mt-4'>
            {(props.title === 'Lesson') ? (
                <>
                    <Lesson data={props.data} />
                </>
            ) : null}

            {(props.title === 'Sub-section') ? (
                <>
                    <Subsection data={props.data} />
                </>
            ) : null}

            {(props.title === 'Section') ? (
                <>
                    <Section data={props.data} />
                </>
            ) : null}

            {(props.title === '') ? (
                <>
                    <h5>
                        Please select a section.
                    </h5>
                </>
            ) : null}
        </div>
    )
}

export default RightContent