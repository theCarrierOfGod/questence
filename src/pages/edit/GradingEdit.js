import React from 'react'
import { useState } from 'react'
import Footer from '../../components/footer/Footer'
import Nav from '../../components/nav/Nav'
import { useEdit } from '../../providers/Edit'
import StatusTab from './StatusTab'
import TabMenu from './TabMenu'

const GradingEdit = () => {
    const [grades, setGrades] = useState([]);
    const [newGrade, setNewGrade] = useState(false);
    const edit = useEdit();
    const toggleNewGrade = () => {
        if (edit.isEdit) {
            if (newGrade) {
                setNewGrade(false)
            } else {
                setNewGrade(true)
            }
        }
    }
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
                <div className='row mb-5'>
                    <div className='col-lg-12'>
                        <label for="gracePeriod" className='label mt-3'>
                            Grace Range
                        </label>
                        <div className="b-15 rounded">
                            <table class="table table-bordered table-inverse table-responsive m-0">
                                <thead class="thead-inverse text-center">
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
                            <button className='text-center tableFooter bgPreview w-100' disabled={edit.readOnly} onClick={toggleNewGrade}>
                                Add new range
                            </button>
                        </div>
                    </div>
                    <div className={newGrade ? 'row' : 'd-none'}>
                        <div className='col-lg-12'>
                            <div class="form-group mt-3">
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
                                <table class="table table-bordered table-inverse table-responsive m-0">
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
                            <div class="form-group mt-3">
                                <label for="gracePeriod" className='label'>
                                    Member Problems
                                </label>
                                <textarea class="form-control" name="" id="" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default GradingEdit
