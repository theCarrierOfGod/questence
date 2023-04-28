import React, { useState } from 'react'
import Footer from '../../components/footer/Footer'
import Nav from '../../components/nav/Nav'
import StatusTab from './StatusTab'
import TabMenu from './TabMenu'

const GroupEdit = () => {
    const [group, setGroup] = useState([]);
    const [member, setMember] = useState([])
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
                    <div className='col-lg-7'>
                        <label for="gracePeriod" className='label mt-2'>
                            Group
                        </label>
                        <div className="b-15 rounded">
                            <table class="table table-bordered table-inverse table-responsive m-0">
                                <thead class="thead-inverse text-center">
                                    <tr>
                                        <th>
                                            Group Name
                                        </th>
                                        <th>
                                            Group Type
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(group.length === 0) ? (
                                        <>
                                            <tr className='tableRow'>
                                                <td className='text-center' colSpan={2}>
                                                    No Data
                                                </td>
                                            </tr>
                                        </>
                                    ) : (
                                        <>
                                            {group.map((each) => (
                                                <tr key={each.id} className='tableRow' id={each.id}>
                                                    <td>
                                                        {each.name}
                                                    </td>
                                                    <td>
                                                        {each.type}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                            <div className='text-center tableFooter bgPreview'>
                                Create new group
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <label for="gracePeriod" className='label mt-2'>
                            &nbsp;
                        </label>
                        <div className="b-15 rounded">
                            <table class="table table-inverse table-responsive m-0">
                                <thead class="thead-inverse text-center">
                                    <tr>
                                        <th>
                                            Members
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(member.length === 0) ? (
                                        <>
                                            <tr className='tableRow'>
                                                <td className='text-center'>
                                                    No Data
                                                </td>
                                            </tr>
                                        </>
                                    ) : (
                                        <>
                                            {member.map((each) => (
                                                <tr key={each.id} className='tableRow' id={each.id}>
                                                    <td>
                                                        {each.name}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                            <div className='text-center tableFooter bgPreview'>
                                Add member
                            </div>
                        </div>
                    </div>
                    <div className='d-none row'>
                        <div className='col-lg-4'>
                            <div class="form-group mt-3">
                                <label className="label" for="">Group Name</label>
                                <select class="form-control" name="" id="">
                                    <option>Select</option>
                                </select>
                                <button className="addBtn bgPreview w-100 mt-3">
                                    Submit
                                </button>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div class="form-group mt-3">
                                <label className="label" for="">Group Type</label>
                                <select class="form-control" name="" id="">
                                    <option>Select Type</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='form-gorup mt-3'>
                                <label className='label'>
                                    <br />
                                </label>
                                <div className="b-15 rounded">
                                    <table class="table table-inverse table-responsive m-0">
                                        <thead class="thead-inverse">
                                            <tr>
                                                <th>
                                                    Select member
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='tableRow'>
                                                <td>

                                                </td>
                                            </tr>
                                            <tr className='tableRow'>
                                                <td>

                                                </td>
                                            </tr>
                                            <tr className='tableRow'>
                                                <td>

                                                </td>
                                            </tr>
                                            <tr className='tableRow'>
                                                <td>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default GroupEdit
