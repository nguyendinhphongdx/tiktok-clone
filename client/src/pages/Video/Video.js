//Thư viện externor trước(thư viện bên ngoài)
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { configBaseURL, configHeader } from '~/common/common';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './Video.module.scss';
import VideoContent from './VideoContent';
import VideoPlayer from './VideoPlayer';


const cx = classNames.bind(styles);

function Video() {
    const [data, setData] = useState([])
    const [followUser, setFollowUser] = useState([])
    const [check, setCheck] = useState([])
    const { id, nickname } = useParams()
    const [show, setShow] = useState(false)

    useEffect(() => {
        try {
            axios.get(`${configBaseURL}/api/video/${nickname}/${id}`)
                .then((result) => {
                    if (result) {
                        setData(result.data[0])
                        setTimeout(() => {
                            setShow(true)
                        }, 500)
                    }
                }).catch((err) => {
                    console.log(err);
                });
        } catch (error) {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     try {
    //         axios.post(`${configBaseURL}/api/video/increase-views/${id}`)
    //         .then((result) => {
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     } catch (error) {

    //     }
    // },[id])

    useEffect(() => {
        try {
            axios
                .get(`${configBaseURL}/api/users/get-liked-video`, configHeader)
                .then((result) => {
                    if (result) {
                        setCheck(result.data)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    //lấy người người dùng follow của người dùng đang đăng nhập
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            try {
                //
                axios
                    .get(`${configBaseURL}/api/users/get-follow-user`, configHeader)
                    .then((result) => {
                        setFollowUser(result.data[0].fllowing);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, []);


    const onClickRender = () => {
        try {
            axios.get(`${configBaseURL}/api/video/${nickname}/${id}`)
                .then((result) => {
                    if (result) {
                        setData(result.data[0])
                    }
                }).catch((err) => {
                    console.log(err);
                });
        } catch (error) {

        }
    }

    return (
        <div className={cx('container')}>
            {show ? <VideoPlayer data={data} /> : null}
            {show && <VideoContent data={data} followUser={followUser} check={check} onClick={onClickRender} />}
        </div>
    );
}

export default Video;
