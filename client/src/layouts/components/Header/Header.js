import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import Menu from '~/components/Popper/Menu/Menu';
import { InboxIcon, MessageIcon, UploadIcon, Add } from '~/components/Icons/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';
import { useState, useEffect } from 'react';
// import { useState } from 'react';

const cx = classNames.bind(styles);

function Header({ className, children }) {
    const [current, setCurrent] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken) {
            setCurrent(true);
        }
    }, [accessToken]);


    //Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //Handle language change
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', className)}>
                {/* Logo */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="TikTok" />
                </Link>

                {/* Search */}
                <Search />

                {/* Actions */}
                <div className={cx('actions')}>
                    {current ? (
                        <>
                            <Tippy delay={[0, 100]} content="Upload video" placement="bottom" offset={[0, 0]} zIndex={10000}>
                                <Link to={config.routes.upload}>
                                    <button className={cx('action-btn')}>
                                        <UploadIcon />
                                    </button>
                                </Link>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Message" placement="bottom" offset={[0, 0]} zIndex={10000}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Inbox" placement="bottom" offset={[0, 0]} zIndex={10000}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Link to={current ? config.routes.upload : config.routes.login} className={cx('link-text')}>
                                <div className={cx('upload')}>
                                    <Add className={cx('upload-icon')} />
                                    <span className={cx('upload-text')}>Tải lên</span>
                                </div>
                            </Link>
                            <Link to={config.routes.login}>
                                <Button primary className={cx('btn-login')}>
                                    Đăng nhập
                                </Button>
                            </Link>
                        </>
                    )}
                    <Menu
                        setState={setCurrent}
                        state={current}
                        onChange={handleMenuChange}
                    >
                        {current ? (
                            <Image
                                className={cx('user-avatar')}
                                alt="Avatar User"
                                src={localStorage.getItem('avatar')}
                            ></Image>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
