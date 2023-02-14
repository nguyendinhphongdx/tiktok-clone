//Thư viện externor trước(thư viện bên ngoài)
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { basseURL, configBaseURL, configHeader } from '~/common/common';
import { Comment, Heart, LikedVideo, MoreAction, Music } from '~/components/Icons';
import config from '~/config';
import ItemComment from './ItemComment';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './VideoContent.module.scss';

const cx = classNames.bind(styles);

function VideoContent({ data, followUser, check, onClick }) {
    return (
        <div className={cx('container')}>
            <VideoInfo data={data} followUser={followUser} />
            <MainContent data={data} check={check} onClick={onClick} />
            <CommentList data={data} onClick={onClick} />
        </div>
    );
}

//Video Info
function VideoInfo({ data, followUser }) {
    const [check, setCheck] = useState(false);
    const [checkCurrent, setCheckCurrent] = useState(false);
    const [time, setTime] = useState(false);
    const { nickname } = useParams();
    const nick = data.author.nickname;
    const configHeader1 = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            IdAccount: `Bearer ${localStorage.getItem('idAccount')}`,
            IdUser: `Bearer ${data.author.id}`,
        },
    };

    useEffect(() => {
        followUser.forEach((account) => {
            if (nick === account.nickname) {
                setCheck(true);
            }
        });
        if (nick === localStorage.getItem('nickName')) {
            setCheckCurrent(true);
        }
        setTimeout(() => {
            setTime(true);
        }, 1);
    }, [nick, followUser]);

    const handleFollow = async () => {
        if (localStorage.getItem('accessToken')) {
            setCheck(true);
            try {
                //
                await axios.post(`${basseURL}/api/users/follow-user`, configHeader1);
            } catch (error) {
                console.log(error);
            }
        } else {
            window.location = config.routes.login;
        }
    };

    const handleUnFollow = async () => {
        setCheck(false);
        try {
            //
            await axios.post(`${basseURL}/api/users/unfollow-user`, configHeader1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('info-container')}>
            <Link to={`/${nickname}`} className={cx('link-avatar')}>
                <div className={cx('avatar-container')}>
                    <span className={cx('avatar-span')}>
                        <img src={data.author.avatar} alt="" loading="lazy" />
                    </span>
                </div>
            </Link>
            <Link to={`/${nickname}`} className={cx('link-info')}>
                <span className={cx('span-id')}>{data.author.nickname}</span>
                <br></br>
                <span className={cx('span-other-info')}>
                    {data.author.name}
                    <span style={{ margin: '0px 4px' }}> . </span>
                    <span>{data.created_at.slice(5, 10)}</span>
                </span>
            </Link>
            {time && (
                <>
                    {checkCurrent ? (
                        <MoreAction />
                    ) : (
                        <>
                            {check ? (
                                <button className={cx('btn-unfollow')} onClick={handleUnFollow}>
                                    Đang follow
                                </button>
                            ) : (
                                <button className={cx('btn-follow')} onClick={handleFollow}>
                                    Follow
                                </button>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

//Main video container
function MainContent({ data, check, onClick }) {
    const [change, setChange] = useState();
    const currentURL = window.location.href;
    const link = useRef();
    const toastNotice = useRef();

    const handleCoppyURL = () => {
        navigator.clipboard.writeText(link.current.innerText);
        toastNotice.current.style.animation = `${cx('showToast')} ease .5s forwards, ${cx(
            'hideToast',
        )} ease 1s 4s forwards`;
        setTimeout(() => {
            toastNotice.current.style.animation = 'none';
        }, 5000);
    };

    useEffect(() => {
        if (check[0].liked.length > 0) {
            check[0].liked.forEach((item) => {
                if (data.id === item.id) {
                    setChange(true);
                }
            });
        }
    }, [check, data.id]);

    const handlerLikeVideo = async () => {
        try {
            await axios.post(`${configBaseURL}/api/video/liked/${data.id}`, configHeader);
        } catch (error) {
            console.log(error);
        }
        setChange(true);
        onClick();
    };

    const handlerUnLikeVideo = async () => {
        try {
            await axios.post(`${configBaseURL}/api/video/unliked/${data.id}`, configHeader);
        } catch (error) {}
        setChange(false);
        onClick();
    };

    return (
        <div className={cx('content-container')}>
            {/*  */}
            <div className={cx('toast')} ref={toastNotice}>
                <div className={cx('toast-notice')}>
                    <div className={cx('toast-notice-content')}>
                        <div>Đã sao chép</div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className={cx('video-desc')}>
                <span className={cx('span-text')}>{data.description}</span>
                <Link className={cx('common-link')} to={`/tag/${data.trendy.name}`}>
                    <strong>#{data.trendy.name}</strong>
                </Link>
            </div>
            {/*  */}
            <h4 className={cx('h4-link')}>
                <Link to={`/music/${data.music.name}`} className={cx('music')}>
                    <Music />
                    <div style={{ marginTop: '2px' }}>
                        {data.music.name} - {data.music.singer ? data.music.singer : data.author.nickname}
                    </div>
                </Link>
            </h4>
            {/*  */}
            <div className={cx('div-container')}>
                <div className={cx('center-row')}>
                    <div className={cx('center-row1')}>
                        {change ? (
                            <button className={cx('action-item')} onClick={handlerUnLikeVideo}>
                                <span className={cx('span-icon')} style={{ color: 'rgb(22, 24, 35)' }}>
                                    <LikedVideo />
                                </span>
                                <span className={cx('strong-text')}>{data.heart_count}</span>
                            </button>
                        ) : (
                            <button className={cx('action-item')} onClick={handlerLikeVideo}>
                                <span className={cx('span-icon')} style={{ color: 'rgb(22, 24, 35)' }}>
                                    <Heart />
                                </span>
                                <span className={cx('strong-text')}>{data.heart_count}</span>
                            </button>
                        )}
                        <button className={cx('action-item')} disabled>
                            <span className={cx('span-icon')}>
                                <Comment />
                            </span>
                            <strong className={cx('strong-text')}>{data.comment_count}</strong>
                        </button>
                    </div>
                </div>
                <div className={cx('coppylink-container')}>
                    <p className={cx('coppylink-text')} ref={link}>
                        {currentURL}
                    </p>
                    <button className={cx('button-coppylink')} onClick={handleCoppyURL}>
                        Sao chép liên kết
                    </button>
                </div>
            </div>
        </div>
    );
}

//Comment list container
function CommentList({ data, onClick }) {
    const [dataComment, setDataComment] = useState([]);
    const [show, setShow] = useState(false);
    const input = useRef();
    const commentBtn = useRef();

    useEffect(() => {
        try {
            axios
                .get(`${configBaseURL}/api/comment/get-list-comment/${data.id}`)
                .then((result) => {
                    if (result) {
                        setDataComment(result.data[0].comment);
                        setTimeout(() => {
                            setShow(true);
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {}
    }, [data.id]);


    const handleChangeColor = () => {
        if (input.current.value !== '') {
            commentBtn.current.classList.add(cx('active'));
        } else {
            commentBtn.current.classList.remove(cx('active'));
        }
    };

    const handlePostComment = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                await axios.post(`${configBaseURL}/api/comment/post/${data.id}`, {
                    content: input.current.value,
                    iduser: localStorage.getItem('idUser'),
                });
                const response = await axios.get(`${configBaseURL}/api/comment/get-list-comment/${data.id}`);
                if (response) {
                    setDataComment(response.data[0].comment);
                }
            } catch (error) {}
            onClick();
            input.current.value = ''
        }
    };

    return (
        <>
            <div className={cx('comment-list-container')}>
                {show &&
                    dataComment.map((item, index) => {
                        return <ItemComment data={item} key={index} />;
                    })}
            </div>
            <div className={cx('bottom-comment-container')}>
                <div className={cx('comment-container')}>
                    <div className={cx('comment-layout-container')}>
                        <input
                            ref={input}
                            type="text"
                            className={cx('comment-input')}
                            placeholder="Thêm bình luận..."
                            onChange={handleChangeColor}
                        />
                    </div>
                    <div ref={commentBtn} className={cx('comment-post-button')} onClick={handlePostComment}>
                        Đăng
                    </div>
                </div>
            </div>
        </>
    );
}

export default VideoContent;
