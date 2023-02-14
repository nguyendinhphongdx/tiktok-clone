//Thư viện externor trước(thư viện bên ngoài)
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

//Thư viện internor sau(thư viên bên trong dự án)
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';
import { Link } from 'react-router-dom';
// import config from '~/config';
// import { useState } from 'react';

const cx = classNames.bind(styles);

function AccountItem({ user }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                    <AccountPreview user={user}/>
            </div>
        );
    };

    return (
        <div>
            <Tippy appendTo={document.body} interactive delay={[800, 800]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <div className={cx('account-item')}>
                    <Link to={`/${user.nickname}`}>
                        <img
                            className={cx('avatar')}
                            src={user.avatar}
                            alt="avatar"
                        />
                    </Link>
                    <Link to={`/${user.nickname}`}>
                        <div className={cx('item-info')}>
                            <div className={cx('nickname')}>
                                <strong>{user.nickname}</strong>
                                <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                            </div>
                            <p className={cx('name')}>{user.name}</p>
                        </div>
                    </Link>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
