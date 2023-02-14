//Thư viện externor trước(thư viện bên ngoài)
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

//Thư viện internor sau(thư viên bên trong dự án)
import styles from './FollowingAccounts.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ account }) {
    return (
        <div className={cx('account-item')}>
            <Link to={`/${account.nickname}`}>
                <img
                    className={cx('avatar')}
                    src={account.avatar}
                    alt="avatar"
                />
            </Link>
            <Link to={`/${account.nickname}`}>
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{account.nickname}</strong>
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    </p>
                    <p className={cx('name')}>{account.name}</p>
                </div>
            </Link>
        </div>
    );
}

// AccountItem.propTypes = {};

export default AccountItem;
