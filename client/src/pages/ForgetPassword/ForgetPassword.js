//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PassIcon } from '~/components/Icons';
import config from '~/config';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './ForgetPassword.module.scss';

const cx = classNames.bind(styles);

function ForgetPassword() {

    useEffect(() => {
        document.title = 'Cập nhật mật khẩu | TikTok'
    }, [])

    return (
        <>
            <ForgetPasswordv2 />
        </>
    );
}

function ForgetPasswordv2() {
    return (
        <div className={cx('container')}>
            <form>
                <div className={cx('title')}>Đặt lại mật khẩu</div>
                <LoginByPhone />
            </form>
            <div className={cx('modal-content-footer')}>
                <div>Bạn không có tài khoản?</div>
                <Link to={config.routes.register}>
                    <span className={cx('link-text')}>Đăng ký</span>
                </Link>
            </div>
        </div>
    );
}

function LoginByPhone() {
    return (
        <>
            <div className={cx('des')}>
                Nhập địa chỉ Email
            </div>
            <div className={cx('div-container')}>
                <input type="phone" placeholder='Địa chỉ email' />
            </div>
            <div className={cx('div-container')}>
                <input type="password" placeholder='Mật khẩu' />
                <div className={cx('icon-container')}>
                    <div className={cx('pass-icon')}>
                        <PassIcon />
                    </div>
                </div>
            </div>
            <div className={cx('div-container')}>
                <input type="password" placeholder='Nhập lại mật khẩu' />
                <div className={cx('icon-container')}>
                    <div className={cx('pass-icon')}>
                        <PassIcon />
                    </div>
                </div>
            </div>
            <button className={cx('style-button')} disabled>Đăng nhập</button>
        </>
    );
}

export default ForgetPassword;
