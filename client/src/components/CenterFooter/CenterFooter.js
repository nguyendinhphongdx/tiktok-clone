//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import ItemFooter from './ItemFooter';

//Thư viện internor sau(thư viện bên trong)
import styles from './CenterFooter.module.scss';

const cx = classNames.bind(styles);

function UploadFooter({ className }) {
    return (
        <div className={cx('center-footer', className)}>
            <div className={cx('footer-container')}>
                <div className={cx('footer-content-wrapper')}>
                    <div className={cx('tiktok-logo')}>
                        <div className={cx('logo-container')}>
                            <img
                                src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logo-7328701c910ebbccb5670085d243fc12.svg"
                                alt="TikTok logo"
                                title="TikTok"
                                className={cx('icon-logo')}
                            />
                            <img
                                src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/logotext-9b4d14640f93065ec36dab71c806e135.svg"
                                alt="TikTok logo"
                                title="TikTok"
                                className={cx('text-logo')}
                            />
                        </div>
                    </div>
                    <ItemFooter />
                </div>
                <div className={cx('footer-bottom-wrapper')}>
                    <div className={cx('coppy-right')}>© 2022 TikTok</div>
                </div>
            </div>
        </div>
    );
}

export default UploadFooter;
