import React from 'react'
import { useState } from 'react';
import { useEdit } from '../../../providers/Edit';
import { useHook } from '../../../providers/Hook'
import Html from './Html';
import Video from './Video';
// import CodeEditor from '@uiw/react-textarea-code-editor';
import Exercise from './Exercise';
import { useEditCon } from '../../../providers/EditContent';
import bootbox from 'bootbox';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const SectionForm = (props) => {
    const hook = useHook();
    const edit = useEdit();
    const subEdit = useEditCon();
    const [newSection, setNewSection] = useState(false);
    const [deletes, setDelete] = useState(false);
    const [htmlContent, setHtmlContent] = useState(false);
    const [videoContent, setVideoContent] = useState(false);
    const toggleNewSection = () => {
        if (edit.isEdit) {
            if (newSection) {
                setNewSection(false);
            } else {
                setNewSection(true);
            }
        }
    }

    const toggleDelete = () => {
        if (edit.isEdit) {
            if (deletes) {
                setDelete(false);
            } else {
                setDelete(true);
            }
        }
    }

    const toggleNew = () => {

    }

    const submitForm = () => {
        if (edit.isEdit) {
            bootbox.alert('clicked!');
        }
    }



    return (
        <>
            {props.title === '' ? (
                <>
                    <div className='row mb-5'>
                        {console.log(props.data)}
                        <div className='col-lg-12'>
                            <pre className='text-center'>
                                Select a section!
                            </pre>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {props.title === 'Lesson' ? (
                        <>
                            <form>
                                <div className='row mb-5'>
                                    {console.log(props.data)}
                                    <div className='col-lg-6'>
                                        <div class="form-group mt-2">
                                            <label className="label" for="">
                                                Position ID
                                            </label>
                                            <input type='text' placeholder='01' value={props.data.position_id} name={'positionID'} className='form-control' disabled={subEdit.readOnly} />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div class="form-group mt-2">
                                            <label className="label" for="">
                                                Section Title
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='Input title'
                                                name={'setionTitle'}
                                                value={props.data.title}
                                                className='form-control'
                                                disabled={subEdit.readOnly} />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div class="form-group mt-3">
                                            <label className="label" for="visibility">Visibility</label>
                                            <select
                                                class="form-control"
                                                id="sectionVisibility"
                                                disabled={subEdit.readOnly}
                                                name={'sectionVisibility'}
                                            >
                                                <option>Select one</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div class="form-group mt-3">
                                            <label className="label" for="editable_by">Editable By</label>
                                            <select
                                                class="form-control"
                                                name={'editableBy'}
                                                id="editable_by"
                                                disabled={subEdit.readOnly}
                                            >
                                                <option>Select group</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className='row'>
                                <div className="form-group mb-3">
                                    <div className='d-flex justify-content-between alignCenter mb-2'>
                                        <label className="label mb-0 p-0" htmlFor="courseCode">
                                            Components
                                        </label>
                                        <button type="button" className={newSection ? 'd-none' : 'btn bgPreview'}>
                                            New
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            {props.data.components.map((component) => (
                                <div key={component.id}>
                                    {(component.type === "VI") ? (
                                        <>
                                            <Video data={component} />
                                        </>
                                    ) : (
                                        <>
                                            {(component.type === "HT") ? (
                                                <>
                                                    <Html data={component} />
                                                </>
                                            ) : (
                                                <>
                                                    {(component.type === "EX") ? (
                                                        <>
                                                            <Exercise data={component} />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>
                                                                Unknown Type
                                                            </p>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <form>
                                <div className='row mb-5'>
                                    {console.log(props.data)}
                                    <div className='col-lg-6'>
                                        <div class="form-group mt-2">
                                            <label className="label" for="">
                                                Position ID
                                            </label>
                                            <input type='text' placeholder='01' value={props.data.position_id} name={'positionID'} className='form-control' disabled={subEdit.readOnly} />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div class="form-group mt-2">
                                            <label className="label" for="">
                                                {props.title} Title
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='Input title'
                                                name={'setionTitle'}
                                                value={props.data.title}
                                                className='form-control'
                                                disabled={subEdit.readOnly} />
                                        </div>
                                    </div>
                                    <div className={hook.contLess ? 'd-none' : 'col-lg-12'}>
                                        <div class="form-group mt-2">
                                            <label className="label" for="overview">
                                                {props.title} Overview
                                            </label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                className="form-control"
                                                name="overview"
                                                id="overview"
                                                rows="5"
                                                required={true}
                                                disabled={subEdit.readOnly}
                                                data={props.data.overview}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    console.log({ data });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div class="form-group mt-3">
                                            <label className="label" for="visibility">Visibility</label>
                                            <select
                                                class="form-control"
                                                id="sectionVisibility"
                                                disabled={subEdit.readOnly}
                                                name={'sectionVisibility'}
                                            >
                                                <option>Select one</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div class="form-group mt-3">
                                            <label className="label" for="editable_by">Editable By</label>
                                            <select
                                                class="form-control"
                                                name={'editableBy'}
                                                id="editable_by"
                                                disabled={subEdit.readOnly}
                                            >
                                                <option>Select group</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </>
            )
            }
        </>
    )
}

export default SectionForm
