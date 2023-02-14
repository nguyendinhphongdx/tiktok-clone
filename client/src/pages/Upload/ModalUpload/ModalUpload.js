//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';

//Thư viện internor sau(thư viện bên trong)
import styles from './ModalUpload.module.scss';

const cx = classNames.bind(styles);

function ModalUpload({ onClick }) {

    const viewProfile = () => {
        window.location = `/${localStorage.getItem('nickName')}`
    }

    return ( <div className={cx('mask-container')}>
        <div className={cx('modal')}>
            <div className={cx('modal-title-container')}>
                <div className={cx('modal-title')}>Video của bạn đã được tải lên TikTok!</div>
            </div>
            <div className={cx('modal-btn', 'primary')} onClick={onClick}>Tải video khác lên</div>
            <div className={cx('modal-btn')} onClick={viewProfile}>Xem hồ sơ</div>
        </div>
        <div className={cx('modal-mask')}></div>
    </div> );
}

export default ModalUpload;