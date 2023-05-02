import React, { useEffect, useState } from 'react'
import { useHook } from '../../../providers/Hook';
import { useDetail } from '../../../providers/Detail';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAuth } from '../../../providers/Auth';
import { useParams } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

const Subsection = (props) => {
    let { id } = useParams();
    const hook = useHook();
    const auth = useAuth();
    const detail = useDetail();
    const [title, setTitle] = useState(props.data.title);
    const [positionID, setPositionID] = useState(props.data.position_id);
    const [overview, setOverview] = useState(props.data.overview);
    const [sectionID, setSectionID] = useState(props.data.id);
    const [done, setDone] = useState(false);

    const updatesubsection = (e) => {
        e.preventDefault();
        NotificationManager.info('Updating <br/>', 'Sub-section', 6000);

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-subsection/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "title": title,
                "id": sectionID,
                "overview": overview,
                "position_id": positionID
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    NotificationManager.success('Updated', 'Sub-section', 6000);
                    detail.getDetails(id);
                } else {
                    NotificationManager.error(response.data.detail, 'Sub-section', 5000)
                }
                console.log(response);
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'Sub-section', 6000)
            });
    }

    useEffect(() => {
        setTitle(props.data.title);
        setPositionID(props.data.position_id);
        setOverview(props.data.overview);
        setSectionID(props.data.id)
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
                                Sub section Title
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
                                onClick={updatesubsection}
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

export default Subsection