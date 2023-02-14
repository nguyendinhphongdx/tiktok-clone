//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './Following.module.scss';
import RecommendItem from './RecommendItem';
import { configBaseURL, configHeader } from '~/common/common';
import SekeletonLoadingForFllowing from '~/layouts/components/SekeletonLoading/SekeletonForFollowing/SekeletonLoadingForFllowing';
import RecommendItemV2 from './RecommendItemV2';
import SeleketonLoadingForHome from '~/layouts/components/SekeletonLoading/SeleketonLoadingForHome';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState([]);
    const [followingAccounts, setFollowingAccount] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [check, setCheck] = useState([]);
    const toastNotice = useRef();

    useEffect(() => {
        document.title = 'Đang follow - Xem video từ những nhà sáng tạo mà bạn follow | TikTok';
    }, []);

    //lấy người người dùng follow của người dùng đang đăng nhập
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setShow(true);
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
        try {
            axios
                .get(`${configBaseURL}/api/users/get-liked-video`, configHeader)
                .then((result) => {
                    if(result) {
                        setCheck(result.data)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    },[]);

    useEffect(() => {
        if (localStorage.getItem('accessToken') && followingAccounts.length > 0) {
            setShow2(false);
            try {
                axios
                    .get(`${configBaseURL}/api/video/get-list-video-login-follow`, configHeader)
                    .then((result) => {
                        setData(result.data);
                        if (result) {
                            setTimeout(() => {
                                setShow2(true);
                            }, 1000);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                axios
                    .get(`${configBaseURL}/api/video/get-list-first-video`)
                    .then((result) => {
                        if (result) {
                            setTimeout(() => {
                                setShow2(true);
                            }, 1000);
                            const authors = result.data.map((o) => o.author.id);
                            const filtered = result.data.filter(
                                ({ author }, index) => !authors.includes(author.id, index + 1),
                            );
                            setData(filtered);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, [followingAccounts.length]);

    const renderData = () => {
        try {
            axios
                .get(`${configBaseURL}/api/video/get-list-video-login-follow`, configHeader)
                .then((result) => {
                    setData(result.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const showToast = () => {
        toastNotice.current.style.animation = `${cx('showToast')} ease .5s forwards, ${cx(
            'hideToast',
        )} ease 1s 4s forwards`;
        setTimeout(() => {
            toastNotice.current.style.animation = 'none';
        }, 5000);
    }

    return (
        <div className={cx('main-container')}>
            <div className={cx('toast')} ref={toastNotice}>
                <div className={cx('toast-notice')}>
                    <div className={cx('toast-notice-content')}>
                        <div>Coppy URL thành công!</div>
                    </div>
                </div>
            </div>
            {show ? (
                <>
                    {show2 && followingAccounts.length > 0 ? (
                        <>
                            {followingAccounts.length > 0 ? (
                                <>
                                    {data.reverse().map((item, index) => {
                                        return <RecommendItem data={item} key={index} followUser={followingAccounts} check={check} onClick={renderData} onClickShowToast={showToast}/>;
                                    })}
                                </>
                            ) : (
                                <div className={cx('user-list-wrapper')}>
                                    {data.map((item, index) => {
                                        return <RecommendItemV2 data={item} key={index} />;
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {show2 ? (
                                <div className={cx('user-list-wrapper')}>
                                    {data.map((item, index) => {
                                        return <RecommendItemV2 data={item} key={index} />;
                                    })}
                                </div>
                            ) : (
                                <>
                                    {followingAccounts.length > 0 ? (
                                            <><SeleketonLoadingForHome /></>
                                    ) : (
                                        <div style={{ width: '720px', paddingTop: '20px' }}>
                                            {data.map(() => {
                                                return <SekeletonLoadingForFllowing />;
                                            })}
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            ) : (
                <>
                    {show2 ? (
                        <div className={cx('user-list-wrapper')}>
                            {data.map((item, index) => {
                                return <RecommendItemV2 data={item} key={index} />;
                            })}
                        </div>
                    ) : (
                        <div style={{ width: '720px', paddingTop: '20px' }}>
                            {data.map(() => {
                                return <SekeletonLoadingForFllowing />;
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;
