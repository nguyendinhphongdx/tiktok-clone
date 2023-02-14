//Thư viện externor trước(thư viện bên ngoài)
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { configBaseURL } from '~/common/common';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './Video.module.scss';
import VideoContent from './VideoContent';
import VideoPlayer from './VideoPlayer';


const cx = classNames.bind(styles);

function Video({ data, onClick, followUser, check, onClickRender }) {
    const toastNotice = useRef();

    useEffect(() => {
        try {
            axios.post(`${configBaseURL}/api/video/increase-views/${data.id}`)
            .then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            
        }
    },[data.id])

    const showToast = () => {
        toastNotice.current.style.animation = `${cx('showToast')} ease .5s forwards, ${cx(
            'hideToast',
        )} ease 1s 3s forwards`;
        setTimeout(() => {
            toastNotice.current.style.animation = 'none';
        }, 5000);
    }

    return (
        <div className={cx('container')}>
            <div className={cx('toast')} ref={toastNotice}>
                <div className={cx('toast-notice')}>
                    <div className={cx('toast-notice-content')}>
                        <div>Xóa video thành công!</div>
                    </div>
                </div>
            </div>
            <VideoPlayer data={data} onClick={onClick} />
            <VideoContent data={data} followUser={followUser} check={check} onClick={onClickRender} onClickShowToast={showToast}/>
        </div>
    );
}

export default Video;
