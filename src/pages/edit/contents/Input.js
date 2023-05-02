import React, { useState } from 'react'
import { useDetail } from '../../../providers/Detail';
import { useAuth } from '../../../providers/Auth';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHook } from '../../../providers/Hook';

export const Input = (props) => {
    const detail = useDetail();
    const auth = useAuth();
    const hook = useHook();
    let { id } = useParams();
    const [seeLess, setSeeLess] = useState(false)
    const [type, setType] = useState(props.data.type);
    const [pid, setPID] = useState(props.data.position_id);
    const [title, setTitle] = useState(props.data.title);
    const [html_type, setHtmlType] = useState(props.data.html_type);
    const [html_url, setHtmlUrl] = useState(props.data.html_url);
    const [html_content, setHtmlContent] = useState(props.data.html_content);
    const [htmldata, setHtmlData] = useState({
        lesson_id: props.data.lesson_id,
        id: props.data.id,
        type: type,
        position_id: pid,
        title: title,
        html_type: html_type,
        html_url: html_url,
        html_content: html_content,
    });

    const editComponent = (id) => {
        detail.toggleComponentEdit(id)
    }

    const deleteComponent = (id) => {
        if (detail.editComp) {

            NotificationManager.info('Deleting', 'Component', 6000);
            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${hook.api}/i/course-component/`,
                headers: {
                    'Authorization': auth.token
                },
                data: {
                    id: props.data.id
                }
            };

            axios(config)
                .then(function (response) {
                    if (response.data.message) {
                        NotificationManager.success('Deleted', 'Component', 6000, '', window.location.reload());
                    } else {
                        NotificationManager.error(response.data.detail, 'Component', 5000)
                    }
                    console.log(response);
                })
                .catch(function (error) {
                    NotificationManager.error(error.message, 'Component', 6000)
                });
        } else {
            NotificationManager.warning('Page cannot be edited', 'Delete');
        }
    }

    const toggleMore = () => {
        if (seeLess)
            setSeeLess(false)
        else
            setSeeLess(true)
    }

    const updateData = (e) => {
        setHtmlData({
            ...htmldata,
            [e.target.name]: e.target.value
        })
    }

    const updateHtmlCon = (name, value) => {
        setHtmlData({
            ...htmldata,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === "HT") {
            NotificationManager.info('Updating', 'Component', 6000);

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${hook.api}/i/course-component/`,
                headers: {
                    'Authorization': auth.token
                },
                data: htmldata
            };

            axios(config)
                .then(function (response) {
                    if (response.data.id) {
                        NotificationManager.success('Updated', 'Component', 6000);
                        detail.getDetails(id);
                        detail.toggleComponentEdit(id);
                    } else {
                        NotificationManager.error(response.data.detail, 'Component', 5000)
                    }
                    console.log(response);
                })
                .catch(function (error) {
                    NotificationManager.error(error.message, 'Component', 6000)
                });
        }
    }
    return (
        <>
            <NotificationContainer />
            <form id={props.id} onSubmit={(e) => handleSubmit(e)}>
                <div className={detail.editContent ? 'd-flex justify-content-end' : 'd-none'}>
                    <button className={(detail.activeComp === props.data.id) ? 'btn bgPreview' : 'd-none'} type={'submit'}>
                        Save
                    </button>
                    <button className={(detail.activeComp !== props.data.id) ? 'btn btn-primary' : 'd-none'} type={'button'} onClick={() => editComponent(props.data.id)} style={{ marginLeft: '10px' }}>
                        Edit
                    </button>
                    <button className={(detail.activeComp === props.data.id) ? 'btn btn-warning' : 'd-none'} type={'button'} onClick={() => editComponent(props.data.id)} style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                    <button className='btn btn-danger' type={'button'} onClick={() => deleteComponent(props.data.id)} style={{ marginLeft: '10px' }}>
                        Delete
                    </button>
                </div>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="position_id">
                                Position ID
                            </label>
                            <input
                                type="text"
                                name="position_id"
                                required
                                id="position_id"
                                className="form-control"
                                value={pid}
                                onChange={(e) => { updateData(e); setPID(e.target.value) }}
                                disabled={(detail.activeComp === props.data.id) ? false : true}
                            />
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="type">
                                Type
                            </label>
                            <select
                                name="type"
                                id="type"
                                className='form-control'
                                disabled={(detail.activeComp === props.data.id) ? false : true}
                                onChange={e => { updateData(e); setType(e.target.value) }}
                            >
                                {auth.componentOptions.map((option) => (
                                    <option key={option[0]} value={option[0]} selected={(type === option[0]) ? true : false}>
                                        {option[1]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-6 d-flex'>
                        <div className="form-group mb-3 w-100">
                            <label className="label" htmlFor="title">
                                Title
                            </label>
                            <div className='d-flex align-center'>
                                <input
                                    type="text"
                                    name="title"
                                    required id="title"
                                    className="form-control"
                                    placeholder="Input Title"
                                    value={title}
                                    onChange={e => { updateData(e); setTitle(e.target.value) }}
                                    disabled={(detail.activeComp === props.data.id) ? false : true}
                                />
                                <span className={seeLess ? 'fa fa-angle-up is-hoverable' : 'fa fa-angle-down is-hoverable'} style={{ lineHeight: '18px', padding: '10px' }} onClick={toggleMore}></span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={seeLess ? 'd-block' : 'd-none'}>
                    {/* Video component */}
                    {(type === "VI") ? (
                        <>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="videoType">
                                            Video Type
                                        </label>
                                        <select disabled={(detail.activeComp === props.data.id) ? false : true} className='form-control' id="videoType" name="videoType">
                                            <option value={props.data.video_type}>{props.data.video_type}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="videoHeader">
                                            Video Header
                                        </label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            className="form-control"
                                            name="videoHeader"
                                            id="videoHeader"
                                            rows="5"
                                            required={true}
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            data={props.data.video_header}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                console.log({ data });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="videoFooter">
                                            Video Footer
                                        </label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            className="form-control"
                                            name="videoFooter"
                                            id="videoFooter"
                                            rows="5"
                                            required={true}
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            data={props.data.video_footer}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                console.log({ data });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="recordedlUrl">
                                            Recorded URL
                                        </label>
                                        <input disabled={(detail.activeComp === props.data.id) ? false : true} className='form-control' name="recordedlUrl" id="recordedlUrl" value={props.data.recorded_url} placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="mobileUrl">
                                            Mobile URL
                                        </label>
                                        <input disabled={(detail.activeComp === props.data.id) ? false : true} className='form-control' name="mobileUrl" id="mobileUrl" value={props.data.mobile_url} placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="livelUrl">
                                            Live URL
                                        </label>
                                        <input disabled={(detail.activeComp === props.data.id) ? false : true} className='form-control' name="livelUrl" id="livelUrl" value={props.data.live_url} placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className="form-group mb-3">
                                                <div className='row'>
                                                    <label className="label mb-3 col-md-12" htmlFor="startDate">
                                                        Start Date & Time
                                                    </label>
                                                    <div className='col-sm-6'>
                                                        <input disabled={(detail.activeComp === props.data.id) ? false : true} type='date' className='form-control mb-3 ' name="startDate" id="startDate" />
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <input disabled={(detail.activeComp === props.data.id) ? false : true} type="time" className='form-control mb-3 col-sm-6' name="startTime" id="startTime" value={props.data.start_date_time} />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className="form-group mb-3">
                                                <div className='row'>
                                                    <label className="label mb-3 col-md-12" htmlFor="endDate">
                                                        End Date & Time
                                                    </label>
                                                    <div className='col-sm-6'>
                                                        <input disabled={(detail.activeComp === props.data.id) ? false : true} type='date' className='form-control mb-3' name="endDate" id="endDate" value={props.data.due_date_time} />
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <input disabled={(detail.activeComp === props.data.id) ? false : true} type="time" className='form-control mb-3' name="endTime" id="endTime" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}

                    {/* HTML component */}
                    {(type === "HT") ? (
                        <>
                            <div className='col-lg-12'>
                                <div className="form-group mb-3">
                                    <label className="label" htmlFor="html_type">
                                        HTML Type
                                    </label>
                                    <select
                                        className='form-control'
                                        id="html_type"
                                        name="htmlType"
                                        disabled={(detail.activeComp === props.data.id) ? false : true}
                                        onChange={(e) => { updateData(e); setHtmlType(e.target.value) }}
                                        required={true}
                                    >
                                        <option value={''}>Select Type</option>
                                        {auth.htmlOptions.map((option) => (
                                            <option key={option[0]} value={option[0]} selected={(html_type === option[0]) ? true : false}>
                                                {option[1]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className="form-group mb-3 w-100">
                                    <label className="label" htmlFor="html_content">
                                        HTML content
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        className="form-control"
                                        name="html_content"
                                        id="html_content"
                                        rows="5"
                                        required={true}
                                        style={{ minHeight: '80px' }}
                                        disabled={(detail.activeComp === props.data.id) ? false : true}
                                        data={html_content}
                                        onChange={(e, editor) => {
                                            const data = editor.getData();
                                            setHtmlContent(data);
                                            updateHtmlCon('html_content', data);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className="form-group mb-3">
                                    <label className="label" htmlFor="html_url">
                                        HTML URL
                                    </label>
                                    <input
                                        className='form-control'
                                        id="html_url"
                                        name="html_url"
                                        disabled={(detail.activeComp === props.data.id) ? false : true}
                                        placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7'
                                        value={html_url}
                                        onChange={(e) => { setHtmlUrl(e.target.value); updateData(e) }}
                                    />
                                </div>
                            </div>
                        </>
                    ) : null}

                    {/* EXERCISE component */}
                    {(type === "EX") ? (
                        <>
                            EXERCISE component
                        </>
                    ) : null}

                    {/* PR component */}
                    {(type === "PR") ? (
                        <>
                            PRIVATE component
                        </>
                    ) : null}

                    {/* iMAGE component */}
                    {(type === "IM") ? (
                        <>
                            IMAGE component
                        </>
                    ) : null}

                    {/* aUDIO component */}
                    {(type === "AU") ? (
                        <>
                            AUDIO component
                        </>
                    ) : null}
                </div>

            </form>
        </>
    )
}
