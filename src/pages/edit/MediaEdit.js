import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Nav from '../../components/nav/Nav';
import { useBasic } from '../../providers/Basic';
import { useEdit } from '../../providers/Edit';
import { useHook } from '../../providers/Hook';
import StatusTab from './StatusTab';
import TabMenu from './TabMenu';
import { useAuth } from '../../providers/Auth';
import { NotificationContainer } from 'react-notifications';

const MediaEdit = () => {
    const edit = useEdit();
    const auth = useAuth();
    const location = useLocation();
    const basic = useBasic();
    const hook = useHook();
    let { id } = useParams();
    const [imageLink, setImageLink] = useState('');
    const [videoLink, setVideoLink] = useState('');

    useEffect(() => {
        basic.getCourse(id);
    }, [location.key])

    return (
        <>
            <NotificationContainer />
            {/* navigation bar */}
            <Nav />
            <br />
            {/* status, edit, back to dashboard and course preview tab */}
            <StatusTab />
            <br />
            {/* various course parts tab  */}
            <TabMenu />
            <br />
            <div className='container'>
                {(basic.courseDetails.length === '0' ? null : (
                    <>
                        <div className=''>
                            <div className='row justify-content-center'>
                                <div className='col-lg-5 col-md-5 mb-4 text-center' >
                                    <div className={((basic.imageLink === null) || (basic.imageLink === '')) ? 'd-none' : 'd-block'}>
                                        <div style={{ height: '200px' }}>
                                            <img src={basic.imageLink} alt="image preview" style={{ inset: '0px', height: '200px' }} />
                                        </div>
                                    </div>
                                    <form className="form-group">
                                        <label htmlFor="card-image" title={'Add course image'} >
                                            <small className='d-block w-100 text-center is-hoverable'>
                                                <b>
                                                    Course Card Image
                                                </b>
                                            </small>
                                        </label>
                                        <br /><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="card-image"
                                            id="card-image"
                                            onChange={e => basic.setImageLink(e.target.value)}
                                            disabled={edit.readOnly}
                                            placeholder='Course card image'
                                        />
                                    </form>
                                </div>
                                <div className='col-lg-6 col-md-6 mb-4 text-center'>
                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                        <video controls style={{ height: '200px', padding: '5px', overflow: 'hidden', margin: 'auto' }} className={((basic.videoLink === null) || (basic.videoLink === '')) ? 'd-none' : 'd-block'} autoPlay>
                                            <source src={basic.videoLink} type="video/*"></source>
                                        </video>
                                    </div>
                                    <form className="form-group">
                                        <label htmlFor="card-video" title={'Add course video'}>
                                            <small className='d-block w-100 text-center is-hoverable'>
                                                <b>
                                                    Course Introduction Video
                                                </b>
                                            </small>
                                        </label><br /><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="card-video"
                                            id="card-video"
                                            onChange={e => basic.setVideoLink(e.target.value)}
                                            disabled={edit.readOnly}
                                            placeholder='Course Introduction video'
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <br />
            <div className='bottomMargin'></div>
            <Footer />
        </>
    )
}

export default MediaEdit
