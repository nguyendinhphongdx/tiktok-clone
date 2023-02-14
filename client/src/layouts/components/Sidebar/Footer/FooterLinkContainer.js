// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// import { useState } from 'react';

import styles from './Footer.module.scss';
import FooterItem from './FooterItem';

const cx = classNames.bind(styles);

function FooterLinkContainer({ index, data }) {

    return (
        <div className={cx('container-footer-link')} key={index}>
            {data.map((link, index) => {
                return <FooterItem key={index} text={link.text} path={link.path} />;
            })}
        </div>
    );
}

export default FooterLinkContainer;
