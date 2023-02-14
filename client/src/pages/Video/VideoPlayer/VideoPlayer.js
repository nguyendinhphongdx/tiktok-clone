//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useState } from 'react';
// import { useState, useEffect, useRef, forwardRef } from 'react';
import { CloseVideo, LogoVideo, VideoReport } from '~/components/Icons';


//Thư viện internor sau(thư viện bên trong dự án)
import styles from './VideoPlayer.module.scss';
import ModalReport from '~/components/ModalReport';

const cx = classNames.bind(styles);


function VideoPlayer({ data }) {
    console.log(data);

    return (
        <div className={cx('container')}>
            <BlurBackground />
            <VideoWrapper data={data} />
            <ButtonClose />
            <LogoVideo className={cx('style-logo')} />
            <Report />
        </div>
    );
}

function BlurBackground() {
    return (
        <div
            className={cx('blur-background')}
        ></div>
    );
}

function VideoWrapper({ data }) {
    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('video-container')}>
                <div className={cx('basic-player-wrapper')}>
                    <video
                        src={data.video}
                        loading="lazy"
                        disablePictureInPicture
                        loop
                        controls
                        controlsList="nodownload noplaybackrate nofullscreen"
                        autoPlay
                        className={cx('video')}
                    ></video>
                </div>
            </div>
        </div>
    );
}

function ButtonClose() {
    return (
        <div className={cx('btn-close')}>
            <CloseVideo />
        </div>
    );
}

//report
function Report() {
    const [showReport, setShowReport] = useState(false);

    const showModalReport = () => {
        setShowReport(!showReport);
    };

    const hideModalReport = () => {
        setShowReport(!showReport);
    };

    return (
        <>
            <div className={cx('btn-report')} onClick={showModalReport}>
                <VideoReport className={cx('style')} />
                Báo cáo
            </div>
            {showReport ? <ModalReport onClick={hideModalReport} /> : <></>}
        </>
    );
}

export default VideoPlayer;
