//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
// import { useState } from 'react';

//Thư viện internor sau(thư viện bên trong dự án)
import { RegisterItemLink, RegisterItemDiv } from './RegisterItem';
import styles from './Register.module.scss';
import config from '~/config';
import { useEffect } from 'react';


const cx = classNames.bind(styles);

function Register({ onClick }) {

    useEffect(() => {
        document.title = 'Đăng ký | TikTok';
    },[]);

    return (
            <>
                <div className={cx('modal-content-wrapper')}>
                    <div className={cx('login-container')}>
                        <div className={cx('login-title')}>Đăng ký TikTok</div>
                        <div className={cx('login-des')}>Tạo hồ sơ, Follow các tài khoản khác, quay video của chính bạn, v.v.</div>
                        <RegisterItemLink className={cx('login-link')} />
                        <RegisterItemDiv className={cx('box-container')} />
                    </div>
                </div>
                <div className={cx('agreement')}>
                    <p className={cx('agreement-text')}>
                        Bằng cách tiếp tục, bạn đồng ý với{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.tiktok.com/legal/terms-of-use?lang=vi-VN"
                        >
                            Điều khoản Sử dụng
                        </a>{' '}
                        của TikTok và xác nhận rằng bạn đã đọc hiểu{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.tiktok.com/legal/privacy-policy?lang=vi-VN"
                        >
                            Chính sách Quyền riêng tư
                        </a>{' '}
                        của TikTok.
                    </p>
                </div>
                <div className={cx('modal-content-footer')}>
                    <div>Bạn đã có tài khoản?</div>
                    <Link to={config.routes.login}>
                        <span className={cx('link-text')}>Đăng nhập</span>
                    </Link>
                </div>
            </>
    );
}

export default Register;
