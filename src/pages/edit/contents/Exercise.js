import React from 'react'

const Exercise = () => {
    return (
        <>
            <div>
                <div className='col-lg-12'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="htmlType">
                            Excercise Type
                        </label>
                        <select className='form-control' id="htmlType" name="htmlType">
                            <option value={''}>{''}</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Exercise