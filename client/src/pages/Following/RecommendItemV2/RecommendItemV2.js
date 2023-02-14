//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './RecommendItemV2.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import { useState, useRef } from 'react';
import { CheckProfile } from '~/components/Icons';
import { basseURL } from '~/common/common';

const cx = classNames.bind(styles);

function RecommendItem({ data }) {
    const [checkFollow, setCheckFollow] = useState(false);
    const iduser = useRef();
    const video = useRef();

    const handleFollow = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('accessToken')) {
            setCheckFollow(true);
            const configHeader1 = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    IdAccount: `Bearer ${localStorage.getItem('idAccount')}`,
                    IdUser: `Bearer ${iduser.current.innerText}`,
                },
            };
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
        const configHeader1 = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                IdAccount: `Bearer ${localStorage.getItem('idAccount')}`,
                IdUser: `Bearer ${iduser.current.innerText}`,
            },
        };
        setCheckFollow(false);
        try {
            //
            await axios.post(`${basseURL}/api/users/unfollow-user`, configHeader1);
        } catch (error) {
            console.log(error);
        }
    };

    const handlerVideoPlay = () => {
        video.current.play();
    };

    const handlerVideoPause = () => {
        video.current.pause();
    };

    return (
        <div className={cx('DUser-card')} onMouseMove={handlerVideoPlay} onMouseOut={handlerVideoPause}>
            <Link target="_blank" to={`/${data.author.nickname}`} className={cx('AUser-card')}>
                <div className={cx('video-container')}>
                    <div className={cx('player-wrapper')}>
                        <video muted className={cx('video')} src={data.video} ref={video}></video>
                    </div>
                </div>
                <div className={cx('info-container')}>
                    <span className={cx('span-avatar-container')}>
                        <img src={data.author.avatar} alt="" loading="lazy" />
                    </span>
                    <h5 className={cx('user-name')}>{data.author.name}</h5>
                    <h6 className={cx('user-nickname')}>
                        <span>{data.author.nickname}</span>
                        <div style={{ marginLeft: '4px', marginTop: '4px' }}>
                            {data.author.tick ? <CheckProfile className={cx('tick')} /> : null}
                        </div>
                    </h6>
                    <h6 style={{ display: 'none' }} ref={iduser}>
                        {data.author.id}
                    </h6>
                    <div className={cx('button-container')}>
                        {checkFollow ? (
                            <Button text className={cx('follow-btn', 'following')} onClick={handleUnFollow}>
                                Đang follow
                            </Button>
                        ) : (
                            <Button primary className={cx('follow-btn')} onClick={handleFollow}>
                                Follow
                            </Button>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default RecommendItem;
