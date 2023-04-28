import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Nav from '../../components/nav/Nav';
import { useBasic } from '../../providers/Basic';
import { useEdit } from '../../providers/Edit';
import StatusTab from './StatusTab';
import TabMenu from './TabMenu';

const ScheduleEdit = () => {
    const edit = useEdit();
    const location = useLocation();
    const basic = useBasic();
    let { id } = useParams();

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
                {(basic.courseDetails.length === '0' ? null : (
                    <>
                        <div className='row mb-5'>
                            <div className='col-lg-12'>
                                <div className="form-group">
                                    <label htmlFor="coursePacing" className='label'>Course Pacing</label>
                                    <select
                                        name="coursePacing"
                                        className='form-control'
                                        id="coursePacing"
                                        disabled={edit.readOnly}
                                    >
                                        <option>Select Course Pacing</option>
                                    </select>
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className="form-group mt-4">
                                    <label htmlFor="startDate" className='label'>Course Start Date & Time</label>
                                    <div className='row'>
                                        <div className='col-lg-8'>
                                            <input type="date" disabled={edit.readOnly} name="startDate" id="startDate" className="form-control mb-2 mr-sm-2" placeholder='Date' />
                                        </div>
                                        <div className='col-lg-4'>
                                            <input type="time" disabled={edit.readOnly} name="startTime" id="startTime" className="form-control mb-2 mr-sm-2" placeholder='Time' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className="form-group mt-4">
                                    <label htmlFor="endDate" className='label'>Course End Date & Time</label>
                                    <div className='row'>
                                        <div className='col-lg-8'>
                                            <input type="date" disabled={edit.readOnly} name="endDate" id="endDate" className="form-control mb-2 mr-sm-2" placeholder='Date' />
                                        </div>
                                        <div className='col-lg-4'>
                                            <input type="time" disabled={edit.readOnly} name="endTime" id="endTime" className="form-control mb-2 mr-sm-2" placeholder='Time' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className="form-group mt-4">
                                    <label htmlFor="enrollmentDate" className='label'>Enrollment Start Date & Time</label>
                                    <div className='row'>
                                        <div className='col-lg-8'>
                                            <input type="date" disabled={edit.readOnly} name="enrollmentDate" id="enrollmentDate" className="form-control mb-2 mr-sm-2" placeholder='Date' />
                                        </div>
                                        <div className='col-lg-4'>
                                            <input type="time" disabled={edit.readOnly} name="enrollmentTime" id="enrollmentTime" className="form-control mb-2 mr-sm-2" placeholder='Time' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className="form-group mt-4">
                                    <label htmlFor="endEnrollmentDate" className='label'>Enrollment End Date & Time</label>
                                    <div className='row'>
                                        <div className='col-lg-8'>
                                            <input type="date" disabled={edit.readOnly} name="endEnrollmentDate" id="endEnrollmentDate" className="form-control mb-2 mr-sm-2" placeholder='Date' />
                                        </div>
                                        <div className='col-lg-4'>
                                            <input type="time" disabled={edit.readOnly} name="endEnrollmentTime" id="endEnrollmentTime" className="form-control mb-2 mr-sm-2" placeholder='Time' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className="form-group mt-4">
                                    <label htmlFor="reqHours" className='label'>
                                        Requirements - Hours of Effort per Week
                                    </label>
                                    <input type="text" disabled={edit.readOnly} name="reqHours" id="reqHours" placeholder="Input hours required" className="form-control" />
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className="form-group mt-4">
                                    <label htmlFor="reqWeek" className='label'>
                                        Requirements - No of Week
                                    </label>
                                    <input type="text" disabled={edit.readOnly} name="reqWeek" id="reqWeek" placeholder="Input weeks required" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <br />
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default ScheduleEdit
