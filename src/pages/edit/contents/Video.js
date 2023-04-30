import React from 'react'

const Video = () => {
    return (
        <>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="videoType">
                            Video Type
                        </label>
                        <select className='form-control' id="videoType" name="videoType">
                            <option ></option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className="form-group mb-3 w-100">
                        <label className="label" htmlFor="videoHeader">
                            Video Header
                        </label>
                        {/* <CKEditor
                                editor={ClassicEditor}
                                className="form-control"
                                name="videoHeader"
                                id="videoHeader"
                                rows="5"
                                required={true}
                            
                                data={props.data.video_header}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ data });
                                }}
                            /> */}
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className="form-group mb-3 w-100">
                        <label className="label" htmlFor="videoFooter">
                            Video Footer
                        </label>
                        {/* <CKEditor
                                editor={ClassicEditor}
                                className="form-control"
                                name="videoFooter"
                                id="videoFooter"
                                rows="5"
                                required={true}
                            
                                data={props.data.video_footer}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ data });
                                }}
                            /> */}
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="recordedlUrl">
                            Recorded URL
                        </label>
                        <select className='form-control mb-3' name="recordedlUrl" id="recordedlUrl">
                            <option> Select file to upload </option>
                        </select>
                        <input className='form-control' name="recordedlUrl" id="recordedlUrl" placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="mobileUrl">
                            Mobile URL
                        </label>
                        <select className='form-control mb-3' name="mobileUrl" id="mobileUrl">
                            <option> Select file to upload </option>
                        </select>
                        <input className='form-control' name="mobileUrl" id="mobileUrl" placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="livelUrl">
                            Live URL
                        </label>
                        <select className='form-control mb-3' name="livelUrl" id="livelUrl">
                            <option> Select file to upload </option>
                        </select>
                        <input className='form-control' name="livelUrl" id="livelUrl" placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
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
                                        <input type='date' className='form-control mb-3 ' name="startDate" id="startDate" />
                                    </div>
                                    <div className='col-sm-6'>
                                        <input type="time" className='form-control mb-3 col-sm-6' name="startTime" id="startTime" />
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
                                        <input type='date' className='form-control mb-3' name="endDate" id="endDate" />
                                    </div>
                                    <div className='col-sm-6'>
                                        <input type="time" className='form-control mb-3' name="endTime" id="endTime" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Video