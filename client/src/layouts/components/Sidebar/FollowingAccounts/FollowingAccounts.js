// import PropTypes from 'prop-types';
import styles from './FollowingAccounts.module.scss';
import classNames from 'classnames/bind';
import FollowingAccountItem from './FollowingAccountItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { configBaseURL, configHeader } from '~/common/common';
import SekeletonLoadingForList from '../../SekeletonLoading/SeleketonLoadingForList/SekeletonLoadingForList';

const cx = classNames.bind(styles);

function FollowingAccounts() {
    const [followingAccounts, setFollowingAccount] = useState([]);
    const [addAndSubtractArr, setAddAndSubtractAddArr] = useState(5);
    const [hide, setHide] = useState(false);
    const [time, setTime] = useState(false);

    useEffect(() => {
        try {
            //
            axios
                .get(`${configBaseURL}/api/users/get-follow-user`, configHeader)
                .then((result) => {
                    setFollowingAccount(result.data[0].fllowing);
                    if(result) {
                        setTimeout(() => {
                            setTime(true);
                        }, 2000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleAddArr = () => {
        setAddAndSubtractAddArr(followingAccounts.length);
        setHide(!hide);
    };

    const handleSubTractArr = () => {
        setAddAndSubtractAddArr(5);
        setHide(!hide);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <p className={cx('label')}>Các tài khoản đang follow</p>
                {followingAccounts.length > 0 ? (
                    <>
                        {time ? (
                            <>
                                {followingAccounts.slice(0, addAndSubtractArr).map((account, index) => {
                                    return <FollowingAccountItem key={index} account={account} />;
                                })}
                            </>
                        ) : (
                            <SekeletonLoadingForList/>
                        )}

                        <>
                            {hide ? (
                                <p className={cx('more-btn')} onClick={handleSubTractArr}>
                                    Ẩn bớt
                                </p>
                            ) : (
                                <p className={cx('more-btn')} onClick={handleAddArr}>
                                    Xem tất cả
                                </p>
                            )}
                        </>
                    </>
                ) : (
                    <p className={cx('empty')}>Những tài khoản bạn follow sẽ xuất hiện tại đây</p>
                )}
            </div>
        </>
    );
}

FollowingAccounts.propTypes = {};

export default FollowingAccounts;
