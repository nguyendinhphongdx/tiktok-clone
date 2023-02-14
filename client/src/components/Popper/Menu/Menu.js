import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import HeaderLanguage from './Header';
import { useEffect, useState } from 'react';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGlobe,
    faUser,
    faCircleQuestion,
    faKeyboard,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const defaultFn = () => { };

function Menu({ children, hideOnClick = false, onChange = defaultFn, setState, state }) {
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faGlobe} />,
            title: 'Ngôn ngữ',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Phản hồi và trợ giúp',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Phím tắt trên bàn phím',
            show: true,
        },
    ];

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Xem hồ sơ',
            to: `/${localStorage.getItem('nickName')}`,
            isUser: true,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Nhận xu',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Cài đặt',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            separate: true,
        },
    ];

    const [history, setHistory] = useState([{ data: MENU_ITEMS }]);
    const current = history[history.length - 1];
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        if (accessToken) {
            setHistory([{ data: userMenu }])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    //Hàm xử lý render ra các item của menu phần header
    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            const isShow = !!item.show;
            const isSeparate = !!item.separate;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }

                        if (isShow) {
                            const modal = document.querySelector('#modal-keyboard');
                            const content = document.querySelector('#content-container');
                            content.style.visibility = 'visible';
                            modal.style.visibility = 'visible';
                        } else {
                        }

                        if (isSeparate) {
                            localStorage.removeItem('accessToken')
                            localStorage.removeItem('idAccount')
                            localStorage.removeItem('nickName')
                            localStorage.removeItem('idUser')
                            localStorage.removeItem('isNewUser')
                            localStorage.removeItem('avatar')
                            window.location.href = config.routes.home
                            setState(false)
                        }
                    }}
                ></MenuItem>
            );
        });
    };

    //Hàm xử lý khi click quay lại từ menu phân cấp
    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    //Hàm xử lý render ra menu phần header
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <HeaderLanguage title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItem()}</div>
            </PopperWrapper>
        </div>
    );

    //Hàm xử lý reset khi ẩn menu
    const handleResetMenu = () => setHistory((prev) => prev.slice(0, 1));

    return (
        <>
            <Tippy
                interactive
                delay={[0, 800]}
                offset={state ? [12, 12] : [12, 7]}
                hideOnClick={hideOnClick}
                placement="bottom-end"
                render={renderResult}
                onHide={handleResetMenu}
            >
                {children}
            </Tippy>
        </>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
