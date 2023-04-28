import React from 'react'
import { useState } from 'react';
import { useEdit } from '../../../providers/Edit';
// import CodeEditor from '@uiw/react-textarea-code-editor';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Html = (props) => {
    const edit = useEdit();
    const [newSection, setNewSection] = useState(false)
    const [htmlContent, setHtmlContent] = useState(false);
    const seeHtmlContent = () => {
        if (htmlContent) {
            setHtmlContent(false);
        } else {
            setHtmlContent(true);
        }
    }
    return (
        <>
            <div>
                <div className="d-flex" style={{ justifyContent: 'right' }}>
                    <div>
                        <button type="button" title="Edit Component" className={(edit.editing === props.data.id) ? 'd-none' : 'btn bgReturn ml-10 text-info'} style={{ border: '2px solid #00798C' }} onClick={e => edit.toggleContentEdit(props.data.id)}>
                            <span className='fa fa-pencil m-0 p-1'></span>
                            Edit
                        </button>
                        <button type="button" title="Save Component" className={(edit.editing === props.data.id) ? 'btn bgPreview ml-10 text-light' : 'd-none '} style={{ border: '2px solid #00798C' }} onClick={e => edit.toggleContentEdit('')} >
                            <span className='fa fa-check-circle m-0 p-1'></span>
                            Save
                        </button>
                        <button type="button" className={newSection  ? 'd-none' : 'btn btn-danger ml-10'}>
                            Delete
                        </button>
                    </div>
                    <div className={newSection ? 'd-flex' : 'd-none'}>
                        <button type="button" className='btn btn-danger ml-10'>
                            Cancel
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="courseName">
                                Position ID
                            </label>
                            <input type="text" name="positionID" disabled={edit.editing !== props.data.id} required id="courseName" className="form-control" placeholder="" value={props.data.position_id} aria-describedby="helpId" />
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="courseName">
                                Type
                            </label>
                            <select className='form-control' disabled={edit.editing !== props.data.id}>
                                <option value="html">HTML</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-6 d-flex'>
                        <div className="form-group mb-3 w-100">
                            <label className="label" htmlFor="courseName">
                                Title
                            </label>
                            <div className='d-flex align-center'>
                                <input type="text" name="courseName" disabled={edit.editing !== props.data.id} required id="courseName" className="form-control" placeholder="Input Title" value={props.data.title} aria-describedby="helpId" />
                                <span className={htmlContent ? 'fa fa-angle-up is-hoverable' : 'fa fa-angle-down is-hoverable'} style={{ lineHeight: '18px', padding: '10px' }} onClick={seeHtmlContent}></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={htmlContent ? 'd-block' : 'd-none'} >
                    <div className='col-lg-12'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="htmlType">
                                HTML Type
                            </label>
                            <select className='form-control' id="htmlType" disabled={edit.editing !== props.data.id} name="htmlType">
                                <option>Select Type</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className="form-group mb-3 w-100">
                            <label className="label" htmlFor="htmlContent">
                                HTML content
                            </label>
                            {/* <CKEditor
                                editor={ClassicEditor}
                                className="form-control"
                                name="htmlContent"
                                id="htmlContent"
                                rows="5"
                                required={true}
                                disabled={edit.editing !== props.data.id}
                                data={props.data.html_content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ data });
                                }}
                            /> */}
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="htmlUrl">
                                HTML URL
                            </label>
                            <select className='form-control mb-3' disabled={edit.editing !== props.data.id} name="htmlUrl" id="htmlUrl">
                                <option> Select file to upload </option>
                            </select>
                            <input className='form-control' disabled={edit.editing !== props.data.id} name="" value={props.data.html_url} placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}

export default Html