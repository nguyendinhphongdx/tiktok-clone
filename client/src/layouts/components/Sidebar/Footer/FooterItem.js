// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// import { useState } from 'react';

import styles from './Footer.module.scss';


const cx = classNames.bind(styles);

function FooterItem({ text, path , index}) {
    return ( 
        <a className={cx('footer-link')} href={path} target="_blank" rel="noopener noreferrer">{text}</a>
     );
}

export default FooterItem;