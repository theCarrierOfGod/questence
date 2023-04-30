import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react'

const HTML = () => {
    return (
        <>
            <div>
                <div className='col-lg-12'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="htmlType">
                            HTML Type
                        </label>
                        <select className='form-control' id="htmlType" name="htmlType">
                            <option>Select Type</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className="form-group mb-3 w-100">
                        <label className="label" htmlFor="htmlContent">
                            HTML content
                        </label>
                        <CKEditor
                            editor={ClassicEditor}
                            className="form-control"
                            name="htmlContent"
                            id="htmlContent"
                            rows="5"
                            required={true}
                            style={{ minHeight: '80px' }}
                            data={''}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                            }}
                        />
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="htmlUrl">
                            HTML URL
                        </label>
                        <select className='form-control mb-3' name="htmlUrl" id="htmlUrl">
                            <option> Select file to upload </option>
                        </select>
                        <input className='form-control' name="" placeholder='https://www.pinterest.com/search/pins/?q=contact%20us%20page&rs=typed&term_meta[]=contact%7Ctyped&term_meta[]=us%7' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HTML