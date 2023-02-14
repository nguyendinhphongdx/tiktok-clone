import classNames from 'classnames/bind';
import styles from './SuggestedAccountPreview.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { basseURL, configBaseURL, configHeader } from '~/common/common';
import { Link } from 'react-router-dom';
import config from '~/config';


const cx = classNames.bind(styles);

function AccountPreview({ user }) {
    const [checkFollow, setCheckFollow] = useState(false);
    const check = localStorage.getItem('accessToken')
    const configHeader1 = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            IdAccount: `Bearer ${localStorage.getItem('idAccount')}`,
            IdUser: `Bearer ${user.id}`,
        },
    };

    let arr = useRef()

    useEffect(() => {
        if(check) {
            setTimeout(() => {
                arr.current.forEach((check) => {
                    if(check.nickname === user.nickname){
                        setCheckFollow(true)
                    }
                })
            }, 1000)
            try {
                //
                axios
                    .get(`${configBaseURL}/api/users/get-follow-user`, configHeader)
                    .then((result) => {
                        arr.current = result.data[0].fllowing
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, [user.nickname, check]);

    const handleFollow = async () => {
        if(localStorage.getItem('accessToken')) {
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

    const handleUnFollow = async() => {
        setCheckFollow(false);
        try {
            //
            await axios.post(`${basseURL}/api/users/unfollow-user`, configHeader1)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={`/${user.nickname}`}>
                    <img
                        className={cx('avatar')}
                        src={user.avatar}
                        alt="avatar"
                    />
                </Link>
                {checkFollow ? (
                    <Button text className={cx('follow-btn')} onClick={handleUnFollow}>
                        Đang follow
                    </Button>
                ) : (
                    <Button primary className={cx('follow-btn')} onClick={handleFollow}>
                        Follow
                    </Button>
                )}
            </div>

            <div className={cx('body')}>
                <Link to={`/${user.nickname}`}>
                    <p className={cx('nickname')}>
                        <strong>{user.nickname}</strong>
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    </p>
                    <p className={cx('name')}>{user.name}</p>
                </Link>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{user.follower_count} </strong>
                    <label className={cx('label')}>Followers</label>
                    <strong className={cx('value')}>{user.heart_count} </strong>
                    <label className={cx('label')}>Thích </label>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
