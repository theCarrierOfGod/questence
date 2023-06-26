import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useDetail } from '../../../../providers/Detail';
import { useAuth } from '../../../../providers/Auth';
import { useHook } from '../../../../providers/Hook';
import swal from 'sweetalert';
import { useEdit } from '../../../../providers/Edit';

export const Input = (props) => {
    const detail = useDetail();
    const auth = useAuth();
    const hook = useHook();
    const edit = useEdit();
    let { id } = useParams();
    const [seeLess, setSeeLess] = useState(false)
    const [type, setType] = useState(props.data.type);
    const [pid, setPID] = useState(props.data.position_id);
    const [title, setTitle] = useState(props.data.title);
    const [isLoading, setIsLoading] = useState(false);
    const [deleting, setDeleting] = useState(false)
    const [showMen, setShowMen] = useState(false);

    // html data
    const [html_type, setHtmlType] = useState(props.data.html_type);
    const [html_url, setHtmlUrl] = useState(props.data.html_url);
    const [html_content, setHtmlContent] = useState(props.data.html_content);

    //video data
    const [video_type, setvideoType] = useState(props.data.video_type);
    const [video_header, setVideoHeader] = useState(props.data.video_header);
    const [video_footer, setVideoFooter] = useState(props.data.video_footer);
    const [recorded_url, setMobileUrl] = useState(props.data.recorded_url);
    const [mobile_url, setRecorderUrl] = useState(props.data.recorded_url);
    const [live_url, setLiveUrl] = useState(props.data.recorded_url);
    const [due_date_time, setDueDate] = useState(props.data.due_date_time)
    const [starting_date_time, setStartingDate] = useState(props.data.starting_date_time);

    //image data
    const [image_header, setImageHeader] = useState(props.data.image_header);
    const [image_footer, setImageFooter] = useState(props.data.vidimage_footereo_footer);
    const [image_url, setImageUrl] = useState(props.data.image_url);

    // exercise data
    const [exercise_type, setExerciseType] = useState(props.data.exercise_type);
    const [grading_weight, setGradingWeight] = useState(props.data.grading_weight);
    const [total_score, settotalScore] = useState(props.data.total_score);
    const [available_date_time, setAvailableDateTime] = useState(props.data.available_date_time);
    const [start_date_time, setStartDate] = useState(props.data.start_date_time);
    const [duration, setDuration] = useState(props.data.duration);
    const [show_allocated_score, setShowAllocatedScore] = useState(props.data.show_allocated_score);
    const [show_hint, setShowHint] = useState(props.data.show_hint);
    const [show_answer, setShowAnswer] = useState(props.data.show_answer);
    const [exercise_overview, setExerciseOverview] = useState(props.data.exercise_overview);

    useEffect(() => {
        setShowMen(false)
    }, [props.key]);

    const [patchData, setPatchData] = useState({
        lesson_id: props.data.lesson_id,
        id: props.data.id,
        type: type,
        position_id: pid,
        title: title,
        html_type: html_type,
        html_url: html_url,
        html_content: html_content,
        video_type: video_type,
        video_footer: video_footer,
        video_header: video_header,
        recorded_url: recorded_url,
        mobile_url: mobile_url,
        live_url: live_url,
        starting_date_time: starting_date_time,
        due_date_time: due_date_time,
        image_footer: image_footer,
        image_header: image_header,
        image_url: image_url,
        exercise_type: exercise_type,
        grading_weight: grading_weight,
        total_score: total_score,
        available_date_time: available_date_time,
        start_date_time: start_date_time,
        duration: duration,
        show_hint: show_hint,
        show_answer: show_answer,
        show_allocated_score: show_allocated_score,
    });

    const editComponent = (id) => {
        if (edit.unsaved) {
            swal({
                title: "Cancel Component Editing?",
                text: "All unsaved changes will be gone, do you want to proceed?",
                icon: "warning",
                buttons: ['Continue Editing', 'Cancel Editing'],
                dangerMode: true,
            }).then((willCancel) => {
                if (willCancel) {
                    detail.toggleComponentEdit(id)
                } else {
                    return false;
                }
            })
        } else {
            detail.toggleComponentEdit(id)
        }
    }

    const deleteComponent = (id) => {
        swal({
            title: "Delete Component",
            text: "Are you sure you want to delete this component?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            timer: 5000,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setDeleting(true)
                    let config = {
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
                                setDeleting(false)
                                detail.lessonChanges(props.data.lesson_id);
                                swal({
                                    title: "Delete Component",
                                    text: "Deleted",
                                    icon: "success",
                                    buttons: false,
                                    dangerMode: true,
                                    timer: 5000
                                })
                            } else {
                                swal({
                                    title: "Delete Component",
                                    text: response.data.detail,
                                    icon: "error",
                                    buttons: true,
                                    dangerMode: true,
                                    timer: 5000
                                })
                                setDeleting(false)
                            }
                        })
                        .catch(function (error) {
                            swal({
                                title: "Delete Component",
                                text: error.message,
                                icon: "error",
                                buttons: false,
                                dangerMode: true,
                                timer: 5000
                            })
                            setDeleting(false)
                        });
                } else {
                    swal({
                        title: "Delete Component",
                        text: "Cancelled by user",
                        icon: "error",
                        buttons: false,
                        dangerMode: true,
                        timer: 5000
                    })
                }
            });
    }

    const toggleMore = () => {
        if (seeLess)
            setSeeLess(false)
        else
            setSeeLess(true)
    }

    const updateData = (e) => {
        setPatchData({
            ...patchData,
            [e.target.name]: e.target.value
        })
    }

    const updateEditorCon = (name, value) => {
        setPatchData({
            ...patchData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        swal({
            title: "Lesson Component",
            text: "Updating",
            icon: "info",
            buttons: false,
            timer: 5000
        })
        setIsLoading(true)
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-component/`,
            headers: {
                'Authorization': auth.token
            },
            data: patchData
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    swal({
                        title: "Lesson Component",
                        text: "Updated",
                        icon: "success",
                        buttons: false,
                        timer: 5000
                    })
                    edit.setUnsaved(false)
                    detail.getDetails(id);
                    detail.toggleComponentEdit(id);
                    detail.lessonChanges(props.data.lesson_id);
                    setIsLoading(false)
                } else {
                    swal({
                        title: "Lesson Component",
                        text: response.data.detail,
                        icon: "error",
                        buttons: false,
                        dangerMode: true,
                        timer: 5000
                    })
                    setIsLoading(false)
                }
            })
            .catch(function (error) {
                swal({
                    title: "Lesson Component",
                    text: error.message,
                    icon: "error",
                    buttons: false,
                    dangerMode: true,
                    timer: 5000
                })
                setIsLoading(false)
            });
    }

    const toogleshowMen = () => {
        if (showMen) {
            setShowMen(false)
        } else {
            setShowMen(true)
        }
    }
    return (
        <>
            <form id={props.id} onSubmit={(e) => handleSubmit(e)}>
                <div className={'d-flex justify-content-end'}>
                    <button className={((detail.activeComp === props.data.id)) ? 'btn bgPreview' : 'd-none'} type={'submit'}>
                        {isLoading ? (
                            <>
                                <span className='fa fa-spinner fa-spin'></span>
                            </>
                        ) : (
                            'Save'
                        )}
                    </button>

                    <button className={(detail.activeComp === props.data.id) ? 'btn btn-warning' : 'd-none'} type={'button'} onClick={() => editComponent(props.data.id)} style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>

                    <div class={`${((detail.activeComp !== props.data.id) && !edit.disableGradingNew) ? 'ellMenu' : 'd-none'}`}>
                        <div className={''}>
                            <span className='fa fa-ellipsis-v sm-menu-btn' onClick={() => toogleshowMen()}></span>
                        </div>
                        <ul className='editMenu'>
                            <li className='sm-menu-link' onClick={() => { editComponent(props.data.id); toogleshowMen() }}>
                                Edit
                            </li>
                            <li className='sm-menu-link' onClick={() => { deleteComponent(props.data.id); toogleshowMen() }}>
                                Delete
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-3 col-4'>
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
                    <div className='col-lg-3 col-3'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="type">
                                Type
                            </label>
                            <select
                                name="type"
                                id="type"
                                className='form-select'
                                disabled={(detail.activeComp === props.data.id) ? false : true}
                                onChange={e => { updateData(e); setType(e.target.value) }}
                            >
                                {auth.componentOptions.map((option) => (
                                    <>
                                        <option key={option['V']} value={option['V']} className={(option['V'] === 'AU' || option['V'] === 'PR') ? 'd-none ' : 'd-block'} selected={(type === option['V']) ? true : false}>
                                            {option['D']}
                                        </option>
                                    </>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-6 col-5 d-flex'>
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
                                <span className={seeLess ? 'fa fa-angle-up is-hoverable' : 'fa fa-angle-down is-hoverable'} style={{ lineHeight: '18px', padding: '5px 10px' }} onClick={toggleMore}></span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={seeLess ? 'd-block' : 'd-none'}>
                    {/* Video component done */}
                    {(type === "VI") ? (
                        <>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="videoType">
                                            Video Type
                                        </label>
                                        <select
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            onChange={(e) => { updateData(e); setvideoType(e.target.value) }}
                                            className='form-select'
                                            id="video_type"
                                            name="video_type">
                                            <option value={''}>Select Type</option>
                                            {auth.videosOptions.map((option) => (
                                                <option key={option['V']} value={option['V']} selected={(video_type === option['V']) ? true : false}>
                                                    {option['D']}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="video_header">
                                            Video Header
                                        </label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            className="form-control"
                                            name="video_header"
                                            id="video_header"
                                            rows="5"
                                            required={true}
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            data={props.data.video_header}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setVideoHeader(data);
                                                updateEditorCon('video_header', data);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="video_footer">
                                            Video Footer
                                        </label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            className="form-control"
                                            name="video_footer"
                                            id="video_footer"
                                            rows="5"
                                            required={true}
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            data={props.data.video_footer}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setVideoFooter(data);
                                                updateEditorCon('video_footer', data);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="recorded_url">
                                            Recorded URL
                                        </label>
                                        <input
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            onChange={(e) => { updateData(e); setRecorderUrl(e.target.value) }}
                                            className='form-control'
                                            name="recorded_url"
                                            id="recorded_url"
                                            value={props.data.recorded_url}
                                            placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="mobile_url">
                                            Mobile URL
                                        </label>
                                        <input
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            onChange={(e) => { updateData(e); setMobileUrl(e.target.value) }}
                                            className='form-control'
                                            name="mobile_url"
                                            id="mobile_url"
                                            value={props.data.mobile_url}
                                            placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="livel_url">
                                            Live URL
                                        </label>
                                        <input
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            onChange={(e) => { updateData(e); setLiveUrl(e.target.value) }}
                                            className='form-control'
                                            name="livel_url"
                                            id="livel_url"
                                            value={props.data.live_url}
                                            placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className="form-group mb-3">
                                                <div className='row'>
                                                    <label className="label mb-3 col-md-12" htmlFor="starting_date_time">
                                                        Start Date & Time
                                                    </label>
                                                    <div className='col-sm-12'>
                                                        <input
                                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                                            type='datetime-local'
                                                            className='form-control mb-3 '
                                                            name="starting_date_time"
                                                            id="starting_date_time"
                                                            value={starting_date_time}
                                                            onChange={(e) => { updateData(e); setStartingDate(e.target.value) }}
                                                        />
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
                                                    <div className='col-sm-12'>
                                                        <input
                                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                                            type='datetime-local'
                                                            className='form-control mb-3 '
                                                            name="due_date_time"
                                                            id="due_date_time"
                                                            value={due_date_time}
                                                            onChange={(e) => { updateData(e); setDueDate(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <br></br>
                        </>
                    ) : null}

                    {/* HTML component done */}
                    {(type === "HT") ? (
                        <>
                            <div className='col-lg-12'>
                                <div className="form-group mb-3">
                                    <label className="label" htmlFor="html_type">
                                        HTML Type
                                    </label>
                                    <select
                                        className='form-select'
                                        id="html_type"
                                        name="htmlType"
                                        disabled={(detail.activeComp === props.data.id) ? false : true}
                                        onChange={(e) => { updateData(e); setHtmlType(e.target.value) }}
                                        required={true}
                                    >
                                        <option value={''}>Select Type</option>
                                        {auth.htmlOptions.map((option) => (
                                            <option key={option['V']} value={option['V']} selected={(html_type === option['V']) ? true : false}>
                                                {option['D']}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={(html_type === 'HT') ? 'col-lg-12' : 'd-none'}>
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
                                            updateEditorCon('html_content', data);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={(html_type === 'IF') ? 'col-lg-12' : 'd-none'}>
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
                            <hr />
                            <br></br>
                        </>
                    ) : null}

                    {/* EXERCISE component */}
                    {(type === "EX") ? (
                        <>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="exercise_type">
                                            Excercise Type
                                        </label>
                                        <select className='form-select' id="exercise_type" name="exercise_type"
                                            disabled={(detail.activeComp === props.data.id) ? false : true}>
                                            <option value={''}>Select Type</option>
                                            {auth.exerciseOptions.map((option) => (
                                                <option key={option['V']} value={option['V']} selected={(exercise_type === option['V']) ? true : false}>
                                                    {option['D']}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* grading weight  */}
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="grading_weight">
                                            Grading Weight
                                        </label>
                                        <input
                                            className='form-control'
                                            name={'grading_weight'}
                                            value={grading_weight}
                                            id={grading_weight}
                                            placeholder='0'
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            onChange={(e) => { updateData(e); setGradingWeight(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="total_score">
                                            Total Score
                                        </label>
                                        <input
                                            className='form-control'
                                            name={'total_score'}
                                            value={total_score}
                                            placeholder='0'
                                            onChange={(e) => { updateData(e); settotalScore(e.target.value) }}
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <div className='row'>
                                            <label className="label mb-3 col-md-12" htmlFor="available_date_time">
                                                Available Date & Time
                                            </label>
                                            <div className='col-sm-12'>
                                                <input
                                                    type='datetime-local'
                                                    className='form-control mb-3 '
                                                    name={'available_date_time'}
                                                    disabled={(detail.activeComp === props.data.id) ? false : true}
                                                    id="available_date_time"
                                                    onChange={(e) => { updateData(e); setAvailableDateTime(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <div className='row'>
                                            <label className="label mb-3 col-md-12" htmlFor="start_date_time">
                                                Start Date & Time
                                            </label>
                                            <div className='col-sm-12'>
                                                <input
                                                    type='datetime-local'
                                                    className='form-control mb-3 '
                                                    name={'start_date_time'}
                                                    disabled={(detail.activeComp === props.data.id) ? false : true}
                                                    id="start_date_time"
                                                    value={start_date_time}
                                                    onChange={(e) => { updateData(e); setStartDate(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label className="label mb-3 col-md-12" htmlFor="duration">
                                            Duration
                                        </label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder='input duration'
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            name={'duration'}
                                            onChange={(e) => { updateData(e); setDuration(e.target.value) }}
                                            id="duration"
                                            value={duration}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <div className='row'>
                                            <label className="label mb-3 col-md-12" htmlFor="startDate">
                                                Due Date & Time
                                            </label>
                                            <div className='col-sm-12'>
                                                <input
                                                    type='datetime-local'
                                                    className='form-control mb-3 '
                                                    disabled={(detail.activeComp === props.data.id) ? false : true}
                                                    name="due_date_time"
                                                    id="due_date_time"
                                                    value={due_date_time}
                                                    onChange={(e) => { updateData(e); setDueDate(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-4'>
                                    <div className="form-group mb-3">
                                        <label className="label mb-3 col-md-12" htmlFor="show_allocated_score">
                                            Show allocated score
                                        </label>
                                        <select
                                            name="show_allocated_score"
                                            className='form-select'
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            onChange={(e) => { updateData(e); setShowAllocatedScore(e.target.value) }}
                                        >
                                            <option value={show_allocated_score}>Select option</option>
                                            <option value={true} selected={(show_allocated_score === true) ? true : false}>True</option>
                                            <option value={false} selected={(show_allocated_score !== true) ? true : false}>False</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className="form-group mb-3">
                                        <label className="label mb-3 col-md-12" htmlFor="show_hint">
                                            Show hint
                                        </label>
                                        <select
                                            name="show_hint"
                                            className='form-select'
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            onChange={(e) => { updateData(e); setShowHint(e.target.value) }}>
                                            <option value={show_hint}>Select option</option>
                                            <option value={true} selected={(show_hint === true) ? true : false}>True</option>
                                            <option value={false} selected={(show_hint !== true) ? true : false}>False</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className="form-group mb-3">
                                        <label className="label mb-3 col-md-12" htmlFor="show_answer">
                                            Show answer
                                        </label>
                                        <select
                                            name="show_answer"
                                            className='form-select'
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            onChange={(e) => { updateData(e); setShowAnswer(e.target.value) }}>
                                            <option value={show_answer}>Select option</option>
                                            <option value={true} selected={(show_answer === true) ? true : false}>True</option>
                                            <option value={false} selected={(show_answer !== true) ? true : false}>False</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <br></br>
                        </>
                    ) : null}

                    {/* iMAGE component done */}
                    {(type === "IM") ? (
                        <>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="image_header">
                                            Image Header
                                        </label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            className="form-control"
                                            name="image_header"
                                            id="image_header"
                                            rows="5"
                                            required={true}
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            data={props.data.image_header}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setImageHeader(data);
                                                updateEditorCon('image_header', data);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="image_footer">
                                            Image Footer
                                        </label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            className="form-control"
                                            name="image_footer"
                                            id="image_footer"
                                            rows="5"
                                            required={true}
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            data={props.data.image_footer}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setImageFooter(data);
                                                updateEditorCon('image_footer', data);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="image_url">
                                            Image URL
                                        </label>
                                        <input
                                            disabled={(detail.activeComp === props.data.id) ? false : true}
                                            onChange={(e) => { updateData(e); setImageUrl(e.target.value) }}
                                            className='form-control'
                                            name="image_url"
                                            id="image_url"
                                            value={props.data.image_url}
                                            placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <br></br>
                        </>
                    ) : null}
                </div>

            </form>
        </>
    )
}
