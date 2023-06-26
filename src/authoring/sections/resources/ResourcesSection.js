import React, { useEffect, useState } from 'react'
import SectionsLanding from '../SectionsLanding'
import { useEdit } from '../../../providers/Edit';
import { useParams } from 'react-router-dom';

const ResourcesSection = () => {
    const [resources, setResources] = useState([]);
    let { id } = useParams();
    const edit = useEdit();
    const [newResource, setNewResource] = useState(false);
    const toggleNewResource = () => {
        if (newResource) {
            setNewResource(false)
        } else {
            setNewResource(true)
        }
    }
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
                                    <button disabled={edit.disableGradingNew} className={`btn menu-link ${newResource ? 'txtCancel' : 'text-primary'}`} onClick={toggleNewResource}>
                                        {newResource ? 'Cancel' : 'Append'}
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
                    <div className='row mb-3'>
                        <div className='col-lg-12'>
                            <div className="b-15 rounded">
                                <table className="table table-bordered table-inverse table-responsive m-0">
                                    <thead className="thead-inverse">
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
                            </div>
                        </div>
                    </div>
                    <div className={newResource ? 'row' : 'd-none'}>
                        <div className='col-lg-12'>
                            <div className="form-group mt-4">
                                <label className="label" for="" style={{ fontSize: '15px' }}>Create new resource</label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className="form-group mt-3">
                                <label className="label" for="type">Type</label>
                                <select className="form-select" name="type" id="type" disabled={edit.readOnly}>
                                    <option>Select resource type</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className="form-group mt-3">
                                <label className="label" for="">Select Role</label>
                                <select className="form-select" name="" id="" disabled={edit.readOnly}>
                                    <option>Select role</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className="form-group mt-3">
                                <label className="label" for="">Access Type</label>
                                <select className="form-select" name="" id="" disabled={edit.readOnly}>
                                    <option>Select access type</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className="form-group mt-2">
                                <label className="label" for="">Description</label>
                                <input type='text' placeholder='Enter description' className='form-control' disabled={edit.readOnly} />
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className="form-group mt-2">
                                <label className="label" for="">URL</label>
                                <input type='url' placeholder='URL' className='form-control' disabled={edit.readOnly} />
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
            </div>
        </>
    )
}

export default ResourcesSection