//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

//Thư viện internor sau(thư viện bên trong dự án)
import { MoreAction, ShareProfile, EditProfile, CheckProfile } from '~/components/Icons';
import Button from '~/components/Button';
import styles from '../Profile.module.scss';
import MenuMoreActions from './MenuMoreActions';
import MenuShareProfile from './MenuShareProfile';
import SekeletonLoadingForTagAndMusicV2 from '~/layouts/components/SekeletonLoading/SekeletonLoadingForTagAndMusicV2/SekeletonLoadingForTagAndMusicV2';
import ModalUpdateProfile from '../ModalUpdateProfile';
import config from '~/config';
import axios from 'axios';
import ModalReport from '~/components/ModalReport';
import { basseURL } from '~/common/common';

const cx = classNames.bind(styles);

function ProfileHeader({ user, followUser, onClickShowToast }) {
    const [currentUser, setCurrentUser] = useState(false);
    const [check, setCheck] = useState(false);
    const [checkTick, setCheckTick] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const tick = user.data.tick
    
    useEffect(() => {
        if(followUser) {
            setTimeout(() => {
                setLoading(true)
            },500)
            setLoading(false)
        }

        if(tick) {
            setCheckTick(true)
        } else {
            setCheckTick(false)
        }
        document.title = `${user.data.nickname} (@${user.data.nickname}) TikTok | Xem các video mới nhất của ${user.data.nickname}`;
    }, [user.data.nickname, followUser, tick]);

    useEffect(() => {
        if (user.data.isMe) {
            setCurrentUser(true);
        } else {
            setCurrentUser(false);
        }

        followUser.forEach((account) => {
            if (user.data.nickname === account.nickname) {
                setTimeout(() => {
                    setCheck(true);
                },1)
            } else {
                setCheck(false);
            }
        })
    }, [user.data.nickname, user, followUser]);


    const handlerShowUpdateProfile = () => {
        setShow(true);
    }

    const handlerHideUpdateProfile = () => {
        setShow(false);
        setTimeout(() => {
            window.location.reload()
        },1000)
    }

    const handleFollow = async () => {
        if(localStorage.getItem('accessToken')) {
            setCheck(true);
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

    const configHeader1 = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            IdAccount: `Bearer ${localStorage.getItem('idAccount')}`,
            IdUser: `Bearer ${user.id}`,
        },
    };

    const handleUnFollow = async() => {
        setCheck(false);
        try {
            //
            await axios.post(`${basseURL}/api/users/unfollow-user`, configHeader1)
        } catch (error) {
            console.log(error);
        }
    }

    const [showModal, setShowModal] = useState(false)

    const handlerShowModalReport = () => {
        setShowModal(true)
    }

    const handlerHideModalReport = () => {
        setShowModal(false)
    }

    return (
        <>
            {showModal && <ModalReport onClick={handlerHideModalReport} />}
            {show && <ModalUpdateProfile data={user} onClick={handlerHideUpdateProfile}/>}
            {loading ? (<div className={cx('profile-content-header')}>
                <div className={cx('profile-info')}>
                    <div className={cx('avatar-container')}>
                        <span shape="circle" className={cx('span-avatar-container')}>
                            <img loading="lazy" alt="" src={user.data.avatar} className={cx('avatar-img')} />
                        </span>
                    </div>
                    <div className={cx('title-container')}>
                        <div className={cx('title-profile')}>
                            {user.data.nickname}
                            {checkTick ? <CheckProfile className={cx('icon-check')}/> : <></>}
                        </div>
                        <h1 className={cx('title-sub')}>{user.data.name}</h1>
                        {currentUser ? (
                            <div className={cx('edit-container')} onClick={handlerShowUpdateProfile}>
                                <Button text className={cx('btn-edit')}>
                                    <span>
                                        <EditProfile className={cx('edit-profile-icon')} />
                                        <span>Sửa hồ sơ</span>
                                    </span>
                                </Button>
                            </div>
                        ) : (
                            <>
                                {check ? (
                                    <div className={cx('follow-container')} onClick={handleUnFollow}>
                                    <div className={cx('follow-btn-wrapper')}>
                                        <Button text >
                                            Đang follow
                                        </Button>
                                    </div>
                                </div>
                                ) : (
                                    <div className={cx('follow-container')} onClick={handleFollow}>
                                        <div className={cx('follow-btn-wrapper')}>
                                            <Button primary className={cx('follow-btn')}>
                                                Follow
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <h2 className={cx('count-info')}>
                    <div className={cx('count-number')}>
                        <strong title="Đang Follow">{user.data.following_count}</strong>
                        <span className={cx('span-unit')}>Đang Follow</span>
                    </div>
                    <div className={cx('count-number')}>
                        <strong title="Follower">{user.data.follower_count}</strong>
                        <span className={cx('span-unit')}>Follower</span>
                    </div>
                    <div className={cx('count-number')}>
                        <strong title="Thích">{user.data.heart_count}</strong>
                        <span className={cx('span-unit')}>Thích</span>
                    </div>
                </h2>
                {user.data.description === '' ? (
                    <h2 className={cx('desc')}>Chưa có tiểu sử.</h2>
                ) : (
                    <h2 className={cx('desc')}>{user.data.description}</h2>
                )}
                <MenuShareProfile onClickShowToast={onClickShowToast}>
                    <div className={cx('share-actions')}>
                        <ShareProfile />
                    </div>
                </MenuShareProfile>
                {currentUser ? (
                    <></>
                ) : (
                    <MenuMoreActions onClick={handlerShowModalReport}>
                        <div className={cx('more-actions')}>
                            <MoreAction />
                        </div>
                    </MenuMoreActions>
                )}
            </div>) : <SekeletonLoadingForTagAndMusicV2 className={cx('avatar-profile')}/>}
        </>
    );
}

export default ProfileHeader;
