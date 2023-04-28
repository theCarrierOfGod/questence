import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBasic } from '../../../providers/Basic';
import { useSubContent } from '../../../providers/SubContent';
import './style.css';
import { useEditCon } from '../../../providers/EditContent';
import { useEdit } from '../../../providers/Edit';

const ContentMenu = () => {
    const content = useSubContent();
    const edit = useEdit();
    const subEdit = useEditCon();
    const basic = useBasic();
    let { id } = useParams();

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

    const editContents = () => {
        if(edit.isEdit) {
            subEdit.toggleEdit();
        } else {
            alert("You cannot edit this page without clicking the edit button above");
        }
    }

    useEffect(() => {
        basic.getCourse(id);
    }, [])
    return (
        <>
            <div className='conMenu w-100' style={{ display: 'inline-flex' }}>
                <nav className='fg-1'>
                    <div className='d-flex'>
                        <button className='menu-link'>
                            New
                        </button>
                        <button className='menu-link' style={{ color: '#00798C' }} onClick={editContents}>
                            Edits
                        </button>
                        <button className='menu-link' style={{ color: '#FF4040' }}>
                            Delete
                        </button>
                    </div>
                </nav>
                <div className='fg-0 d-flex' >
                    <span className='menu-link'>
                        Preview
                    </span>
                    <span className='menu-link' style={{ fontSize: '18px', fontWeight: 1000, padding: 0, lineHeight: '25px' }}>
                        . . .
                    </span>
                </div>
            </div>
            <br></br>
            <br />
            <div className='conMenu p-0 mb-5'>
                <div className='leftStraight pt-4'>
                    <ul className='no-list-style p-0 m-0 secMain d-none'>
                        <li>
                            <Link>
                                01
                            </Link>
                        </li>
                        <li>
                            <Link>
                                01.00
                            </Link>
                        </li>
                        <li>
                            <Link>
                                01.01
                            </Link>
                        </li>
                        <li>
                            <Link>
                                01.01.01
                            </Link>
                        </li>
                        <li>
                            <Link>
                                01.01.02
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='rightStraight pt-3'>
                    <ul className='no-list-style p-0 m-0 secMain'>
                        {(content.sections.length === 0) ? null : (
                            <>
                                {content.sections.map((content) => (
                                    <>
                                        <li>
                                            <span className={section ? 'fa fa-caret-down' : 'fa fa-caret-right'}></span>
                                            <span onClick={toggleSection} className="ml-15">
                                                Section {content.position_id}
                                            </span>
                                            <ul className='no-list-style p-0 m-0 secMain ml-15'>
                                                {(content.sub_sections.length === 0) ? null : (
                                                    <>
                                                        {
                                                            content.sub_sections.map((subsection) => (
                                                                <>
                                                                    <li className={section ? null : 'd-none'}>
                                                                        <span className={subsection ? 'fa fa-caret-down' : 'fa fa-caret-right'}></span>
                                                                        <span onClick={toggleSubSection} className="ml-15">
                                                                            Sub-Section {content.position_id}.{subsection.position_id}
                                                                        </span>
                                                                    </li>
                                                                </>
                                                            ))
                                                        }
                                                    </>
                                                )}
                                            </ul>
                                        </li>
                                    </>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            </div >
        </>
    )
}

export default ContentMenu
