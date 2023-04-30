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
    const [componentPosition, setComponentPosition] = useState(props.data.position_id + ".01")
    const [componentTitle, setComponentTitle] = useState('');
    const [type, setType] = useState('');

    const updateLesson = (e) => {
        e.preventDefault();
        NotificationManager.info('Updating', 'Lesson', 6000);

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-lesson/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "title": title,
                "id": lessonID,
                "position_id": positionID
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    NotificationManager.success('Updated', 'Lesson', 6000);
                    detail.getDetails(id);
                } else {
                    NotificationManager.error(response.data.detail, 'Lesson', 5000)
                }
                console.log(response);
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'Lesson', 6000)
            });
    }

    const newComponent = () => {
        if (detail.editContent) {
            detail.toggleNewLesson();
        } else {
            NotificationManager.warning('You have not turned on page editing', 'New Component')
        }
    }

    const saveComponent = () => {
        NotificationManager.info('Creating', 'Component', 6000);

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
                    NotificationManager.success('Created', 'Component', 6000);
                    detail.toggleNewLesson();
                } else {
                    NotificationManager.error(response.data.detail, 'Component', 5000)
                }
                console.log(response);
            })
            .catch(function (error) {
                NotificationManager.error(error.message, 'Component', 6000)
            });
    }

    useEffect(() => {
        setTitle(props.data.title);
        setPositionID(props.data.position_id);
        setLessonID(props.data.id)
        return () => {
            setDone(true);
        }
    }, [detail.content]);

    return (
        <>
            <NotificationContainer />
            <form>
                <div className='row'>
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
                                Lesson Title
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
                    <div className={detail.readOnly ? 'd-none' : 'col-lg-12 d-flex justify-content-start'}>
                        <div className='form-group mt-3'>
                            <button
                                className='btn btn-success'
                                disabled={detail.readOnly}
                                onClick={updateLesson}
                            >
                                Save
                            </button>
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
                            <button type="button" className={!detail.newLesson ? 'btn bgPreview' : 'd-none'} onClick={newComponent} style={{ marginLeft: '10px'}}>
                                New
                            </button>
                            <button type="button" className={detail.newLesson ? 'btn btn-danger' : 'd-none'} onClick={newComponent} style={{ marginLeft: '10px'}}>
                                Cancel
                            </button>
                            <button type="button" className={detail.newLesson ? 'btn btn-success' : 'd-none'} onClick={saveComponent} style={{ marginLeft: '10px'}}>
                                Save
                            </button>
                        </div>
                    </div>
                    <hr />

                    <div className={detail.newLesson ? 'row' : 'd-none'}>
                        <div className='col-lg-3'>
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
                                    value={componentPosition}
                                    onChange={e => setComponentPosition(e.target.value)}
                                    aria-describedby="helpId"
                                    disabled={detail.readOnly}
                                />
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseName">
                                    Type
                                </label>
                                <select className='form-control' disabled={detail.readOnly} onChange={e => setType(e.target.value)}>
                                    <option value={null}>
                                        Select a type
                                    </option>
                                    <option value={'VI'}>
                                        Video
                                    </option>
                                    <option value={'AU'}>
                                        Audio
                                    </option>
                                    <option value={'IM'}>
                                        Image
                                    </option>
                                    <option value={'HT'}>
                                        HTML
                                    </option>
                                    <option value={'EX'}>
                                        Exercise
                                    </option>
                                    <option value={'PR'}>
                                        Private
                                    </option>
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
                    {(props.data.components.length !== 0) ? (
                        <> 
                            <Component data={props.data.components} />
                        </>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Lesson