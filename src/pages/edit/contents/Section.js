import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react'
import { useDetail } from '../../../providers/Detail';
import { NotificationContainer } from 'react-notifications';

const Section = (props) => {
    const detail = useDetail();
    const [done, setDone] = useState(false);

    useEffect(() => {
        detail.setSectionTitle(props.data.title);
        detail.setSectionPositionID(props.data.position_id);
        detail.setSectionOverview(props.data.overview);
        detail.setSectionID(props.data.id);
        detail.setSectionVisibility(props.data.visible);
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
                                value={detail.sectionPositionID}
                                name={'positionID'}
                                className='form-control'
                                disabled={detail.readOnly}
                            />
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div class="form-group mt-2">
                            <label className="label" for="">
                                Section Title
                            </label>
                            <input
                                type='text'
                                placeholder='Input title'
                                name={'setionTitle'}
                                value={detail.sectionTitle}
                                className='form-control'
                                onChange={e => detail.setSectionTitle(e.target.value)}
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
                                data={detail.sectionOverview}
                                onChange={(event, editor) => {
                                    detail.setSectionOverview(editor.getData());
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
                                    onChange={e => detail.setSectionVisibility(e.target.value)}
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
                                    onChange={e => detail.setSectionVisibility(e.target.value)}
                                    defaultChecked={props.data.visible === false}
                                    disabled={detail.readOnly}
                                /> No
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Section