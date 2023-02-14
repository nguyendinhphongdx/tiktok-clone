import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from "./DefaultLayoutv2.module.scss"
import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";

const cx = classNames.bind(styles)

function DefaultLayoutv2({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header-v2')}/>
            <div className={cx('container')}>
                <Sidebar className={cx('sidebar-v2')}/>
                    {children}
            </div>
        </div>
    );
}

DefaultLayoutv2.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayoutv2;