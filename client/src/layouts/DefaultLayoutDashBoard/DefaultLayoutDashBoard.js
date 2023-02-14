import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from "./DefaultLayoutDashBoard.module.scss"
import Header from "~/layouts/components/HeaderDashBoard";
import Sidebar from "~/layouts/components/SidebarDashBoard"

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header-v3')}/>
            <div className={cx('container')}>
                <Sidebar className={cx('sidebar-v3')}/>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout;