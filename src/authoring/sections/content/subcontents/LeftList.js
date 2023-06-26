import React, { useEffect } from 'react'
import { useDetail } from '../../../../providers/Detail'
import { useParams } from 'react-router-dom';

const LeftList = () => {
    let { id } = useParams();
    const detail = useDetail();

    useEffect(() => {
      detail.getDetails(id)
    
      return () => {
        return true;
      }
    }, [id])
    
    return (
        <>
            <div className='conMenu p-0 w-100 mb-5 mt-4'>
                <div className='rightStraight w-100 pt-2 pb-2'>
                    <ul className='no-list-style p-0 m-0 secMain w-100'>
                        {(detail.sections.length === 0) ? (
                            <>
                                {detail.gettingContent ? (
                                    <>
                                        <li style={{ padding: '0' }}>
                                            <span className='activeTab w-100 d-flex alignCenter p-1 justify-content-center'>
                                                <span>
                                                    <span className='fa fa-spinner fa-spin' style={{ marginRight: '10px' }}></span>
                                                    Fetching sections
                                                </span>
                                            </span>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        {detail.contentError ? (
                                            <>
                                                <li style={{ padding: '0' }}>
                                                    <span className='activeTab w-100 d-flex alignCenter p-1 justify-content-center'>
                                                        <span className='fa fa-exclamation-triangle fa-2x text-danger' style={{ marginRight: '20px' }}></span>
                                                        <span>
                                                            Error fetching sections, <br />Please reload page!
                                                        </span>
                                                    </span>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                {detail.sectionCount === 0 ? (
                                                    <li style={{ padding: '0' }}>
                                                        <span className='activeTab w-100 d-flex alignCenter p-1 justify-content-center'>
                                                            <span className='fa fa-exclamation text-danger' style={{ marginRight: '20px' }}></span>
                                                            <span>
                                                                There are no sections!
                                                            </span>
                                                        </span>
                                                    </li>
                                                ) : null}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {(detail.sections.map((eachSection) => (
                                    <li id={eachSection.id} key={eachSection.id} style={{ padding: '0' }}>
                                        <span className={`${((detail.viewing === eachSection.id) && (detail.activeSub === "") && (detail.activeLesson === "")) ? 'activeTab' : ''} w-100 d-flex alignCenter p-1`} onClick={e => { detail.toggleView(eachSection.id, eachSection, eachSection.position_id); detail.setActiveWork(eachSection.id) }} >
                                            <span className='leftIds'>
                                                {eachSection.position_id}
                                            </span>
                                            <span className={`fa mr-15 ${(detail.viewing === eachSection.id) ? 'fa-caret-down' : 'fa-caret-right'}`}></span>
                                            <span>
                                                {eachSection.title}
                                            </span>
                                        </span>
                                        <ul className={`${(detail.viewing === eachSection.id) ? 'd-block' : 'd-none'} no-list-style pl-20`} >
                                            {(eachSection.subsections.map((subSection) => (
                                                <li id={subSection.id} key={subSection.id} style={{ padding: '0' }}>
                                                    <span className={`${((detail.activeSub === subSection.id) && (detail.activeLesson === "")) ? 'activeTab' : ''} w-100 d-flex alignCenter p-1`} onClick={e => { detail.toggleActiveSub(subSection.id, eachSection.id, subSection, eachSection, eachSection.position_id, subSection.position_id); detail.setActiveWork(subSection.id) }}>
                                                        <span className='leftIds'>
                                                            {subSection.position_id}
                                                        </span>
                                                        <span className={`fa mr-15 ${(detail.activeSub === subSection.id) ? 'fa-caret-down' : 'fa-caret-right'}`}></span>
                                                        <span>
                                                            {subSection.title}
                                                        </span>
                                                    </span>
                                                    <ul className={`${(detail.activeSub === subSection.id) ? 'd-block' : 'd-none'} no-list-style pl-20`} >
                                                        {(subSection.lessons.map((lesson) => (
                                                            <li id={lesson.id} key={lesson.id} style={{ padding: '0' }}>
                                                                <span className='leftIds' onClick={e => detail.toggleActiveLesson(lesson.id, lesson)}>
                                                                    {lesson.position_id}
                                                                </span>
                                                                <span className={`${(detail.activeLesson === lesson.id) ? 'activeTab' : ''} w-100 d-flex alignCenter p-1`} onClick={e => { detail.toggleActiveLesson(lesson.id, lesson); detail.setActiveWork(lesson.id) }}>
                                                                    <span>
                                                                        {lesson.title}
                                                                    </span>
                                                                </span>
                                                            </li>
                                                        )))}
                                                    </ul>
                                                </li>
                                            )))}
                                        </ul>
                                    </li>
                                )))}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default LeftList