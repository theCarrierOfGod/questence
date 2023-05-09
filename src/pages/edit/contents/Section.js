import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react'
import { useHook } from '../../../providers/Hook';
import { useDetail } from '../../../providers/Detail';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../providers/Auth';

const Section = (props) => {
    let { id } = useParams();
    const hook = useHook();
    const auth = useAuth();
    const detail = useDetail();
    const [title, setTitle] = useState(props.data.title);
    const [positionID, setPositionID] = useState(props.data.position_id);
    const [overview, setOverview] = useState(props.data.overview);
    const [done, setDone] = useState(false);

    const updateSection = (e) => {
        e.preventDefault();
        NotificationManager.info('Updating', 'Section', 6000);

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-section/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "title": title,
                "id":  props.data.id,
                "overview": overview,
                "position_id": positionID
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    NotificationManager.success('Updated', 'Section', 6000);
                    detail.getDetails(id);
                } else {
                    NotificationManager.error(response.data.detail, 'Section', 5000)
                }
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'Section', 6000)
            });
    }

    useEffect(() => {
        setTitle(props.data.title);
        setPositionID(props.data.position_id);
        setOverview(props.data.overview);
        return () => {
            setDone(true);
        }
    }, [props.data.id])
    return (
        <>
            <form>
                <div className='row mb-5'>
                    <div className='col-lg-6'>
                        <div class="form-group mt-2">
                            <label className="label" for="">
                                Position ID
                            </label>
                            <input
                                type='text'
                                placeholder='01'
                                value={positionID}
                                name={'positionID'}
                                className='form-control'
                                disabled={detail.readOnly}
                                onChange={e => setPositionID(e.target.value)}
                            />
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
                                value={title}
                                className='form-control'
                                onChange={e => setTitle(e.target.value)}
                                disabled={detail.readOnly} />
                        </div>
                    </div>
                    <div className='col-lg-12'>
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
                                disabled={detail.readOnly}
                                data={overview}
                                onChange={(event, editor) => {
                                    setOverview(editor.getData());
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
                                disabled={detail.readOnly}
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
                                disabled={detail.readOnly}
                            >
                                <option>Select group</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-12 d-flex justify-content-start'>
                        <div className='form-group mt-3'>
                            <button
                                className='btn btn-success'
                                disabled={detail.readOnly}
                                onClick={updateSection}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Section