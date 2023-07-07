import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive'
import classNames from 'classnames/bind';
import styles from "./DefaultLayout.module.scss"
import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";
import HeaderMobile from '../components/Header/HeaderMobile';

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })

    return (
        <div className={cx('wrapper')}>
            {
                isTabletOrMobile ? <HeaderMobile /> : <Header />
            }
            <div className={cx('container')}>
                {isTabletOrMobile ? null : <Sidebar />}
                {children}
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout;