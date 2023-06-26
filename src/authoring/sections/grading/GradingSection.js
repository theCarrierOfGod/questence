import React, { useEffect, useState } from 'react'
import SectionsLanding from '../SectionsLanding';
import { useEdit } from '../../../providers/Edit';
import { useBasic } from '../../../providers/Basic';
import { useParams } from 'react-router-dom';

const GradingSection = () => {
    const basic = useBasic();
    let { id } = useParams();
    const [grades, setGrades] = useState([]);
    const [newGrade, setNewGrade] = useState(false);
    const edit = useEdit();

    const toggleNewGrade = () => {
        if (newGrade) {
            setNewGrade(false)
        } else {
            setNewGrade(true)
        }
    }

    useEffect(() => {
        setGrades([]);
        setTimeout(() => {
            edit.gradingNewCheck()
            edit.gradingEditCheck()
        }, 500);
    }, [id])

    return (
        <>
            <SectionsLanding />

            <div className='container mt-4 mb-4'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='conMenu w-100 justify-space-between' style={{ display: 'flex' }}>
                            <nav className='fg-1'>
                                <div className='d-flex'>
                                    <button disabled={edit.disableGradingNew} className={`btn menu-link ${newGrade ? 'txtCancel' : 'text-primary'}`} onClick={toggleNewGrade}>
                                        {newGrade ? 'Cancel' : 'Append'}
                                    </button>
                                    <button disabled={edit.disableGradingEdit} className={!edit.isEdit ? 'btn menu-link' : 'd-none'} style={{ color: '#00798C' }}>
                                        Edit
                                    </button>
                                    <button disabled={edit.readOnly} className={edit.isEdit ? 'btn menu-link' : 'd-none'} style={{ color: '#00798C' }}>
                                        Save
                                    </button>
                                    <button disabled={!edit.isEdit} className={edit.isEdit ? 'btn menu-link txtCancel' : 'd-none'} style={{ color: 'rgba(245, 113, 113)' }}>
                                        Cancel
                                    </button>
                                    <button disabled={edit.disableGradingEdit} className={!edit.isEdit ? 'btn menu-link' : 'd-none'} style={{ color: '#FF4040' }}>
                                        Delete
                                    </button>
                                </div>
                            </nav>
                            <div className='fg-0 d-flex' >
                                <button className={'btn menu-link text-primary d-none'}>
                                    Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mb-5' style={{ minHeight: '40vh' }}>
                <div className='container'>
                    <div className='row mb-5'>
                        <div className='col-lg-12'>
                            <div className="b-15 rounded">
                                <table className="table table-bordered table-inverse table-responsive m-0">
                                    <thead className="thead-inverse text-center">
                                        <tr>
                                            <th>Grade Letter</th>
                                            <th>Grade Description</th>
                                            <th>Lower Bounds</th>
                                            <th>Upper Bounds</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(grades.length === 0) ? (
                                            <>
                                                <tr className='tableRow'>
                                                    <td className='text-center' colSpan={4}>
                                                        No Data
                                                    </td>
                                                </tr>
                                            </>
                                        ) : (
                                            <>
                                                {grades.map((grade) => (
                                                    <tr key={grade.id} className='tableRow' id={grade.id}>
                                                        <td>
                                                            {grade.name}
                                                        </td>
                                                        <td>
                                                            {grade.type}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={newGrade ? 'row' : 'd-none'}>
                            <div className='col-lg-12'>
                                <div className="form-group mt-3">
                                    <label for="gracePeriod" className='label'>
                                        Grace Period After Deadline
                                    </label>
                                    <select name="gracePeriod" className='form-control' id="gracePeriod">
                                        <option>Select Course Pacing</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <label for="gracePeriod" className='label mt-3'>
                                    Assignment & Exam Types
                                </label>
                                <div className="b-15 rounded">
                                    <table className="table table-bordered table-inverse table-responsive m-0">
                                        <tbody>
                                            <tr className='tableRow' style={{ background: 'rgba(0, 121, 140, 0.2)' }}>
                                                <td>
                                                    Graded
                                                </td>
                                            </tr>
                                            <tr className='tableRow'>
                                                <td>
                                                    Ungraded
                                                </td>
                                            </tr>
                                            <tr className='tableRow'>
                                                <td>
                                                    Main Semester
                                                </td>
                                            </tr>
                                            <tr className='tableRow'>
                                                <td>
                                                    Quizzes
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='text-center tableFooter bgPreview'>
                                        Add new type
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className="form-group mt-3">
                                    <label for="gracePeriod" className='label'>
                                        Member Problems
                                    </label>
                                    <textarea className="form-control" name="" id="" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GradingSection