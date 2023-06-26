import React, { useEffect } from 'react'
import { useNew } from '../../providers/New';
import style from './courses.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDetail } from '../../providers/Detail';
import { useBasic } from '../../providers/Basic';
import { useEdit } from '../../providers/Edit';

const Courses = () => {
    const newHook = useNew();
    const location = useLocation();
    const navigate = useNavigate();
    const detail = useDetail();
    const basic = useBasic();
    const edit = useEdit();

    useEffect(() => {
        newHook.getMyPrograms();
        return () => {
            return true;
        };
    }, [location.key]);
    return (
        <>
            <div className='container mt-3 mb-5' >
                <div className={style.progressBox}>
                    <div className='row pt-3'>
                        <div className='col-lg-6 p-3'>
                            <div className={`${style.reportText} ml-3`}>
                                <h3>
                                    Progress Report
                                </h3>
                                <br />
                                <h4>
                                    Revenue Generated
                                </h4>
                                <br />
                                <p>
                                    Easily create a new course
                                </p>
                                <br />
                                <button className='eHeadBtn' onClick={newHook.addNew}>
                                    Add New Course
                                </button>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='row'>
                                <div className='col-6 d-flex justify-content-center p-2'>
                                    <div className={style.progressRing}>
                                        <div className='text-center w-100'>
                                            <strong>
                                                {newHook.programCount}
                                            </strong> <br></br>
                                            Live Courses
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 d-flex justify-content-center p-2'>
                                    <div className={style.progressRing}>
                                        <div className='text-center w-100'>
                                            <strong>
                                                {newHook.programCount}
                                            </strong> <br></br>
                                            Enrollments
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` ${style.progressFooter} alignCenter d-grid pt-2 pb-3`}>
                    <div className='row m-0'>
                        <div className='col-lg-3  p-2'>
                            <div className='d-flex alignCenter text-center'>
                                <label htmlFor='tag'>
                                    Category Tag:
                                </label>
                                <select id="tag" className="noBg ml-2">
                                    <option value="">Select Tag</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-2 p-2'>
                            <div className='d-flex alignCenter text-center'>
                                <label htmlFor='title'>
                                    Role:
                                </label>
                                <select id="role" className="noBg ml-2">
                                    <option value="">Select Role</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-3 p-2'>
                            <div className='d-flex alignCenter text-center'>
                                <label htmlFor='status'>
                                    Status:
                                </label>
                                <select id="status" className="noBg ml-2">
                                    <option value="">Select Status</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-2 p-2'>
                            <div className='d-flex alignCenter text-center'>
                                <label htmlFor='price'>
                                    Price:
                                </label>
                                <select id="price" className="noBg ml-2">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-2 p-2'>
                            <button className="flterBtn w-100">
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className='container mt-5'>
                <div className={style.courseBox}>
                    <div className={`${style.menu} container d-flex justify-content-between`}>
                        <h4 className={`${style.menuTitle} pt-3 `}>
                            My Courses
                        </h4>
                        <div className={`${style.menu}`}>
                            <span className='fa fa-refresh link' title="Refresh course list" onClick={newHook.getMyPrograms} style={{ marginRight: '10px' }}></span>
                            <button className='eHeadBtn' onClick={newHook.addNew}>
                                Add New Course
                            </button>
                        </div>
                    </div>
                    <div className={`${style.courseList} m-3 mt-4 pb-2`}>
                        <div className="table-responsive-md m-2">

                            {(newHook.programs.length === 0) ? (
                                <>
                                    <table className="table table-striped table-hover">
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>
                                                    <br />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>
                                                    <b>
                                                        {newHook.loadingMessage}
                                                    </b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>
                                                    <br />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Course Code</th>
                                                <th scope="col">Course Name</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Institution</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newHook.programs.map((program) => (
                                                <tr key={program.course_id.id}>
                                                    <td>
                                                        {program.course_id.code}
                                                    </td>
                                                    <td>
                                                        {program.course_id.name}
                                                    </td>
                                                    <td>
                                                        {program.course_id.publication_status}
                                                    </td>
                                                    <td>
                                                        {/* {program.course_id.institution_id.institution} */}
                                                    </td>
                                                    <td>
                                                        {(program.role_editor === true) ? 'Editor' : (
                                                            <>
                                                                {(program.role_author === true) ? 'Author' : (
                                                                    <>
                                                                        {(program.role_lead === true) ? 'Lead' : (
                                                                            <>
                                                                                {(program.role_reader === true) ? 'Reader' : null}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <span className='link' style={{ marginRight: '10px', color: 'green' }}>
                                                            <i className="fa fa-eye"></i>
                                                        </span>
                                                        <span
                                                            onClick={(e) => {
                                                                let role = '';
                                                                if (program.role_editor === true) {
                                                                    role = 'Editor'
                                                                }
                                                                if (program.role_author === true) {
                                                                    role = 'Author'
                                                                }
                                                                if (program.role_lead === true) {
                                                                    role = 'Lead'
                                                                }
                                                                if (program.role_reader === true) {
                                                                    role = 'Reader'
                                                                }

                                                                newHook.enterEdit(role, program.course_id.id)
                                                            }}
                                                            style={{ marginRight: ''}}
                                                            className='link text-info'>
                                                            <i className="fa fa-edit"></i>
                                                        </span>
                                                        <span className='link' onClick={(e) => newHook.deleteCourse(program.course_id.id)} style={{ marginLeft: '10px', color: 'orangered' }}>
                                                            <i className="fa fa-trash"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* New Course Modal  */}

            <div className={newHook.addNow ? `${style.modal} modal d-block` : `modal d-none`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <form className="modal-dialog modal-dialog-centered" role="document" onSubmit={newHook.startNewCourse}>
                    <div className="modal-content p-3">
                        <div className={`${style.modalHeader} modal-header`}>
                            <h5 className={`${style.modalTitle} modal-title`} id="exampleModalLongTitle">
                                Add New Course
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={newHook.addNew}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`${style.modalBody} modal-body`}>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseCode">
                                    Course Code
                                </label>
                                <input type="text" name="courseCode" id="courseCode" required onChange={(e) => newHook.setNewCourseCode(e.target.value)} className="form-control" placeholder="Enter course code" aria-describedby="helpId" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseName">
                                    Course Name
                                </label>
                                <input type="text" name="courseName" required onChange={(e) => newHook.setNewCourseName(e.target.value)} id="courseName" className="form-control" placeholder="Enter course name" aria-describedby="helpId" />
                            </div>
                        </div>
                        <div className={`${style.saveModal} modal-footer`}>
                            <button type="submit" disabled={newHook.savingNew} className="btn btn-secondary" data-dismiss="modal">
                                {newHook.savingNew ? (
                                    <>
                                        <i className="fa fa-spinner fa-spin"></i> saving
                                    </>
                                ) : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Courses