import React from 'react';
import { useParams } from 'react-router-dom';
import { useEdit } from '../../providers/Edit';
import { useHook } from '../../providers/Hook';
import style from './status.module.css';

const StatusTab = () => {
    const edit = useEdit();
    const hook = useHook();
    let { id } = useParams();
    return (
        <div>
            <div className='container'>
                <div className='row alignCenter'>
                    <div className='col-lg-3'>
                        <b>
                            Status: {edit.courseStatus}
                        </b>
                    </div>
                    <div className='col-lg-3'>
                        <span style={{ position: 'fixed', top: '25px', right: '25px', background: '#f2f2f2', borderRadius: '20px', padding: '7px' }}>
                            {edit.isEdit ? (
                                <>
                                    <i className='text-info' style={{ fontSize: '12px' }}>
                                        <span className='fa fa-pencil'></span> Editing
                                    </i>
                                </>
                            ) : null}
                        </span>
                    </div>
                    <div className='col-lg-2'>
                        <button className={`${style.statusButton} ${style.bgEdit}`} onClick={(e) => edit.toggleEdit('basic')}>
                            {edit.isEdit ? 'Cancel Editing' : 'Edit'}
                        </button>
                    </div>
                    <div className='col-lg-2'>
                        <button onClick={hook.goHome} className={`${style.statusButton} ${style.bgReturn}`}>
                            Return to Dashboard
                        </button>
                    </div>
                    <div className='col-lg-2'>
                        <button className={`${style.statusButton} ${style.bgPreview}`}>
                            Preview Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusTab
