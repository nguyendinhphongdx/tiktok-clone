import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './HeaderMobile.module.scss';
import images from '~/assets/images';

import 'tippy.js/dist/tippy.css'; // optional
import config from '~/config';

import { SearchIcon } from '~/components/Icons/Icons';


const cx = classNames.bind(styles);

function HeaderMobile({ className, children }) {
    return (
        <div className={cx('wrapper-header')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <img src={images.logo} alt="TikTok" />
            </Link>
            <SearchIcon color='white' />
        </div>
    );
}

export default HeaderMobile;
