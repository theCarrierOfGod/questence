import React, { useState } from 'react'
import Footer from '../../components/footer/Footer'
import Nav from '../../components/nav/Nav'
import { useEdit } from '../../providers/Edit'
import StatusTab from './StatusTab'
import TabMenu from './TabMenu'

const CourseTeamEdit = () => {
    const edit = useEdit();
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    // const [team, setTeam] = useState([]);
    const [newMember, setNewMember] = useState(false);

    const toggleNewMember = () => {
        if (edit.isEdit) {
            if (newMember) {
                setNewMember(false)
            } else {
                setNewMember(true)
            }
        }
    }

    const addNewRole = (event) => {
        event.preventDefault();

        // setTeam({
        //     ...team,
        //     [email]: email,
        //     [role]: role
        // })
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
                    <div className='col-lg-12 mb-3'>
                        <label htmlFor="gracePeriod" className='label mt-4'>
                            Author Team
                        </label>
                        <div className="b-15 rounded">
                            <table className="table table-bordered table-inverse table-responsive m-0">
                                <thead className="thead-inverse text-center">
                                    <tr>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            Role
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='tableRow'>
                                        <td></td>
                                        <td className='text-center'>
                                            No Data
                                        </td>
                                        <td></td>
                                    </tr>
                                    {/* {(team.length === 0) ? (
                                        <>
                                            <tr className='tableRow'>
                                                <td></td>
                                                <td className='text-center'>
                                                    No Data
                                                </td>
                                                <td></td>
                                            </tr>
                                        </>
                                    ) : (null
                                        <>
                                            {team.map((team) => (
                                                <tr key={team.id} className='tableRow' id={team.id}>
                                                    <td>
                                                        {team.name}
                                                    </td>
                                                    <td>
                                                        {team.email}
                                                    </td>
                                                    <td>
                                                        {team.role}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )} */}
                                </tbody>
                            </table>
                            <div onClick={toggleNewMember} className='text-center tableFooter bgPreview is-hoverable' disabled={edit.readOnly}>
                                Add new role
                            </div>
                        </div>
                    </div>
                    <form className={newMember ? 'd-block' : 'd-none'} onSubmit={addNewRole}>
                        <div className='row mt-4'>
                            <div className='col-lg-4'>
                                <div className="form-group mt-3">
                                    <label className="label" htmlFor="email">Email Address</label>
                                    <input type={'text'} value={email} onChange={e => setEmail(e.target.value)} readOnly={edit.readOnly} className="form-control" name="email" id="email" required="" />
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className="form-group mt-3">
                                    <label className="label" htmlFor="role">Select Role</label>
                                    <select className="form-control" value={role} onChange={e => setRole(e.target.value)} disabled={edit.readOnly} name="role" id="role" required="">
                                        <option>Select</option>
                                        <option value={'author'}>Author</option>
                                        <option value={'instructor'}>Instructor</option>
                                        <option value={'staff'}>Staff</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <label className='label'>
                                    <br />
                                </label>
                                <div className="form-group mt-3">
                                    <button type="submit" disabled={edit.readOnly} className='bg-elearn text-center w-100 bgPreview addBtn'>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <br />
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default CourseTeamEdit
