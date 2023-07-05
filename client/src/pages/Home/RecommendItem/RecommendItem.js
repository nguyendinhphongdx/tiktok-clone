//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import ModalReport from '~/components/ModalReport';
import { CheckProfile, Comment, Heart, LikedVideo, Music, Share, VideoReport } from '~/components/Icons';
import { useInView } from 'react-intersection-observer';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './RecommendItem.module.scss';
import MenuShare from '../MenuShare';
import { useEffect, useRef, useState } from 'react';
import Video from '~/components/Video';
import axios from 'axios';
import { DNS, basseURL, configBaseURL, configHeader } from '~/common/common';
import config from '~/config';

const cx = classNames.bind(styles);

function RecommendItem({ data, index, followUser, check, onClick, onClickShowToast }) {
    const [show, setShow] = useState(false);
    const [checkFollow, setCheckFollow] = useState(false);
    const [current, setCurrent] = useState(false);
    const video = useRef();
    const [inViewRef] = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px 200px 0px', // Thay đổi margin phù hợp với kích thước video
    });

    const linkMusic = data.music?.name + '-' + data.music?.id;
    const configHeader1 = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            IdAccount: `Bearer ${localStorage.getItem('idAccount')}`,
            IdUser: `Bearer ${data.author.id}`,
        },
    };

    useEffect(() => {
        if (index === 0) {
            video.current.play();
        }

        if (localStorage.getItem('nickName') === data.author.nickname) {
            setCurrent(true);
        }
    }, [index, data.author.nickname]);

    const handleHide = () => {
        setShow(false);
        const nextURL = config.routes.home;
        const nextTitle = 'My new page title';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        video.current.play();
        // This will replace the current entry in the browser's history, without reloading
        window.history.replaceState(nextState, nextTitle, nextURL);
    };

    const test = (e) => {
        e.preventDefault();
        const nextURL = `${DNS}/${data.author.nickname}/video/${data.id}`;
        const nextTitle = 'My new page title';
        const nextState = { additionalInformation: 'Updated the URL with JS' };

        // This will replace the current entry in the browser's history, without reloading
        window.history.replaceState(nextState, nextTitle, nextURL);
        setShow(true);
        video.current.pause();
    };

    const handleFollow = async () => {
        if (localStorage.getItem('accessToken')) {
            setCheckFollow(true);
            try {
                //
                await axios.post(`${basseURL}/api/users/follow-user`, configHeader1)
            } catch (error) {
                console.log(error);
            }
        } else {
            window.location = config.routes.login
        }
    };

    const handleUnFollow = async () => {
        setCheckFollow(false);
        try {
            //
            await axios.post(`${basseURL}/api/users/unfollow-user`, configHeader1)
        } catch (error) {
            console.log(error);
        }
    }

    // const handleVideoPlay = () => {
    //     if (inView) {
    //         video.current.play();
    //     } else {
    //         video.current.pause();
    //     }
    // };

    return (
        <div className={cx('container')} index={index}>
            {/* avatar profile */}
            <Link to={`/${data.author.nickname}`} className={cx('avatar-anchor')} id="is-user">
                <div className={cx('avatar-container')}>
                    <span className={cx('avatar-style')}>
                        <img alt="" className={cx('avatar-img')} src={data.author.avatar}></img>
                    </span>
                </div>
            </Link>

            <div className={cx('content-container')}>
                {/* info container */}
                <div className={cx('info-container')}>
                    <div className={cx('author-container')}>
                        <Link to={`/${data.author.nickname}`} className={cx('author-anchor')}>
                            <h3 className={cx('author-title')}>{data.author.nickname}</h3>
                            {data.author.tick && <CheckProfile className={cx('check-icon')} />}
                            <h4 className={cx('author-name')}>{data.author.name}</h4>
                        </Link>
                    </div>

                    {current ? (
                        <></>
                    ) : (
                        <>{checkFollow ? (
                            <Button text className={cx('follow-btn', 'following')} onClick={handleUnFollow}>
                                Đang follow
                            </Button>
                        ) : (
                            <Button primary className={cx('follow-btn')} onClick={handleFollow}>
                                Follow
                            </Button>
                        )}</>
                    )}

                    <div className={cx('desc')}>
                        <span className={cx('span-text')}>
                            {data.description}{' '}
                            <Link className={cx('tag-link')} to={`/tag/${data.trendy.name}`}>
                                #{data.trendy.name}
                            </Link>
                        </span>
                    </div>

                    <h4 className={cx('h4link')}>
                        <Link to={`/music/${linkMusic}`}>
                            <Music className={cx('music-icon')} />
                            <span>
                                {data.music.name} -{' '}
                                {data.music.singer !== '' ? data.music.singer : data.author.nickname}
                            </span>
                        </Link>
                    </h4>
                </div>
                {/* video container */}
                {show && <Video data={data} onClick={handleHide} followUser={followUser} check={check} onClickRender={onClick} />}
                <div ref={inViewRef} className={cx('video-wrapper')}>
                    <div className={cx('video-card-container')}>
                        <canvas width="56.25" height="100" className={cx('canvas-video-player')}></canvas>
                        <div className={cx('video-player-container')}>
                            <div className={cx('video-container')}>
                                <div className={cx('basic-player-wrapper')}>
                                    <div style={{ width: '100%', height: '100%' }}>
                                        <video
                                            onClick={test}
                                            src={data.video}
                                            muted
                                            controls
                                            disablePictureInPicture
                                            loop
                                            ref={video}
                                            // onPlay={handleVideoPlay} onPause={handleVideoPlay}
                                            controlsList="nodownload noplaybackrate nofullscreen"
                                        ></video>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('video-control-bottom')}></div>
                            <ReportForm data={data} />
                        </div>
                    </div>
                    <div className={cx('video-action-item-container')}>
                        <LikeVideo data={data} check={check} onClick={onClick} />
                        <CommentVideo data={data} onClick={test} />
                        <ShareVideo data={data} onClick={onClick} onClickShowToast={onClickShowToast} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function LikeVideo({ data, check, onClick }) {
    const [change, setChange] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            if (check[0].liked.length > 0) {
                check[0].liked.forEach((item) => {
                    if (data.id === item.id) {
                        setChange(true)
                    }
                })
            }
        }
    }, [check, data.id])

    const handlerLikeVideo = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                await axios.post(`${configBaseURL}/api/video/liked/${data.id}`, configHeader);
            } catch (error) { }
            onClick()
            setChange(true);
        } else {
            window.location = config.routes.login;
        }
    };

    const handlerUnLikeVideo = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                await axios.post(`${configBaseURL}/api/video/unliked/${data.id}`, configHeader);
            } catch (error) { }
            onClick()
            setChange(false);
        } else {
            window.location = config.routes.login;
        }
    };

    return (
        <>
            {change ? (
                <button className={cx('btn-action-item')} onClick={handlerUnLikeVideo}>
                    <span className={cx('like-icon')}>
                        <LikedVideo />
                    </span>
                    <span className={cx('like-count')}>{data.heart_count}</span>
                </button>
            ) : (
                <button className={cx('btn-action-item')} onClick={handlerLikeVideo}>
                    <span className={cx('like-icon')} style={{ color: 'rgb(22, 24, 35)' }}>
                        <Heart />
                    </span>
                    <span className={cx('like-count')}>{data.heart_count}</span>
                </button>
            )}
        </>
    );
}

function CommentVideo({ data, onClick }) {
    return (
        <button className={cx('btn-action-item')} onClick={onClick}>
            <span className={cx('comment-icon')} style={{ color: 'rgb(22, 24, 35)' }}>
                <Comment />
            </span>
            <span className={cx('comment-count')}>{data.comment_count}</span>
        </button>
    );
}

function ShareVideo({ data, onClick, onClickShowToast }) {
    return (
        <MenuShare className={cx('share-container')} data={data} onClickRender={onClick} onClickShowToast={onClickShowToast}>
            <button className={cx('btn-action-item')}>
                <span className={cx('share-icon')} style={{ color: 'rgb(22, 24, 35)' }}>
                    <Share />
                </span>
                <span className={cx('share-count')}>{data.share_count}</span>
            </button>
        </MenuShare>
    );
}

function ReportForm({ data }) {
    const [showReport, setShowReport] = useState(false);

    const showModalReport = () => {
        setShowReport(!showReport);
    };

    const hideModalReport = () => {
        setShowReport(!showReport);
    };

    return (
        <>
            <div className={cx('report-text')} onClick={showModalReport}>
                <VideoReport className={cx('icon-flag')} />
                <span>Báo cáo</span>
            </div>
            {showReport ? <ModalReport onClick={hideModalReport} data={data} /> : <></>}
        </>
    );
}
export default RecommendItem;
