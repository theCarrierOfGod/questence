import React from 'react'
import { useState } from 'react'
import Footer from '../../components/footer/Footer'
import Nav from '../../components/nav/Nav'
import { useEdit } from '../../providers/Edit'
import StatusTab from './StatusTab'
import TabMenu from './TabMenu'

const ResourceEdit = () => {
    const [resources, setResources] = useState([]);
    const edit = useEdit();
    const [newResource, setNewResource] = useState(false);
    const toggleNewResource = () => {
        if (edit.isEdit) {
            if (newResource) {
                setNewResource(false)
            } else {
                setNewResource(true)
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
                <div className='row mb-3'>
                    <div className='col-lg-12'>
                        <div className="b-15 rounded">
                            <table class="table table-bordered table-inverse table-responsive m-0">
                                <thead class="thead-inverse">
                                    <tr>
                                        <th>
                                            Type
                                        </th>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Access Type
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                        <th>
                                            URL
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(resources.length === 0) ? (
                                        <>
                                            <tr className='tableRow'>
                                                <td className='text-center' colSpan={5}>
                                                    No Data
                                                </td>
                                            </tr>
                                        </>
                                    ) : (
                                        <>
                                            {resources.map((resource) => (
                                                <tr key={resource.id} className='tableRow' id={resource.id}>
                                                    <td>
                                                        {resource.type}
                                                    </td>
                                                    <td>
                                                        {resource.name}
                                                    </td>
                                                    <td>
                                                        {resource.accessType}
                                                    </td>
                                                    <td>
                                                        {resource.description}
                                                    </td>
                                                    <td>
                                                        {resource.url}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                            <button className='text-center tableFooter bgPreview w-100' onClick={toggleNewResource}>
                                Add new Resource
                            </button>
                        </div>
                    </div>
                </div>
                <div className={newResource ? 'row' : 'd-none'}>
                    <div className='col-lg-12'>
                        <div class="form-group mt-4">
                            <label className="label" for="" style={{ fontSize: '15px' }}>Create new resource</label>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div class="form-group mt-3">
                            <label className="label" for="type">Type</label>
                            <select class="form-control" name="type" id="type" disabled={edit.readOnly}>
                                <option>Select resource type</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div class="form-group mt-3">
                            <label className="label" for="">Select Role</label>
                            <select class="form-control" name="" id="" disabled={edit.readOnly}>
                                <option>Select role</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div class="form-group mt-3">
                            <label className="label" for="">Access Type</label>
                            <select class="form-control" name="" id="" disabled={edit.readOnly}>
                                <option>Select access type</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div class="form-group mt-2">
                            <label className="label" for="">Description</label>
                            <input type='text' placeholder='Enter description' className='form-control' disabled={edit.readOnly} />
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div class="form-group mt-2">
                            <label className="label" for="">URL</label>
                            <input type='text' placeholder='URL' className='form-control' disabled={edit.readOnly} />
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <label className='label'>
                            <br />
                        </label>
                        <div className="form-group mt-3">
                            <button type="button" className='bg-elearn text-center w-100 bgPreview addBtn'>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default ResourceEdit
