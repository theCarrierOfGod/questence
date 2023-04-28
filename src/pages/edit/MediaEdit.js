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

const MediaEdit = () => {
    const edit = useEdit();
    const auth = useAuth();
    const location = useLocation();
    const basic = useBasic();
    const hook = useHook();
    let { id } = useParams();
    const [mydata, setData] = useState();
    const [myvid, setVid] = useState();
    const [image, setImage] = useState([]);
    const [video, setVideo] = useState([]);

    const handleImage = (event) => {
        let size = event.target.files[0].size;
        if (size > 5242880) {
            alert('file too large');
            return false;
        }
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.onloadend = () => {
                setData({
                    imagePreview: reader.result,
                    file: file
                });
                setImage(event.target.files[0]);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleVideo = (event) => {
        let size = event.target.files[0].size;
        if (size > 5242880999) {
            alert('file too large');
            return false;
        }
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.onloadend = () => {
                setVid({
                    videoPreview: reader.result,
                    file: file
                });
                setVideo(event.target.files[0]);
            };
            reader.readAsDataURL(file);
        }
    }

    const uploadImage = (event) => {
        event.preventDefault();
        let formData = new FormData();

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-detail/`,
            data: {
                "id": id,
                "card_image": image
            },
            headers: {
                'Authorization': auth.token,
                'Content-Type': 'multipart/form-data'
            }
        };

        axios(config)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const uploadVideo = (event) => {
        event.preventDefault();
        let formData = new FormData();
        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-detail/`,
            data: {
                "id": id,
                "intro_video": video
            },
            headers: {
                'Authorization': auth.token,
                'Content-Type': 'multipart/form-data'
            }
        };

        axios(config)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        basic.getCourse(id);
    }, [location.key])

    return (
        <>
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
                            <div className='row'>
                                <div className='col-lg-6 col-md-6 mb-4 text-center' >
                                    <div style={{ width: '100%' }}>
                                        {
                                            mydata ? (
                                                <>
                                                    <label htmlFor="asset" style={{ width: '100%', padding: '5px', overflow: 'hidden' }}>
                                                        <img src={mydata.imagePreview} alt="preview" style={{ inset: '0px', width: 'inherit' }} />
                                                    </label>
                                                </>
                                            ) : (
                                                ((basic.IntroImage === null) || basic.IntroImage === '') ? (
                                                    <>
                                                        <label style={{ height: '100px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
                                                            Image preview
                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label htmlFor="asset" style={{ width: '100%', padding: '5px', overflow: 'hidden' }}>
                                                            <img src={basic.IntroImage} alt="card image preview" style={{ inset: '0px', width: 'inherit' }} />
                                                        </label>
                                                    </>
                                                )
                                            )
                                        }
                                    </div>
                                    <form className="form-group" onSubmit={uploadImage}>
                                        <label htmlFor="card-image" title={'Add course image'} >
                                            <small className='d-block w-100 text-center is-hoverable'>
                                                <b>
                                                    Course Card Image
                                                </b>
                                            </small>
                                            <button
                                                type='submit'
                                                className='statusButton bgPreview'
                                                disabled={edit.readOnly}
                                            >
                                                Upload Image
                                            </button>
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control-file"
                                            accept='image/*'
                                            hidden
                                            required
                                            name="card-image"
                                            id="card-image"
                                            onChange={handleImage}
                                            disabled={edit.readOnly}
                                        />
                                    </form>
                                </div>
                                <div className='col-lg-6 col-md-6 mb-4 text-center'>
                                    <div style={{ width: '100%' }}>
                                        {
                                            myvid ? (
                                                <>
                                                    <video controls style={{ width: '100%', padding: '5px', overflow: 'hidden' }} autoPlay>
                                                        <source src={myvid.videoPreview} ></source>
                                                    </video>
                                                </>
                                            ) : (
                                                ((basic.IntroVid === '') || (basic.IntroVid === null)) ? (
                                                    <>
                                                        <label style={{ height: '100px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
                                                            Video preview
                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        <video controls style={{ width: '100%', padding: '5px', overflow: 'hidden' }} autoPlay>
                                                            <source src={basic.IntroVid} ></source>
                                                        </video>
                                                    </>
                                                )
                                            )
                                        }
                                    </div>
                                    <form className="form-group" onSubmit={uploadVideo}>
                                        <label htmlFor="card-video" title={'Add course video'}>
                                            <small className='d-block w-100 text-center is-hoverable'>
                                                <b>
                                                    Course Introduction Video
                                                </b>
                                            </small>
                                            <button
                                                className='statusButton bgPreview'
                                                disabled={edit.readOnly}
                                            >
                                                Upload Video
                                            </button>
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control-file"
                                            accept='video/*'
                                            hidden
                                            name="card-video"
                                            id="card-video"
                                            onChange={handleVideo}
                                            disabled={edit.readOnly}
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
