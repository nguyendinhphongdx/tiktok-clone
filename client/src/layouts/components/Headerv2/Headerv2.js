//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './Headerv2.module.scss';
import config from '~/config';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Headervs2({ className }) {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', className)}>
                {/* Logo */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="TikTok" />
                </Link>

                <div>
                    <a href="https://www.tiktok.com/feedback/?lang=vi-VN" target="_blank" rel="noreferrer" className={cx('help-tag')}>
                        <FontAwesomeIcon icon={faCircleQuestion} className={cx('help-icon')}/>
                        <span className={cx('help-text')}>Phản hồi và trợ giúp</span>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Headervs2;
