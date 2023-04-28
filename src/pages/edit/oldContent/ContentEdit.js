import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Nav from '../../components/nav/Nav'
import { useHook } from '../../providers/Hook'
import { useSubContent } from '../../providers/SubContent'
import StatusTab from './StatusTab'
import TabMenu from './TabMenu'
import './contentBox/style.css'
import { useState } from 'react'
import { useBasic } from '../../providers/Basic'
import { useEdit } from '../../providers/Edit'
import SectionForm from './contentBox/SectionForm'
import './content.css'
import { useEffect } from 'react'
import Footer from '../../components/footer/Footer'
import { useEditCon } from '../../providers/EditContent'
import 'jquery';
import bootbox from 'bootbox';

const ContentEdit = () => {
    const edit = useEdit();
    const subEdit = useEditCon();
    const conHook = useSubContent();
    const basic = useBasic();
    const { id } = useParams();
    const location = useLocation();
    const [contentResponse, setContentResponse] = useState([]);
    const [newForm, setNewForm] = useState(false);
    const [viewing, setViewing] = useState('');
    const [activeSub, setActiveSub] = useState('');
    const [activeLesson, setActiveLesson] = useState('');
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');

    const toggleView = (id, pass) => {
        setViewing(id);
        setData(pass);
        setTitle('Section');
        setActiveLesson('')
        setActiveSub('')
        if (viewing === id) {
            setViewing('')
        }
    }

    const toggleActiveSub = (sub, sec, pass, older) => {
        if (activeSub === sub) {
            if (viewing === sec) {
                setTitle('Section');
            } else {
                setTitle('');
            }
            setActiveSub('');
            setActiveLesson('');
            setData(older);
        } else {
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

    const editContents = () => {
        if(edit.isEdit) {
            subEdit.toggleEdit();
        } else {
            alert("You cannot edit this page without clicking the edit button above");
        }
    }

    useEffect(() => {
        conHook.getContent(id)
    }, [location]);

    return (
        <>
            {/* navigation bar */}
            <Nav />
            <br />
            {/* status, edit, back to dashboard and course preview tab */}
            <StatusTab />
            <br />
            {/* various course parts tab  */}
            <TabMenu />
            <br />
            <div className='container'>
                <div className='row'>
                    {/* Left side of the content page  */}
                    <div className='col-md-4'>
                        <div className='conMenu w-100 mb-3' style={{ display: 'inline-flex' }}>
                            <nav className='fg-1'>
                                <div className='d-flex'>
                                    <button className='menu-link'>
                                        New
                                    </button>
                                    <button className='menu-link' style={{ color: '#00798C' }} onClick={editContents}>
                                        Edit
                                    </button>
                                    <button className='menu-link' style={{ color: '#FF4040' }}>
                                        Delete
                                    </button>
                                </div>
                            </nav>
                            <div className='fg-0 d-flex' >
                                <Link className='menu-link'>
                                    Preview
                                </Link>
                                <Link className='menu-link' style={{ fontSize: '18px', fontWeight: 1000, padding: 0, lineHeight: '25px' }}>
                                    . . .
                                </Link>
                            </div>
                        </div>
                        <div className='conMenu p-0 w-100 mb-5'>
                            <div className='leftStraight pt-4 d-none'>
                                <ul className='no-list-style p-0 m-0 secMain' style={{ fontWeight: 'normal' }}>
                                    {conHook.sections.map((section) => (
                                        <>
                                            {(section.sections.map((eachSection) => (
                                                <li id={eachSection.id} key={eachSection.id} style={{ padding: 0, margin: 0 }}>
                                                    <span className={`w-100 d-flex alignCenter p-1`}>
                                                        <span>
                                                            {eachSection.position_id}
                                                        </span>
                                                    </span>
                                                    <ul className={`${(viewing === eachSection.id) ? 'd-block' : 'd-none'} no-list-style`} style={{ padding: 0, margin: 0 }} >
                                                        {(eachSection.subsections.map((subSection) => (
                                                            <li id={subSection.id} key={subSection.id} style={{ padding: 0, margin: 0 }}>
                                                                <span className={`w-100 d-flex alignCenter p-1`}>
                                                                    <span>
                                                                        {subSection.position_id}
                                                                    </span>
                                                                </span>
                                                                <ul className={`${(activeSub === subSection.id) ? 'd-block' : 'd-none'} no-list-style`} style={{ padding: 0, margin: 0 }}>
                                                                    {(subSection.lessons.map((lesson) => (
                                                                        <li id={lesson.id} key={lesson.id} style={{ padding: '0' }}>
                                                                            <span className={`w-100 d-flex alignCenter p-1`}>
                                                                                {lesson.position_id}
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
                                    ))}
                                </ul>
                            </div>
                            <div className='rightStraight w-100 pt-4 pb-4'>
                                <ul className='no-list-style p-0 m-0 secMain w-100'>
                                    {(conHook.sections.length === 0) ? (
                                        <>
                                            {conHook.gettingContent ? (
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
                                                    {conHook.contentError ? (
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
                                                    ) : null}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {conHook.sections[0].sections.length === 0 ? (
                                                <li style={{ padding: '0' }}>
                                                    <span className='activeTab w-100 d-flex alignCenter p-1 justify-content-center'>
                                                        <span className='fa fa-exclamation text-danger' style={{ marginRight: '20px' }}></span>
                                                        <span>
                                                            There are no sections!
                                                        </span>
                                                    </span>
                                                </li>
                                            ) : null}
                                            {conHook.sections.map((section) => (
                                                <>
                                                    {(section.sections.map((eachSection) => (
                                                        <li id={eachSection.id} key={eachSection.id} style={{ padding: '0' }}>
                                                            <span className={`${((viewing === eachSection.id) && (activeSub === "") && (activeLesson === "")) ? 'activeTab' : ''} w-100 d-flex alignCenter p-1`} onClick={e => toggleView(eachSection.id, eachSection)} >
                                                                <span className='leftIds' onClick={e => toggleView(eachSection.id, eachSection)}>
                                                                    {eachSection.position_id}
                                                                </span>
                                                                <span className={`fa mr-15 ${(viewing === eachSection.id) ? 'fa-caret-down' : 'fa-caret-right'}`}></span>
                                                                <span>
                                                                    Section {eachSection.position_id}
                                                                </span>
                                                            </span>
                                                            <ul className={`${(viewing === eachSection.id) ? 'd-block' : 'd-none'} no-list-style pl-20`} >
                                                                {(eachSection.subsections.map((subSection) => (
                                                                    <li id={subSection.id} key={subSection.id} style={{ padding: '0' }}>
                                                                        <span className={`${((activeSub === subSection.id) && (activeLesson === "")) ? 'activeTab' : ''} w-100 d-flex alignCenter p-1`} onClick={e => toggleActiveSub(subSection.id, eachSection.id, subSection, eachSection)}>
                                                                            <span className='leftIds' onClick={e => toggleActiveSub(subSection.id, eachSection.id, subSection, eachSection)}>
                                                                                {subSection.position_id}
                                                                            </span>
                                                                            <span className={`fa mr-15 ${(activeSub === subSection.id) ? 'fa-caret-down' : 'fa-caret-right'}`}></span>
                                                                            <span>
                                                                                {subSection.position_id}
                                                                            </span>
                                                                        </span>
                                                                        <ul className={`${(activeSub === subSection.id) ? 'd-block' : 'd-none'} no-list-style pl-20`} >
                                                                            {(subSection.lessons.map((lesson) => (
                                                                                <li id={lesson.id} key={lesson.id} style={{ padding: '0' }}>
                                                                                    <span className='leftIds' onClick={e => toggleActiveLesson(lesson.id, lesson)}>
                                                                                        {lesson.position_id}
                                                                                    </span>
                                                                                    <span className={`${(activeLesson === lesson.id) ? 'activeTab' : ''} w-100 d-flex alignCenter p-1`} onClick={e => toggleActiveLesson(lesson.id, lesson)}>
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
                                            ))}
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Right side of the content page  */}
                    <div className='col-md-8'>
                        <div className='d-flex justify-content-between' style={{ marginBottom: 0 }}>
                            <p className='m-0 mt-2'>
                                Release Date : {basic.releaseDate}
                            </p>
                            <p className='m-0 mt-2'>
                                <b>
                                    Status: {edit.courseStatus}
                                </b>
                            </p>
                        </div>
                        <hr />
                        <SectionForm data={data} title={title} />
                    </div>
                </div>
            </div >
            <br />
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default ContentEdit
