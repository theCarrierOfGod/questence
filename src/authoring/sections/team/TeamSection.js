import React, { useEffect, useState } from 'react'
import SectionsLanding from '../SectionsLanding'
import { useLocation, useParams } from 'react-router-dom';
import { useEdit } from '../../../providers/Edit';
import { useBasic } from '../../../providers/Basic';
import '../section.css'

const TeamSection = () => {
    let { id } = useParams();
    const location = useLocation();
    const basic = useBasic();
    const edit = useEdit();
    const [newMember, setNewMember] = useState(false);

    const toggleNewMember = () => {
        if (newMember) {
            setNewMember(false)
        } else {
            setNewMember(true)
        }
    }

    const selectRow = (identity) => {
        edit.verifyRow(identity);
        setTimeout(() => {
            edit.gradingEditCheck();
        }, 400);
    }

    document.addEventListener("click", (evt) => {
        const flyoutEl = document.getElementById("clickIn");
        let targetEl = evt.target; // clicked element      
        do {
            if (targetEl == flyoutEl) {
                return;
            }
            // Go up the DOM
            targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.      
        edit.setRowToEdit('');
    });

    useEffect(() => {
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
                                    <button disabled={edit.disableGradingNew} className={`btn menu-link ${newMember ? 'txtCancel' : 'text-primary'}`} onClick={toggleNewMember}>
                                        {newMember ? 'Cancel' : 'Append'}
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
                        <div className='col-lg-12 mb-3'>
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
                                    <tbody id="clickIn">
                                        {(basic.team === []) ? (
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
                                                {basic.team.map((team, index) => (
                                                    <tr
                                                        key={team.id}
                                                        className={`${(edit.rowToEdit === team.id) ? "active" : ""}  tableRow is-link `}
                                                        id={team.id}
                                                        onClick={
                                                            (e) => {
                                                                selectRow(team.id)
                                                            }
                                                        }>
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
                            </div>
                        </div>
                        <form className={newMember ? 'd-block' : 'd-none'} onSubmit={basic.addNewRole}>
                            <div className='row mt-4'>
                                <div className='col-lg-4'>
                                    <div className="form-group mt-3">
                                        <label className="label" htmlFor="email">Email Address</label>
                                        <input type={'text'} value={basic.teamEmail} onChange={e => basic.setTeamEmail(e.target.value)} readOnly={edit.readOnly} className="form-control" name="email" id="email" required="" />
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <div className="form-group mt-3">
                                        <label className="label" htmlFor="role">Select Role</label>
                                        <select className="form-control" value={basic.teamRole} onChange={e => basic.setTeamRole(e.target.value)} disabled={edit.readOnly} name="role" id="role" required="">
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
            </div>
        </>
    )
}

export default TeamSection