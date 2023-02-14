import styles from './SidebarDashBoard.module.scss';
import classNames from 'classnames/bind';
import { HomeActiveIcon, UserGroupActiveIcon } from '~/components/Icons';
// import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Menu, { MenuItem } from './Menu';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SidebarDashBoard({ className }) {
    const navigate = useNavigate();
    const handelLogout = () => {
        localStorage.clear();
        navigate('/');
    };
    return (
        <>
            <aside className={cx('container')}>
                <div className={cx('scroll-container', className)}>
                    <div className={cx('wrapper')}>
                        <Menu>
                            <MenuItem
                                title="Quản lý tài khoản"
                                onClick={() => navigate(`/admin/dashboard/manageAccount`)}
                                icon={<ManageAccountsIcon />}
                                activeIcon={<HomeActiveIcon />}
                            />
                            <MenuItem
                                onClick={() => navigate(`/admin/dashboard/manageUser`)}
                                title="Quản lý người dùng"
                                icon={<PeopleOutlineIcon />}
                                activeIcon={<UserGroupActiveIcon />}
                            />
                            <MenuItem
                                onClick={() => navigate(`/admin/dashboard/manageVideo`)}
                                title="Quản lý video"
                                icon={<SmartDisplayIcon />}
                                activeIcon={<HomeActiveIcon />}
                            />
                            <MenuItem
                                onClick={() => navigate(`/admin/dashboard/manageMusic`)}
                                title="Quản lý âm nhạc"
                                icon={<LibraryMusicIcon />}
                                activeIcon={<HomeActiveIcon />}
                            />
                            <MenuItem
                                title="Quản lý xu hướng"
                                onClick={() => navigate(`/admin/dashboard/manageTrendy`)}
                                icon={<WhatshotIcon />}
                                activeIcon={<HomeActiveIcon />}
                            />
                            <MenuItem
                                onClick={() => navigate(`/admin/dashboard/manageReport`)}
                                title="Quản lý đơn từ"
                                icon={<SummarizeIcon />}
                                activeIcon={<HomeActiveIcon />}
                            />
                            <MenuItem
                                onClick={() => navigate(`/admin/dashboard/manageTotal`)}
                                title="Quản lý báo cáo thống kê"
                                icon={<AssessmentIcon />}
                                activeIcon={<HomeActiveIcon />}
                            />
                        </Menu>
                        <MenuItem
                            className={cx('logout')}
                            onClick={handelLogout}
                            title="Đăng xuất"
                            icon={<LogoutIcon />}
                            activeIcon={<HomeActiveIcon />}
                        />
                    </div>
                </div>
            </aside>
        </>
    );
}

export default SidebarDashBoard;
