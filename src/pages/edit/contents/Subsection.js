import React, { useEffect, useState } from 'react'
import { useHook } from '../../../providers/Hook';
import { useDetail } from '../../../providers/Detail';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAuth } from '../../../providers/Auth';
import { useParams } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import axios from 'axios';

const Subsection = (props) => {
    let { id } = useParams();
    const detail = useDetail();
    const [done, setDone] = useState(false);


    useEffect(() => {
        detail.setSubsectionTitle(props.data.title);
        detail.setSubsectionPositionID(props.data.position_id);
        detail.setSubsectionOverview(props.data.overview);
        detail.setSubsectionID(props.data.id);
        detail.setSubSectionVisibility(props.data.visible);
        console.log(props.data.visible);
        return () => {
            setDone(true);
        }
    }, [props.data.id])

    return (
        <>
            <NotificationContainer />
            <form>
                <div className='row mb-5'>
                    <div className='col-lg-3'>
                        <div class="form-group mt-2">
                            <label className="label" for="">
                                Position ID
                            </label>
                            <input
                                type='text'
                                placeholder='01'
                                defaultValue={detail.subsectionPositionID}
                                name={'positionID'}
                                className='form-control'
                                disabled={detail.readOnly}
                            />
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div class="form-group mt-2">
                            <label className="label" for="">
                                Sub section Title
                            </label>
                            <input
                                type='text'
                                placeholder='Input title'
                                name={'setionTitle'}
                                defaultValue={detail.subsectionTitle}
                                className='form-control'
                                onChange={e => detail.setSubsectionTitle(e.target.value)}
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
                                data={detail.subsectionOverview}
                                onChange={(event, editor) => {
                                    detail.setSubsectionOverview(editor.getData());
                                    console.log(editor.getData());
                                }}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className="form-check form--inline mt-2 p-0">
                            <small className='label' style={{ marginRight: '40px' }}>
                                Visibility
                            </small>
                            <label className="form-check-label" style={{ marginRight: '30px' }}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="visible"
                                    id=""
                                    value={true}
                                    onChange={e => detail.setSubSectionVisibility(e.target.value)}
                                    defaultChecked={props.data.visible === true}
                                    disabled={detail.readOnly}
                                /> Yes
                            </label>

                            <label className="form-check-label" style={{ marginRight: '30px' }}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="visible"
                                    id=""
                                    value={false}
                                    onChange={e => detail.setSubSectionVisibility(e.target.value)}
                                    defaultChecked={props.data.visible === false}
                                    disabled={detail.readOnly}
                                /> No
                            </label>
                        </div>
                    </div>
                    <div className='col-lg-6 d-none'>
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
                </div>
            </form>
        </>
    )
}

export default Subsection