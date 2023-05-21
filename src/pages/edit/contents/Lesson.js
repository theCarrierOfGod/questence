import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHook } from '../../../providers/Hook';
import { useAuth } from '../../../providers/Auth';
import { useDetail } from '../../../providers/Detail';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import Component from './Component';

const Lesson = (props) => {
    let { id } = useParams();
    const hook = useHook();
    const auth = useAuth();
    const detail = useDetail();
    const [title, setTitle] = useState(props.data.title);
    const [positionID, setPositionID] = useState(props.data.position_id);
    const [lessonID, setLessonID] = useState();
    const [done, setDone] = useState(false);
    const componentPosition = detail.getComPosition(props.data, positionID);
    const [componentTitle, setComponentTitle] = useState('');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [key, setKey] = useState('0');

    const newComponent = () => {
        if (detail.editContent) {
            detail.toggleNewLesson();
            setKey(Math.random())
        } else {
            NotificationManager.warning('You have not turned on page editing', 'New Component')
        }
    }

    const saveComponent = () => {
        NotificationManager.info('Creating', 'Component', 6000);
        setIsLoading(true);

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-component/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "title": componentTitle,
                "lesson_id": lessonID,
                "position_id": componentPosition,
                "type": type,
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    detail.getDetails(id);
                    detail.lessonChanges(lessonID);
                    NotificationManager.success('Created', 'Component', 6000);
                    detail.toggleNewLesson();
                    setIsLoading(false);
                } else {
                    NotificationManager.error(response.data.detail, 'Component', 5000)
                    setIsLoading(false);
                }
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'Component', 6000)
                setIsLoading(false);
            });
    }

    useEffect(() => {
        detail.setLessonTitle(props.data.title);
        detail.setLessonPositionID(props.data.position_id);
        detail.setLessonID(props.data.id);
        detail.setLessonVisibility(props.data.visible);
        return () => {
            setDone(true);
        }
    }, [props.data.id])

    useEffect(() => {
        setTitle(props.data.title);
        setPositionID(props.data.position_id);
        setLessonID(props.data.id)
        setIsLoading(false);
        console.log(props.data)
        return () => {
            setDone(true);
        }
    }, [detail.content]);

    return (
        <>
            <NotificationContainer />
            <form>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div class="form-group mt-2">
                            <label className="label" for="">
                                Position ID
                            </label>
                            <input
                                type='text'
                                placeholder='01'
                                value={detail.lessonPositionID}
                                name={'positionID'}
                                className='form-control'
                                disabled={detail.readOnly}
                            />
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div class="form-group mt-2">
                            <label className="label" for="">
                                Lesson Title
                            </label>
                            <input
                                type='text'
                                placeholder='Input title'
                                name={'setionTitle'}
                                value={detail.lessonTitle}
                                className='form-control'
                                onChange={e => detail.setLessonTitle(e.target.value)}
                                disabled={detail.readOnly} />
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
                                    onChange={e => detail.setLessonVisibility(e.target.value)}
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
                                    onChange={e => detail.setLessonVisibility(e.target.value)}
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

            <div className='row mt-5'>
                <div className="form-group mb-3">
                    <div className='d-flex justify-content-between alignCenter mb-2'>
                        <label className="label mb-0 p-0" htmlFor="courseCode">
                            Components
                        </label>
                        <div>
                            <div className={detail.fetchingLesson ? 'fa fa-recycle fa-spin' : 'd-none'} ></div>
                            <button type="button" className={!detail.newLesson ? 'btn bgPreview' : 'd-none'} onClick={newComponent} style={{ marginLeft: '10px' }}>
                                New
                            </button>
                            <button type="button" className={detail.newLesson ? 'btn btn-danger' : 'd-none'} onClick={newComponent} style={{ marginLeft: '10px' }}>
                                Cancel
                            </button>
                            <button type="button" className={detail.newLesson ? 'btn btn-success' : 'd-none'} onClick={saveComponent} style={{ marginLeft: '10px' }}>
                                {isLoading ? (
                                    <>
                                        <span className='fa fa-spinner fa-spin'></span>
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </button>
                        </div>
                    </div>
                    <hr />

                    <div className={detail.newLesson ? 'row' : 'd-none'}>
                        <div className='col-md-3'>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseName">
                                    Position ID
                                </label>
                                <input
                                    type="text"
                                    name="positionID"
                                    required
                                    id="courseName"
                                    className="form-control"
                                    placeholder=""
                                    value={detail.getComPosition(props.data, positionID)}
                                    aria-describedby="helpId"
                                    disabled={detail.readOnly}
                                />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseName">
                                    Type
                                </label>
                                <select className='form-control' disabled={detail.readOnly} onChange={e => setType(e.target.value)}>
                                    <option value={null}>
                                        Select a type
                                    </option>
                                    {auth.componentOptions.map((option) => (
                                        <option key={option['V']} value={option['V']}>
                                            {option['D']}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-6 d-flex'>
                            <div className="form-group mb-3 w-100">
                                <label className="label" htmlFor="courseName">
                                    Title
                                </label>
                                <div className='d-flex align-center'>
                                    <input
                                        type="text"
                                        name="componentTitle"
                                        required id="courseName"
                                        className="form-control"
                                        placeholder="Input Title"
                                        value={componentTitle}
                                        onChange={e => setComponentTitle(e.target.value)}
                                        aria-describedby="helpId"
                                        disabled={detail.readOnly}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr />
                    </div>
                    {props.data.components ? (
                        <>
                            {(props.data.components.length !== 0) ? (
                                <>
                                    <Component data={props.data.components} key={key} />
                                </>
                            ) : null}
                        </>
                    ) : (null)}

                </div>
            </div>
        </>
    )
}

export default Lesson