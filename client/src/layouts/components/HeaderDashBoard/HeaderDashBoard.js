//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './HeaderDashBoard.module.scss';
import config from '~/config';
import images from '~/assets/images';
import { useEffect } from 'react';

const cx = classNames.bind(styles);


function HeaderDashBoard({ className }) {
    useEffect(() => {
        document.title = 'Quản lý TikTok'
    },[])


    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', className)}>
                {/* Logo */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="TikTok" />
                </Link>

                <div>
                    <div className={cx('title')}>Xin chào {localStorage.getItem('nickName')}!</div>
                </div>
            </div>
        </header>
    );
}

export default HeaderDashBoard;