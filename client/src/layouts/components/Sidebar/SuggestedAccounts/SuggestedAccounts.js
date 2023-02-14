import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import classNames from 'classnames/bind';
import AccountItem from './SuggestedAccountItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { configBaseURL } from '~/common/common';
import SekeletonLoadingForList from '../../SekeletonLoading/SeleketonLoadingForList/SekeletonLoadingForList';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [users, setUsers] = useState([]);
    const [time, setTime] = useState(false);
    const [addAndSubtractArr, setAddAndSubtractAddArr] = useState(5);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        try {
            //get list người dùng đề xuất
            axios
                .get(`${configBaseURL}/api/users/get-list-suggest`)
                .then((result) => {
                    setUsers(result);
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
        setAddAndSubtractAddArr(users.data.length);
        setHide(!hide);
    };

    const handleSubTractArr = () => {
        setAddAndSubtractAddArr(5);
        setHide(!hide);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {time ? (
                <>
                    {users.data.slice(0, addAndSubtractArr).map((user, index) => {
                        return <AccountItem user={user} key={index} />;
                    })}
                </>
            ) : (
                <SekeletonLoadingForList />
            )}

            {hide ? (
                <p className={cx('more-btn')} onClick={handleSubTractArr}>
                    Ẩn bớt
                </p>
            ) : (
                <p className={cx('more-btn')} onClick={handleAddArr}>
                    Xem tất cả
                </p>
            )}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
