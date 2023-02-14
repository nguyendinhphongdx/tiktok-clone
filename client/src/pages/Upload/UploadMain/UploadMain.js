//Thư viện externor trước(thư viện bên ngoài)
import classNames from 'classnames/bind';
import FormUpload from './FormUpload';
import Uploader from './Uploader';


//Thư viện internor sau(thư viện bên trong)
import styles from './UploadMain.module.scss';

const cx = classNames.bind(styles);

function Upload() {


    return (
        <div className={cx('container')}>
            <span className={cx('title')}>Tải video lên</span>
            <div className={cx('sub-title')}>
                <span className={cx('sub-title-text')}>Đăng tải video vào tài khoản của bạn</span>
            </div>
            <div className={cx('content')} >
                <Uploader/>
                <FormUpload/>
            </div>
        </div>
    );
}

export default Upload;