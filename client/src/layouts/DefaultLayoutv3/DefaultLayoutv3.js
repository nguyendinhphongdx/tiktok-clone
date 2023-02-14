import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from "./DefaultLayoutv3.module.scss"
import Header from "~/layouts/components/Headerv2";
import CenterFooter from '~/components/CenterFooter';

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header-v3')}/>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
            <CenterFooter className={cx('footer')}/>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultLayout;