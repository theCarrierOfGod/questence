import React from 'react'
import { useState } from 'react';
import { useEdit } from '../../../providers/Edit';
// import CodeEditor from '@uiw/react-textarea-code-editor';

const Exercise = (props) => {
    const edit = useEdit();
    const [htmlContent, setHtmlContent] = useState(false);
    const seeHtmlContent = () => {
        if (htmlContent) {
            setHtmlContent(false);
        } else {
            setHtmlContent(true);
        }
    }
    return (
        <div>
            <div className='row'>
                <div className='col-lg-3'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="courseName">
                            Position ID
                        </label>
                        <input type="text" name="positionID" required id="courseName" className="form-control" placeholder="" value={props.data.position_id} aria-describedby="helpId" />
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="courseName">
                            Type
                        </label>
                        <select className='form-control'>
                            <option value="Problem" >Problem</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-6 d-flex'>
                    <div className="form-group mb-3 w-100">
                        <label className="label" htmlFor="courseName">
                            Title
                        </label>
                        <div className='d-flex align-center'>
                            <input type="text" name="courseName" required id="courseName" className="form-control" placeholder="Input Title" value={props.data.title} aria-describedby="helpId" />
                            <span className={htmlContent ? 'fa fa-angle-up is-hoverable' : 'fa fa-angle-down is-hoverable'} style={{ lineHeight: '18px', padding: '10px' }} onClick={seeHtmlContent}></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={htmlContent ? 'd-flex row' : 'd-none'} >
                <div className='col-lg-12'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="htmlType">
                            Excercise Type
                        </label>
                        <select className='form-control' id="htmlType" name="htmlType">
                            <option value={props.data.exercise_type}>{props.data.exercise_type}</option>
                        </select>
                    </div>
                </div>
                {/* grading weight  */}
                <div className='col-lg-6'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="htmlType">
                            Grading Weight
                        </label>
                        <input className='form-control' name="" value={props.data.grading_weight} placeholder='0' />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="htmlType">
                            Total Score
                        </label>
                        <input className='form-control' name="" value={props.data.total_score} placeholder='0' />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="form-group mb-3">
                        <div className='row'>
                            <label className="label mb-3 col-md-12" htmlFor="startDate">
                                Available Date & Time
                            </label>
                            <div className='col-sm-6'>
                                <input type='date' className='form-control mb-3 ' name="availableDate" id="availableDate" />
                            </div>
                            <div className='col-sm-6'>
                                <input type="time" className='form-control mb-3 col-sm-6' name="availableTime" id="availableTime" value={props.data.available_date_time} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="form-group mb-3">
                        <div className='row'>
                            <label className="label mb-3 col-md-12" htmlFor="startDate">
                                Start Date & Time
                            </label>
                            <div className='col-sm-6'>
                                <input type='date' className='form-control mb-3 ' name="startDate" id="startDate" />
                            </div>
                            <div className='col-sm-6'>
                                <input type="time" className='form-control mb-3 col-sm-6' name="startTime" id="startTime" value={props.data.start_date_time} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="form-group mb-3">
                        <label className="label mb-3 col-md-12" htmlFor="startDate">
                            Duration
                        </label>
                        <input type="text" className='form-control mb-3 col-sm-6' placeholder='input duration' name="startTime" id="startTime" value={props.data.duration} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="form-group mb-3">
                        <div className='row'>
                            <label className="label mb-3 col-md-12" htmlFor="startDate">
                                Due Date & Time
                            </label>
                            <div className='col-sm-6'>
                                <input type='date' className='form-control mb-3 ' name="startDate" id="startDate" />
                            </div>
                            <div className='col-sm-6'>
                                <input type="time" className='form-control mb-3 col-sm-6' name="startTime" id="startTime" value={props.data.due_date_time} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className="form-group mb-3">
                        <label className="label mb-3 col-md-12" htmlFor="startDate">
                            Show allocated score
                        </label>
                        <select name="showAnswer" className='form-select'>
                            <option value={props.data.show_allocated_score}>Select option</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="form-group mb-3">
                        <label className="label mb-3 col-md-12" htmlFor="startDate">
                            Show hint
                        </label>
                        <select name="showAnswer" className='form-select'>
                            <option value={props.data.show_hint}>Select option</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="form-group mb-3">
                        <label className="label mb-3 col-md-12" htmlFor="startDate">
                            Show answer
                        </label>
                        <select name="showAnswer" className='form-select'>
                            <option value={props.data.show_answer}>Select option</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                </div>

                <div className='col-lg-12'>
                    <div className="form-group mb-3 w-100">
                        <label className="label" htmlFor="htmlContent">
                            Overview
                        </label>
                        {/* <CodeEditor
                            className="form-control"
                            name="htmlContent"
                            id="htmlContent"
                            rows="6"
                            value={props.data.exercise_overview}
                            language="html"
                            placeholder="HTML Content"
                            padding={15}
                            required={true}
                            readOnly={edit.readOnly}
                            style={{
                                fontSize: 12,
                                backgroundColor: "#ffffff",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                minHeight: '100px',
                                maxHeight: '250px',
                                overflowY: 'scroll',
                            }}
                        /> */}
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Exercise
