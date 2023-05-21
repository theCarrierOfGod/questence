import React, { useEffect } from 'react';
import { useEdit } from '../../providers/Edit';
import { useHook } from '../../providers/Hook';
import style from './status.module.css';
import { useBasic } from '../../providers/Basic';
import { useParams } from 'react-router-dom';

const StatusTab = () => {
    const edit = useEdit();
    const hook = useHook();
    const basic = useBasic();
    let { id } = useParams();
    return (
        <div>
            <span style={{ position: 'fixed', top: '40px', right: '70px', background: '#f2f2f2', borderRadius: '20px', zIndex: '1000' }}>
                {edit.isEdit ? (
                    <>
                        <i className='text-info' style={{ fontSize: '12px', padding: '7px' }}>
                            <span className='fa fa-pencil'></span> Editing
                        </i>
                    </>
                ) : null}
            </span>
            <div className='container'>
                <div className='row alignCenter justify-content-between'>
                    <div className='col-lg-3 col-sm-12 col-12'>
                        <b>
                            Status: {edit.courseStatus}
                        </b>
                    </div>
                    {/* save basic tab  */}
                    <div className={((edit.courseTab === 'basic') && (edit.isEdit)) ? 'col-lg-2 col-sm-4 col-4' : 'd-none'}>
                        <button className={((edit.courseTab === 'basic') && (edit.isEdit)) ? `${style.statusButton} ${style.bgEdit}` : 'd-none'} onClick={(e) => { basic.handleSubmit(id); edit.toggleEdit('basic') }}>
                            Save
                        </button>
                    </div>
                    {/* save media tab  */}
                    <div className={((edit.courseTab === 'media') && (edit.isEdit)) ? 'col-lg-2 col-sm-4 col-4' : 'd-none'}>
                        <button className={((edit.courseTab === 'media') && (edit.isEdit)) ? `${style.statusButton} ${style.bgEdit}` : 'd-none'} onClick={(e) => { basic.saveMedia(id); edit.toggleEdit('media') }}>
                            Save
                        </button>
                    </div>
                    {/* save course team tab  */}
                    <div className={((edit.courseTab === 'courseTeam') && (edit.isEdit)) ? 'col-lg-2 col-sm-4 col-4' : 'd-none'}>
                        <button className={((edit.courseTab === 'courseTeam') && (edit.isEdit)) ? `${style.statusButton} ${style.bgEdit}` : 'd-none'} onClick={(e) => { basic.saveTeam(id); edit.toggleEdit('courseTeam') }}>
                            Save
                        </button>
                    </div>
                    <div className='col-lg-2 col-sm-4 col-4'>
                        <button className={edit.isEdit ? `${style.statusButton} ${style.bgCancel}` : `${style.statusButton} ${style.bgEdit}`} onClick={(e) => edit.toggleEdit('basic')}>
                            {edit.isEdit ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                    <div className='col-lg-2 col-sm-4 col-4'>
                        <button className={`${style.statusButton} ${style.bgPreview}`}>
                            Preview Course
                        </button>
                    </div>
                    <div className='col-lg-2 col-sm-12 col-12'>
                        <button onClick={hook.goHome} className={`${style.statusButton} ${style.bgReturn}`}>
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusTab
