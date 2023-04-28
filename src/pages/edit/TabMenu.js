import React from 'react';
import { useParams } from 'react-router-dom';
import { useEdit } from '../../providers/Edit';
import tabstyle from './tabmenu.module.css';


const TabMenu = () => {
    const edit = useEdit();
    let {id} = useParams()
    return (
        <div>
            <div className='container'>
                <div className={`${tabstyle.tabFlex} justify-content-between tab`} style={{ background: '#F2F2F2', borderRadius: '15px' }}>
                    <div className={(edit.courseTab === "basic") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("basic", id)}>
                        Basic
                    </div>
                    <div className={(edit.courseTab === "media") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("media", id)}>
                        Media
                    </div>
                    <div className={(edit.courseTab === "schedule") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("schedule", id)}>
                        Schedule
                    </div>
                    <div className={(edit.courseTab === "grading") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("grading", id)}>
                        Grading
                    </div>
                    <div className={(edit.courseTab === "courseTeam") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("courseTeam", id)}>
                        Course Team
                    </div>
                    <div className={(edit.courseTab === "group") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("group", id)}>
                        Group
                    </div>
                    <div className={(edit.courseTab === "resources") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("resources", id)}>
                        Resources
                    </div>
                    <div className={(edit.courseTab === "content") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("content", id)}>
                        Content
                    </div>
                    <div className={(edit.courseTab === "submit") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("submit", id)}>
                        Submit
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabMenu
