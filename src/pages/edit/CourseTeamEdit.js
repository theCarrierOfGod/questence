import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import Nav from '../../components/nav/Nav'
import { useEdit } from '../../providers/Edit'
import StatusTab from './StatusTab'
import TabMenu from './TabMenu'
import { useParams } from 'react-router-dom'
import { useHook } from '../../providers/Hook'
import { useAuth } from '../../providers/Auth'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'

const CourseTeamEdit = () => {
    const edit = useEdit();
    let { id } = useParams();
    const hook = useHook();
    const auth = useAuth();
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [team, setTeam] = useState([]);
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

    const myTeam = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-team/${id}`,
            headers: {
                'Authorization': auth.token,
                'Content-Type': 'application/json'
            }
        };

        axios(config)
            .then(function (response) {
                setTeam(response.data)
            });

    }

    useEffect(() => {
        myTeam();
        return () => {
            myTeam()
        };
    }, [id]);

    const addNewRole = (event) => {
        event.preventDefault();
        NotificationManager.info('Adding', 'Team member', 6000);

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-team/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "course_id": id,
                "email": email,
                role: true,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response)
                if (response.data.id) {

                } else {
                    // NotificationManager.error(response.data.detail, 'Team member', 5000);
                }
            })
            .catch(function (error) {
                // NotificationManager.error(error.message, 'Team member', 6000);
            });

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
                                    {(team === []) ? (
                                        <>
                                            <tr className='tableRow'>
                                                <td className="col-4"></td>
                                                <td className='col-4 text-center'>
                                                    No Data
                                                </td>
                                                <td className="col-4"></td>
                                            </tr>
                                        </>
                                    ) : (
                                        <>
                                            {team.map((team, index) => (
                                                <tr key={team.id} className='tableRow' id={team.id}>
                                                    <td className="col-4">
                                                        {(team.member_id === null) ? null : (
                                                            <>
                                                                {team.member_id.last_name} {team.member_id.first_name}
                                                            </>
                                                        )}
                                                    </td>
                                                    <td className="col-4">
                                                        {(team.member_id === null) ? null : (
                                                            <>
                                                                {team.member_id.email}
                                                            </>
                                                        )}
                                                    </td>
                                                    <td className="col-4">
                                                        {(team.role_author) ? 'Author' : null}
                                                        {(team.role_editor) ? 'Editor' : null}
                                                        {(team.role_reader) ? 'Reader' : null}
                                                        {(team.role_lead) ? 'Lead' : null}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                            <button onClick={toggleNewMember} className='text-center tableFooter btn bgPreview w-100' disabled={edit.readOnly}>
                                Add new role
                            </button>
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
                                        <option value={'role_author'}>Author</option>
                                        <option value={'role_editor'}>Editor</option>
                                        <option value={'role_lead'}>Lead</option>
                                        <option value={'role_reader'}>Reader</option>
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
