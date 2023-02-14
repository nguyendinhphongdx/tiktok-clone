//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './Search.module.scss';
import { configBaseURL, configHeader } from '~/common/common';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SeleketonLoadingForSearch from '~/layouts/components/SekeletonLoading/SeleketonLoadingForSearch/index';
import SekeletonLoadingForFllowing from '~/layouts/components/SekeletonLoading/SekeletonForFollowing/SekeletonLoadingForFllowing';
import Video from '~/components/Video/Video';

const cx = classNames.bind(styles);

const tabs = [
    {
        name: 'Tài khoản',
        type: 'users',
    },
    {
        name: 'Video',
        type: 'video',
    },
];

function Search() {
    const [type, setType] = useState('users');
    const link = window.location.href;
    const params1 = link[link.length - 1];
    const [params, setParams] = useState(params1);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [check, setCheck] = useState([]);
    const [followingAccounts, setFollowingAccount] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        document.title = `Tìm kiếm '${params}' trên TikTok | Tìm kiếm TikTok`;
    }, [params]);

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            try {
                //
                axios
                    .get(`${configBaseURL}/api/users/get-follow-user`, configHeader)
                    .then((result) => {
                        setFollowingAccount(result.data[0].fllowing);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    useEffect(() => {
        setShow(false);
        const q = params;
        axios
            .get(`${configBaseURL}/api/${type}/search`, {
                params: {
                    q,
                    type,
                },
            })
            .then((result) => {
                if (result && type === 'users') {
                    setData(result.data);
                    setTimeout(() => {
                        setShow(true);
                    }, 1500);
                } else {
                    setData1(result.data);
                    setTimeout(() => {
                        setShow(true);
                    }, 1500);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params, type]);

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            try {
                axios
                    .get(`${configBaseURL}/api/users/get-liked-video`, configHeader)
                    .then((result) => {
                        if (result) {
                            setCheck(result.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    const render = () => {
        const link = window.location.href;
        const params1 = link[link.length - 1];
        setParams(params1);
    };

    const renderData = () => {
        setShow(false);
        const q = params;
        axios
            .get(`${configBaseURL}/api/${type}/search`, {
                params: {
                    q,
                    type,
                },
            })
            .then((result) => {
                if (result && type === 'users') {
                    setData(result.data);
                    setTimeout(() => {
                        setShow(true);
                    }, 1500);
                } else {
                    setData1(result.data);
                    setTimeout(() => {
                        setShow(true);
                    }, 1500);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={cx('container')}>
            <button onClick={render} id="seacrhbtn" style={{ display: 'none' }}>
                Click me
            </button>
            <div className={cx('tab-container')}>
                <div className={cx('nav-container')}>
                    {tabs.map((tab, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() => setType(tab.type)}
                                className={cx('tab-item')}
                                style={
                                    type === tab.type
                                        ? {
                                              color: 'rgba(22, 24, 35, 1)',
                                          }
                                        : {}
                                }
                            >
                                {tab.name}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={cx('panel-container')}>
                {type === 'users' ? (
                    <>
                        {show ? (
                            <>
                                {data.map((item, index) => (
                                    <div className={cx('div-link')} key={index}>
                                        <Link to={`/${item.nickname}`} className={cx('avatar-user')}>
                                            <div className={cx('avatar-container')}>
                                                <span>
                                                    <img loading="lazy" src={item.avatar} alt="avatar" />
                                                </span>
                                            </div>
                                        </Link>
                                        <Link to={`/${item.nickname}`} className={cx('info-user')}>
                                            <strong className={cx('title')}>{item.nickname}</strong>
                                            {item.tick ? (
                                                <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                            ) : null}
                                            <div className={cx('subtitle')}>
                                                <h2>{item.name}</h2> ·{' '}
                                                <strong>
                                                    {item.follower_count} <span>Follower</span>
                                                </strong>
                                            </div>
                                            <div className={cx('desc')}>{item.description}</div>
                                        </Link>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {data.map(() => {
                                    return <SeleketonLoadingForSearch />;
                                })}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {show ? (
                            <div className={cx('three-column-container')}>
                                <div className={cx('video-feed')}>
                                    {data1.map((item, index) => {
                                        return (
                                            <>
                                                <SearchVideo
                                                    params={params}
                                                    item={item}
                                                    followingAccounts={followingAccounts}
                                                    check={check}
                                                    onClickRender={renderData}
                                                />
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <>
                                {data1.map(() => {
                                    return <SekeletonLoadingForFllowing className={cx('containerv2')} />;
                                })}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function SearchVideo({ item, followingAccounts, check, renderData, params }) {
    const [show1, setShow1] = useState(false);
    const video = useRef();

    const handleHide = () => {
        setShow1(false);
        const nextURL = `http://localhost:3000/search/${params}`;
        const nextTitle = 'My new page title';
        const nextState = { additionalInformation: 'Updated the URL with JS' };

        // This will replace the current entry in the browser's history, without reloading
        window.history.replaceState(nextState, nextTitle, nextURL);
    };

    const playVideo = () => {
        video.current.play()
    }

    const pauseVideo = () => {
        video.current.pause()
    }

    

    return (
        <>
            {show1 && (
                <Video
                    data={item}
                    onClick={handleHide}
                    followUser={followingAccounts}
                    check={check}
                    onClickRender={renderData}
                />
            )}

            <div className={cx('item-container')}>
                <div className={cx('video-container')}>
                    <Link
                        to={`/${item.author.nickname}/video/${item.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            const nextURL = `http://localhost:3000/${item.author.nickname}/video/${item.id}`;
                            const nextTitle = 'My new page title';
                            const nextState = {
                                additionalInformation: 'Updated the URL with JS',
                            };

                            // This will replace the current entry in the browser's history, without reloading
                            window.history.replaceState(nextState, nextTitle, nextURL);
                            setShow1(true);
                        }}
                    >
                        <div className={cx('player-container')} onMouseMove={playVideo} onMouseOut={pauseVideo}>
                            <div className={cx('player')}>
                                <video src={item.video} ref={video}></video>
                            </div>
                            <div className={cx('footer-card-container')}>
                                <p>{item.created_at.slice(5, 10)}</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={cx('card-desc-container')}>
                    <div className={cx('bottom-info')}>
                        <div className={cx('card-desc')}>
                            <div>
                                <span>{item.description}</span>
                                {item.trendy.name ? (
                                    <Link to={`/tag/${item.trendy.name}`}>
                                        #<strong>{item.trendy.name}</strong>
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                        <div className={cx('playline')}>
                            <Link to={`/${item.author.nickname}/video/${item.id}`}>
                                <div className={cx('user-info')}>
                                    <span>
                                        <img src={item.author.avatar} loading="lazy" alt="avatar"></img>
                                    </span>
                                    <p>{item.author.nickname}</p>
                                </div>
                            </Link>
                            <div className={cx('play-icon')}>
                                <svg
                                    className={cx('style-play')}
                                    width="16"
                                    data-e2e=""
                                    height="16"
                                    viewBox="0 0 48 48"
                                    fill="rgba(22, 24, 35, 0.75)"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"
                                    ></path>
                                </svg>
                                <strong>{item.watch_count}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
